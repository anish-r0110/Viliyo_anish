import { getProtooUrl, getUserByEmail } from "@/utils/StreamingHelperFunctions";
import { useEffect, useRef } from "react"
import protooClient from 'protoo-client';
import * as mediasoupClient from 'mediasoup-client';
import { BuiltinHandlerName, RtpCapabilities } from "mediasoup-client/lib/types";


const VIDEO_CONSTRAINS = {
    qvga: { width: { ideal: 320 }, height: { ideal: 240 } },
    vga: { width: { ideal: 640 }, height: { ideal: 480 } },
    hd: { width: { ideal: 1280 }, height: { ideal: 720 } },
  };
  
  const PC_PROPRIETARY_CONSTRAINTS = {
    optional: [{ googDscp: true }],
  };
  
  // Used for simulcast webcam video.
  const WEBCAM_SIMULCAST_ENCODINGS = [
    { scaleResolutionDownBy: 4, maxBitrate: 500000 },
    { scaleResolutionDownBy: 2, maxBitrate: 1000000 },
    { scaleResolutionDownBy: 1, maxBitrate: 5000000 },
  ];
  
  // Used for VP9 webcam video.
  const WEBCAM_KSVC_ENCODINGS = [{ scalabilityMode: 'S3T3_KEY' }];

  const SCREEN_SHARING_SVC_ENCODINGS = [{ scalabilityMode: 'S3T3', dtx: true }];


