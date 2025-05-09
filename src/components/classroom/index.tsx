'use client'
import { useSelector } from "react-redux";
import { LeftPanel, ModeHeading, PlayArea } from "./components"
import TraineeDraggableCard from "./components/TraineeDraggableCard"
import { RootState } from "@/store";
import ConsoleControlPanel from "./components/controls";
import Image from "next/image";
import Icon from "@/assets/icons";
import { SessionPlanPanel } from "./components/panels";
import useSocket from "./websocket/useSocket";
import { useEffect } from "react";
import protooClient from 'protoo-client';
import * as mediasoupClient from "mediasoup-client";


const ClassRoom = () => {

  const settings = useSelector((state: RootState) => state.live.settings);
  const socket  = useSocket();


  useEffect(() => {
  
    const transport = new protooClient.WebSocketTransport(`wss://openvidustream.akashkumarshukla.in/protoo/?roomId=${settings.roomId}&peerId=nayan.singh@viliyo.com`);

    const protoo =  new protooClient.Peer( transport);

    protoo.on('open' , async () => {
      let device = new mediasoupClient.Device();
      let producer = null;

      console.log( 'Device', device);
      const routerRtpCapabilities = await protoo.request(
          'getRouterRtpCapabilities',
      );
      console.log('Router RTP Capabilities', routerRtpCapabilities)

      await device.load({routerRtpCapabilities})

     let producerMetaData = await protoo.request('createWebRtcTransport' ,{ forceTcp:false , producing:true , consuming:false , sctpCapabilities:device.sctpCapabilities })
   
     const transporter = device.createSendTransport({ 
        id:producerMetaData.id,
        iceParameters: producerMetaData.iceParameters,
        iceCandidates: producerMetaData.iceCandidates,
        dtlsParameters: {
          ...producerMetaData.dtlsParameters,
          role:'auto'
        },
        sctpParameters:producerMetaData.sctpParameters,
        iceServers:[],
        
     })

     transporter.on('connect' , ({ dtlsParameters }, onSuccess , onError ) => {
        protoo.request('connectWebRtcTransport',{ id:transporter.id , dtlsParameters }).then(onSuccess).catch(onError)
     })

     transporter.on('produce', async ({ kind , rtpParameters , appData } ,onSuccess , onError ) => {    
      try {
        
        const { id } = await protoo.request('produce',{ 
          transportId:transporter.id,
          kind,
          rtpParameters,
          appData
        })

         onSuccess({id})

      } catch (error:any) {
        onError(error)
      }
      
     })

     transporter.on('producedata', async ({ sctpStreamParameters, label, protocol, appData } ,onSuccess , onError ) => {
      try {
        // eslint-disable-next-line no-shadow
        const { id } = await protoo.request('produceData', {
          transportId: transporter.id,
          sctpStreamParameters,
          label,
          protocol,
          appData,
        });

        onSuccess({ id });
      } catch (error:any) {
        onError(error);
      }
     })

     let consumerMetaData = await protoo.request('createWebRtcTransport' ,{ forceTcp:false , producing:false , consuming:true , sctpCapabilities:device.sctpCapabilities })

     const consumer =  device.createRecvTransport({
      id:consumerMetaData.id ,
      iceParameters:consumerMetaData.iceParameters,
      iceCandidates:consumerMetaData.iceCandidates,
      dtlsParameters: {
        ...consumerMetaData.dtlsParameters,
        // Remote DTLS role. We know it's always 'auto' by default so, if
        // we want, we can force local WebRTC transport to be 'client' by
        // indicating 'server' here and vice-versa.
        role: 'auto',
      },
      sctpParameters:consumerMetaData.sctpParameters,
      iceServers: [],
     })

     consumer.on('connect', async ({ dtlsParameters}, onSuccess , onError ) => {
         await protoo.request('connectWebRtcTransport',{
          transportId:consumer.id,
          dtlsParameters
         }).then(onSuccess).catch(onError)
     });

     const { peers } = await protoo.request('join', {
      displayName: 'Nayan Singh',
      displayImage: '',
      bgImage: '',
      userId: 'nayan.singh@gmail.com',
      device,
      //micTrack:this._micProducer.paused,
      rtpCapabilities: consumer
        ? device.rtpCapabilities
        : undefined,
      sctpCapabilities: consumer ? device.sctpCapabilities : undefined,
    });

    console.log( 'Peers' , peers );

 



    })

    protoo.on('request' ,() => {

    })

    protoo.on('failed', () => {

    })

    protoo.on('disconnected' , () => {

    })



  },[])


  return(  <div className="flex flex-col h-screen overflow-hidden">
    <TraineeDraggableCard />
   {/* Header Section */}
   <div className="w-full bg-gradient-to-r from-app-blue to-fuchsia-500 h-[8%] py-[1%] px-[1%] flex-shrink-0">
     <Image
       priority
       src={Icon.logo}
       alt="Viliyo Logo"
       height={120}
       width={120}
       className="fixed"
     />
     <div>
       <ModeHeading />
     </div>
   </div>

   {/* Middle Section */}
   <div className="flex flex-1 w-full h-full">
     {settings.leftPanel && (
       <div className="min-w-[20%] max-w-[20%] ">
         <LeftPanel />
       </div>
     )}
     <div className="flex-1 h-full">
       <PlayArea />
     </div>
     <div className="flex flex-col min-w-[20%] max-w-[20%] h-full ">
       <SessionPlanPanel />
     </div>
   </div>

   {/* Bottom Section */}
   <div className="h-[8%] flex-shrink-0">
     <ConsoleControlPanel />
   </div>
 </div> )

}

export default ClassRoom;