export const TestStream = ({ roomId, peerId, participantList, traineeData }: { roomId: String, peerId: String, participantList: [], traineeData: {} }) =>{  
    let protoo: protooClient.Peer;
    let protooTransport;
    let protooUrl = getProtooUrl({roomId,peerId})
    let routerRtpCapabilities : RtpCapabilities;
    let mediasoupDevice: mediasoupClient.types.Device;
    let _useDataChannel = true;
    let handlerName : BuiltinHandlerName;
    let forceTcp;
    const videoRef = useRef()
    let localStream : MediaStream; 
    let sendTransport: mediasoupClient.types.Transport<mediasoupClient.types.AppData>;
    let recvTransport: mediasoupClient.types.Transport<mediasoupClient.types.AppData>;
   
    let params = {
        // mediasoup params
        encodings: [
          {
            rid: 'r0',
            maxBitrate: 100000,
            scalabilityMode: 'S1T3',
          },
          {
            rid: 'r1',
            maxBitrate: 300000,
            scalabilityMode: 'S1T3',
          },
          {
            rid: 'r2',
            maxBitrate: 900000,
            scalabilityMode: 'S1T3',
          },
        ],
        // https://mediasoup.org/documentation/v3/mediasoup-client/api/#ProducerCodecOptions
        codecOptions: {
          videoGoogleStartBitrate: 1000
        }
      }
   
   
   
    const configureProtoo = async() => {

        protooTransport = new protooClient.WebSocketTransport(protooUrl);
        protoo = new protooClient.Peer(protooTransport);
        
  
        configureProtooEvents()
        }


    const configureProtooEvents = () =>{
        protoo.on('open', async()=>{
            routerRtpCapabilities = await protoo.request(
                'getRouterRtpCapabilities',
              );
    
        })
        protoo.on('disconnected',()=>{
            console.log('Protoo Got Disconnected');

        })
        protoo.on('request', async (request, accept, reject) => {
                console.log("🚀 ~ protoo.on ~ request, accept, reject:", request, accept, reject)
        })
        
        protoo.on('notification', notification => {
            console.log("🚀 ~ configureProtooEvents ~ notification:", notification)

        })
        
    }

    const createMediaSoupDevice = async() => {

        mediasoupDevice = new mediasoupClient.Device({
            handlerName: handlerName,
          })    
          await mediasoupDevice.load({ routerRtpCapabilities })
          .then(()=>{
            console.log("🚀 ~ createMediaSoupDevice ~ mediasoupDevice:", mediasoupDevice)

        })
          let participant_id = getUserByEmail(traineeData.email, participantList).id;

          const { peers } = await protoo.request('join', {
            displayName: traineeData.name,
            displayImage: traineeData.profileImage,
            bgImage: traineeData.profileImage,
            userId: participant_id,
            device: {},
            //micTrack:this._micProducer.paused,
            rtpCapabilities:mediasoupDevice.rtpCapabilities,
            sctpCapabilities:mediasoupDevice.sctpCapabilities
    
          });
          console.log("🚀 ~ createMediaSoupDevice ~ peers:", peers)
    }
   
      

    const createSendTransport = async() => {
   
            const transportInfo = await protoo.request(
              'createWebRtcTransport',
              {
                forceTcp: forceTcp || true,
                producing: true,
                consuming: false,
                sctpCapabilities: _useDataChannel
                  ?mediasoupDevice.sctpCapabilities
                  : undefined,
              },
            );
            console.log("🚀 ~ createSendTransport ~ transportInfo:", transportInfo)
    
            const {
              id,
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
            } = transportInfo;
    
                sendTransport = mediasoupDevice.createSendTransport({
                  id,
                  iceParameters,
                  iceCandidates,
                  dtlsParameters: {
                    ...dtlsParameters,
                    // Remote DTLS role. We know it's always 'auto' by default so, if
                    // we want, we can force local WebRTC transport to be 'client' by
                    // indicating 'server' here and vice-versa.
                    role: 'auto',
                  },
                  sctpParameters,
                  iceServers: [],
                  proprietaryConstraints: PC_PROPRIETARY_CONSTRAINTS,
                //   additionalSettings: {
                //     encodedInsertableStreams: this._e2eKey && e2e.isSupported(),
                //   },
                });
    
                sendTransport.on(
                  'connect',
                  (
                    { dtlsParameters },
                    callback,
                    errback, // eslint-disable-line no-shadow
                  ) => {
                    console.log('Inside Connect!');
                    protoo
                      .request('connectWebRtcTransport', {
                        transportId: sendTransport.id,
                        dtlsParameters,
                      })
                      .then(callback)
                      .catch(errback);
                  },
                );
    
                sendTransport.on(
                  'produce',
                  async ({ kind, rtpParameters, appData }, callback, errback) => {
                    console.log('Inside produce>>>>')
                    try {
                      // eslint-disable-next-line no-shadow
                      const { id } = await protoo.request('produce', {
                        transportId: sendTransport.id,
                        kind,
                        rtpParameters,
                        appData,
                      });
    
                      callback({ id });
                    } catch (error) {
                      errback(error);
                    }
                  },
                );
    
                sendTransport.on(
                  'producedata',
                  async (
                    { sctpStreamParameters, label, protocol, appData },
                    callback,
                    errback,
                  ) => {
                    console.log('Inside Produce Data Event >>>>')
                    try {
                      // eslint-disable-next-line no-shadow
                      const { id } = await protoo.request('produceData', {
                        transportId: sendTransport.id,
                        sctpStreamParameters,
                        label,
                        protocol,
                        appData,
                      });
    
                      callback({ id });
                    } catch (error) {
                      errback(error);
                    }         
                  },
                );

                produce()
              
    }

    const createReceiveTransport = async() => {
            const transportInfo = await protoo.request(
              'createWebRtcTransport',
              {
                forceTcp: forceTcp || true,
                producing: false,
                consuming: true,
                sctpCapabilities: _useDataChannel
                  ? mediasoupDevice.sctpCapabilities
                  : undefined,
              },
            );
    
            const {
              id,
              iceParameters,
              iceCandidates,
              dtlsParameters,
              sctpParameters,
            } = transportInfo;
    
            recvTransport = mediasoupDevice.createRecvTransport({
              id,
              iceParameters,
              iceCandidates,
              dtlsParameters: {
                ...dtlsParameters,
                // Remote DTLS role. We know it's always 'auto' by default so, if
                // we want, we can force local WebRTC transport to be 'client' by
                // indicating 'server' here and vice-versa.
                role: 'auto',
              },
              sctpParameters,
              iceServers: [],
            //   additionalSettings: {
            //     encodedInsertableStreams: this._e2eKey && e2e.isSupported(),
            //   },
            });
    
            recvTransport.on(
              'connect',
              (
                { dtlsParameters },
                callback,
                errback, // eslint-disable-line no-shadow
              ) => {
                console.log('receve transport ')
                protoo
                  .request('connectWebRtcTransport', {
                    transportId: recvTransport.id,
                    dtlsParameters,
                  })
                  .then(callback)
                  .catch(errback);
              },
            );     
    }

    const startLocalStream = async() =>{
        localStream = await navigator.mediaDevices.getUserMedia({ video: true });        
        videoRef.current.srcObject = localStream;
    }   

    const produce = async() =>{
        let track = localStream;
        let encodings = WEBCAM_SIMULCAST_ENCODINGS;
        let codecOptions = {
          videoGoogleStartBitrate: 1000,
        };
        let codec;
        await sendTransport.produce({
            track,
            encodings,
            codecOptions,
            codec,
          })
    
        }

        const consume = async() =>{

            const consumer = await recvTransport.consume({
                id,
                producerId,
                kind,
                rtpParameters,
                appData: { ...appData, peerId }, // Trick.
              });
            console.log("🚀 ~ consume ~ consumer:", consumer)
        
            }
    
        
    useEffect(()=>{
        startLocalStream()
        configureProtoo()
    },[])

    return(
        <div className="flex flex-col">
                        <video className='flex w-60 h-60 border-4' ref={videoRef} autoPlay playsInline muted />
                        <button onClick={() => createMediaSoupDevice()} className='flex max-w-[250px] border rounded-lg bg-app-blue p-3'>CreateDevice </button>
                        <button onClick={() => createSendTransport()} className='flex max-w-[250px] border rounded-lg bg-app-blue p-3'>sendTransport </button>
                        <button onClick={() => createReceiveTransport()} className='flex max-w-[250px] border rounded-lg bg-app-blue p-3'>receive transport </button>
                        

        </div>
    )
}