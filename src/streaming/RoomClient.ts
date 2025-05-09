import protooClient from 'protoo-client';
import * as mediasoupClient from 'mediasoup-client';
import { getProtooUrl } from '@/utils/StreamingHelperFunctions';    
import * as e2e from './e2e';
import roomSlice, { closeRoom, roomConnected } from '@/store/reducers/roomSlice';
import store from '@/store';

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



  export default class RoomClient {

    static init(data: { store: any; }) {
        const { store } = data;
        const { actions } = roomSlice;
    
        // Dispatch an action to initialize the room state if needed
        store.dispatch(actions.initializeRoom()); // Example action to initialize room state
      }
    
    _closed: boolean;
    _displayName: String;
    _displayImage: String;
    _bgImage: String;
    _strUserId: String;
    _device: String;
    _forceTcp: String;
    _produce: String;
    _consume: String;
    _useDataChannel: String;
    _forceH264: boolean;
    _forceVP9: boolean;
    _externalVideo: any;
    _e2eKey: String;
    _externalVideoStream: null;
    _nextDataChannelTestNumber: number;
      _handlerName: String;
      _useSimulcast: String;
      _useSharingSimulcast: String;
      _protooUrl: string;
      _protoo: null;
      _mediasoupDevice: null;
      _sendTransport: null;
      _recvTransport: null;
      _micProducer: null;
      _webcamProducer: null;
      _shareProducer: null;
      _chatDataProducer: null;
      _botDataProducer: null;
      _consumers: Map<any, any>;
      _dataConsumers: Map<any, any>;
      _webcams: Map<any, any>;
      _socketList: String;
      _webcam: { device: null; resolution: string; };
    constructor({
        roomId,
        peerId,
        displayName,
        strUserId,
        device,
        handlerName,
        useSimulcast,
        useSharingSimulcast,
        forceTcp,
        produce,
        consume,
        forceH264,
        forceVP9,
        svc,
        datachannel,
        externalVideo,
        e2eKey,
        socketList,
        displayImage,
        bgImage
      } : {
        roomId : String,
        peerId : String,
        displayName : String,
        strUserId : String,
        device: String,
        handlerName: String,
        useSimulcast: String,
        useSharingSimulcast: String,
        forceTcp: String,
        produce: String,
        consume: String,
        forceH264: String,
        forceVP9: String,
        svc: String,
        datachannel: String,
        externalVideo: String,
        e2eKey: String,
        socketList: String,
        displayImage: String,
        bgImage: String
        
      }) {

            // Closed flag.
    // @type {Boolean}
    this._closed = false;
    // Display name.
    // @type {String}
    this._displayName = displayName;

    this._displayImage = displayImage;

    this._bgImage = bgImage;

    // Display name.
    // @type {String}
    this._strUserId = strUserId;

    // Device info.
    // @type {Object}
    this._device = device;

    // Whether we want to force RTC over TCP.
    // @type {Boolean}
    this._forceTcp = forceTcp;

    // Whether we want to produce audio/video.
    // @type {Boolean}
    this._produce = produce;

    // Whether we should consume.
    // @type {Boolean}
    this._consume = consume;

    // Whether we want DataChannels.
    // @type {Boolean}
    this._useDataChannel = datachannel;

    // Force H264 codec for sending.
    this._forceH264 = Boolean(forceH264);

    // Force VP9 codec for sending.
    this._forceVP9 = Boolean(forceVP9);

    // External video.
    // @type {HTMLVideoElement}
    this._externalVideo = null;

    // Enabled end-to-end encryption.
    this._e2eKey = e2eKey;  

    // MediaStream of the external video.
    // @type {MediaStream}
    this._externalVideoStream = null;

    // Next expected dataChannel test number.
    // @type {Number}
    this._nextDataChannelTestNumber = 0;


    // if (externalVideo) {
    //     this._externalVideo = document.createElement('video');
  
    //     this._externalVideo.controls = true;
    //     this._externalVideo.muted = true;
    //     this._externalVideo.loop = true;
    //     this._externalVideo.setAttribute('playsinline', '');
    //     this._externalVideo.src = EXTERNAL_VIDEO_SRC;
  
    //     this._externalVideo
    //       .play()
    //       .catch((error: any) => );
    //   }
  
      // Custom mediasoup-client handler name (to override default browser
      // detection if desired).
      // @type {String}
      this._handlerName = handlerName;
  
      // Whether simulcast should be used.
      // @type {Boolean}
      this._useSimulcast = useSimulcast;
  
      // Whether simulcast should be used in desktop sharing.
      // @type {Boolean}
      this._useSharingSimulcast = useSharingSimulcast;
  
      // Protoo URL.
      // @type {String}
      this._protooUrl = getProtooUrl({ roomId, peerId });
  
      // protoo-client Peer instance.
      // @type {protooClient.Peer}
      this._protoo = null;
  
      // mediasoup-client Device instance.
      // @type {mediasoupClient.Device}
      this._mediasoupDevice = null;
  
      // mediasoup Transport for sending.   
      // @type {mediasoupClient.Transport}
      this._sendTransport = null;
  
      // mediasoup Transport for receiving.
      // @type {mediasoupClient.Transport}
      this._recvTransport = null;
  
      // Local mic mediasoup Producer.
      // @type {mediasoupClient.Producer}
      this._micProducer = null;
  
      // Local webcam mediasoup Producer.
      // @type {mediasoupClient.Producer}
      this._webcamProducer = null;
  
      // Local share mediasoup Producer.
      // @type {mediasoupClient.Producer}
      this._shareProducer = null;
  
      // Local chat DataProducer.
      // @type {mediasoupClient.DataProducer}
      this._chatDataProducer = null;
  
      // Local bot DataProducer.
      // @type {mediasoupClient.DataProducer}
      this._botDataProducer = null;
  
      // mediasoup Consumers.
      // @type {Map<String, mediasoupClient.Consumer>}
      this._consumers = new Map();
  
      // mediasoup DataConsumers.
      // @type {Map<String, mediasoupClient.DataConsumer>}
      this._dataConsumers = new Map();
  
      // Map of webcam MediaDeviceInfos indexed by deviceId.
      // @type {Map<String, MediaDeviceInfos>}
      this._webcams = new Map();
  
      this._socketList = socketList;
      // Local Webcam.
      // @type {Object} with:
      // - {MediaDeviceInfo} [device]
      // - {String} [resolution] - 'qvga' / 'vga' / 'hd'.
      this._webcam = {  
        device: null,
        resolution: 'hd',
      };
  
      // Set custom SVC scalability mode.
      if (svc) {
        WEBCAM_KSVC_ENCODINGS[0].scalabilityMode = `${svc}_KEY`;
        SCREEN_SHARING_SVC_ENCODINGS[0].scalabilityMode = svc;
      }
  
      if (this._e2eKey && e2e.isSupported()) {
        e2e.setCryptoKey('setCryptoKey', this._e2eKey, true);
      }
    } 


    // Closing the mediasoup and protoo client connections 
    close() {
        console.log("🚀 ~ RoomClient ~ close ~ close: called this function this.close");
        
        if (this._closed) return;
    
        this._closed = true;
    
        // logger.debug('close()');
        
        // Close protoo Peer
        if (this._protoo !== null) {
          this._protoo.close();
          if (this._sendTransport) this._sendTransport.close();
    
          if (this._recvTransport) this._recvTransport.close();
        }
    
        // Close mediasoup Transports.
        store.dispatch(closeRoom());
    }

    async join(audioEnabled = false, videoEnabled = false) {

        const protooTransport = new protooClient.WebSocketTransport(
            this._protooUrl,
          );

          this._protoo = new protooClient.Peer(protooTransport);
        //   Below error is coming because of typescript not declared as notifications on _protoo instance
          this._protoo.on('open', () => this._joinRoom(audioEnabled, videoEnabled));

          this._protoo.on('failed', () => {
            // store.dispatch(
            //   requestActions.notify({
            //     type: 'error',
            //     text: 'WebSocket connection failed',
            //   }),
            console.log("🚀 ~ RoomClient ~ this._protoo.on ~ error: websocket connection failed")
            // );
          });
      
          this._protoo.on('disconnected', () => {
            // store.dispatch(
            //   requestActions.notify({
            //     type: 'error',
            //     text: 'WebSocket disconnected',
            //   }),
            // );
            console.log('Protoo disconnected, websocket Disconnected function called')
            // Close mediasoup Transports.
            if (this._sendTransport) {
              this._sendTransport.close();
              this._sendTransport = null;
            }
      
            if (this._recvTransport) {
              this._recvTransport.close();
              this._recvTransport = null;
            }
      
            console.log('this.recvTransport closed and sendTransport closed');
          });
      
          this._protoo.on('close', () => {
            if (this._closed) return;
      
            this.close();
          });

          this._protoo.on('request', async (request, accept, reject) => {
            // logger.debug(
            //   'proto "request" event [method:%s, data:%o]',
            //   request.method,
            //   request.data,
            // );
            console.log("🚀 ~ RoomClient ~ this._protoo.on ~ request:", request)
      
            // switch (request.method) {
            //   case 'newConsumer': {
            //     if (!this._consume) {
            //       reject(403, 'I do not want to consume');
      
            //       break;
            //     }
      
            //     const {
            //       peerId,
            //       producerId,
            //       id,
            //       kind,
            //       rtpParameters,
            //       type,
            //       appData,
            //       producerPaused,
            //     } = request.data;
      
            //     try {
            //       const consumer = await this._recvTransport.consume({
            //         id,
            //         producerId,
            //         kind,
            //         rtpParameters,
            //         appData: { ...appData, peerId }, // Trick.
            //       });
      
            //       if (this._e2eKey && e2e.isSupported()) {
            //         e2e.setupReceiverTransform(consumer.rtpReceiver);
            //       }
      
            //       // Store in the map.
            //       this._consumers.set(consumer.id, consumer);
      
            //       consumer.on('transportclose', () => {
            //         this._consumers.delete(consumer.id);
            //       });
      
            //       const { spatialLayers, temporalLayers } =
            //         mediasoupClient.parseScalabilityMode(
            //           consumer.rtpParameters.encodings[0].scalabilityMode,
            //         );
      
            //       store.dispatch(
            //         stateActions.addConsumer(
            //           {
            //             id: consumer.id,
            //             type: type,
            //             locallyPaused: false,
            //             remotelyPaused: producerPaused,
            //             rtpParameters: consumer.rtpParameters,
            //             spatialLayers: spatialLayers,
            //             temporalLayers: temporalLayers,
            //             preferredSpatialLayer: spatialLayers - 1,
            //             preferredTemporalLayer: temporalLayers - 1,
            //             priority: 1,
            //             codec:
            //               consumer.rtpParameters.codecs[0].mimeType.split('/')[1],
            //             track: consumer.track,
            //           },
            //           peerId,
            //         ),
            //       );
      
            //       // We are ready. Answer the protoo request so the server will
            //       // resume this Consumer (which was paused for now if video).
            //       accept();
      
            //       // If audio-only mode is enabled, pause it.
            //       if (consumer.kind === 'video' && store.getState().me.audioOnly)
            //         this._pauseConsumer(consumer);
            //     } catch (error) {
            //       logger.error('"newConsumer" request failed:%o', error);
      
            //       store.dispatch(
            //         requestActions.notify({
            //           type: 'error',
            //           text: `Error creating a Consumer: ${error}`,
            //         }),
            //       );
      
            //       throw error;
            //     }
      
            //     break;
            //   }
      
            //   case 'newDataConsumer': {
            //     if (!this._consume) {
            //       reject(403, 'I do not want to data consume');
      
            //       break;
            //     }
      
            //     if (!this._useDataChannel) {
            //       reject(403, 'I do not want DataChannels');
      
            //       break;
            //     }
      
            //     const {
            //       peerId, // NOTE: Null if bot.
            //       dataProducerId,
            //       id,
            //       sctpStreamParameters,
            //       label,
            //       protocol,
            //       appData,
            //     } = request.data;
      
            //     try {
            //       const dataConsumer = await this._recvTransport.consumeData({
            //         id,
            //         dataProducerId,
            //         sctpStreamParameters,
            //         label,
            //         protocol,
            //         appData: { ...appData, peerId }, // Trick.
            //       });
      
            //       // Store in the map.
            //       this._dataConsumers.set(dataConsumer.id, dataConsumer);
      
            //       dataConsumer.on('transportclose', () => {
            //         this._dataConsumers.delete(dataConsumer.id);
            //       });
      
            //       dataConsumer.on('open', () => {
            //         logger.debug('DataConsumer "open" event');
            //       });
      
            //       dataConsumer.on('close', () => {
            //         logger.warn('DataConsumer "close" event');
      
            //         this._dataConsumers.delete(dataConsumer.id);
      
            //         store.dispatch(
            //           requestActions.notify({
            //             type: 'error',
            //             text: 'DataConsumer closed',
            //           }),
            //         );
            //       });
      
            //       dataConsumer.on('error', error => {
            //         logger.error('DataConsumer "error" event:%o', error);
      
            //         store.dispatch(
            //           requestActions.notify({
            //             type: 'error',
            //             text: `DataConsumer error: ${error}`,
            //           }),
            //         );
            //       });
      
            //       dataConsumer.on('message', message => {
            //         logger.debug(
            //           'DataConsumer "message" event [streamId:%d]',
            //           dataConsumer.sctpStreamParameters.streamId,
            //         );
      
            //         // TODO: For debugging.
            //         window.DC_MESSAGE = message;
      
            //         if (message instanceof ArrayBuffer) {
            //           const view = new DataView(message);
            //           const number = view.getUint32();
      
            //           if (number == Math.pow(2, 32) - 1) {
            //             logger.warn('dataChannelTest finished!');
      
            //             this._nextDataChannelTestNumber = 0;
      
            //             return;
            //           }
      
            //           if (number > this._nextDataChannelTestNumber) {
            //             logger.warn(
            //               'dataChannelTest: %s packets missing',
            //               number - this._nextDataChannelTestNumber,
            //             );
            //           }
      
            //           this._nextDataChannelTestNumber = number + 1;
      
            //           return;
            //         } else if (typeof message !== 'string') {
            //           logger.warn('ignoring DataConsumer "message" (not a string)');
      
            //           return;
            //         }
      
            //         switch (dataConsumer.label) {
            //           case 'chat': {
            //             const { peers } = store.getState();
            //             const peersArray = Object.keys(peers).map(
            //               _peerId => peers[_peerId],
            //             );
            //             const sendingPeer = peersArray.find(peer =>
            //               peer.dataConsumers.includes(dataConsumer.id),
            //             );
      
            //             if (!sendingPeer) {
            //               logger.warn('DataConsumer "message" from unknown peer');
      
            //               break;
            //             }
      
            //             store.dispatch(
            //               requestActions.notify({
            //                 title: `${sendingPeer.displayName} says:`,
            //                 text: message,
            //                 timeout: 5000,
            //               }),
            //             );
      
            //             break;
            //           }
      
            //           case 'bot': {
            //             store.dispatch(
            //               requestActions.notify({
            //                 title: 'Message from Bot:',
            //                 text: message,
            //                 timeout: 5000,
            //               }),
            //             );
      
            //             break;
            //           }
            //         }
            //       });
      
            //       // TODO: REMOVE
            //       window.DC = dataConsumer;
      
            //       store.dispatch(
            //         stateActions.addDataConsumer(
            //           {
            //             id: dataConsumer.id,
            //             sctpStreamParameters: dataConsumer.sctpStreamParameters,
            //             label: dataConsumer.label,
            //             protocol: dataConsumer.protocol,
            //           },
            //           peerId,
            //         ),
            //       );
      
            //       // We are ready. Answer the protoo request.
            //       accept();
            //     } catch (error) {
            //       logger.error('"newDataConsumer" request failed:%o', error);
      
            //       store.dispatch(
            //         requestActions.notify({
            //           type: 'error',
            //           text: `Error creating a DataConsumer: ${error}`,
            //         }),
            //       );
      
            //       throw error;
            //     }
      
            //     break;
            //   }
            // }
          });
      
          this._protoo.on('notification', notification => {
            // logger.debug(
            //   'proto "notification" event [method:%s, data:%o]',
            //   notification.method,
            //   notification.data,
            // );
            console.log("🚀 ~ RoomClient ~ join ~ notification:", notification)

            // switch (notification.method) {
            //   case 'producerScore': {
            //     const { producerId, score } = notification.data;
      
            //     store.dispatch(stateActions.setProducerScore(producerId, score));
      
            //     break;
            //   }
      
            //   case 'newPeer': {
            //     const peer = notification.data;
      
            //     store.dispatch(
            //       stateActions.addPeer({ ...peer, consumers: [], dataConsumers: [] }),
            //     );
      
            //     store.dispatch(
            //       requestActions.notify({
            //         text: `${peer.displayName} has joined the room`,
            //       }),
            //     );
      
            //     break;
            //   }
      
            //   case 'peerClosed': {
            //     const { peerId } = notification.data;
      
            //     store.dispatch(stateActions.removePeer(peerId));
      
            //     break;
            //   }
      
            //   case 'peerDisplayNameChanged': {
            //     const { peerId, displayName, oldDisplayName } = notification.data;
      
            //     store.dispatch(stateActions.setPeerDisplayName(displayName, peerId));
      
            //     store.dispatch(
            //       requestActions.notify({
            //         text: `${oldDisplayName} is now ${displayName}`,
            //       }),
            //     );
      
            //     break;
            //   }
      
            //   case 'bgImageChanged': {
            //     const { peerId, bgImage, oldBgImage } = notification.data;
      
            //     // store.dispatch(stateActions.setPeerDisplayName(displayName, peerId));
            //     console.log(peerId, 'User has changed the background image from ', oldBgImage, bgImage);
            //     store.dispatch(
            //       requestActions.notify({
            //         text: `${oldBgImage} is now ${oldBgImage}`,
            //       }),
            //     );
      
            //     break;
            //   }
      
            //   case 'downlinkBwe': {
            //     logger.debug("'downlinkBwe' event:%o", notification.data);
      
            //     break;
            //   }
      
            //   case 'consumerClosed': {
            //     const { consumerId } = notification.data;
            //     const consumer = this._consumers.get(consumerId);
      
            //     if (!consumer) break;
      
            //     consumer.close();
            //     this._consumers.delete(consumerId);
      
            //     const { peerId } = consumer.appData;
      
            //     store.dispatch(stateActions.removeConsumer(consumerId, peerId));
      
            //     break;
            //   }
      
            //   case 'consumerPaused': {
            //     const { consumerId } = notification.data;
            //     const consumer = this._consumers.get(consumerId);
      
            //     if (!consumer) break;
      
            //     consumer.pause();
      
            //     store.dispatch(stateActions.setConsumerPaused(consumerId, 'remote'));
      
            //     break;
            //   }
      
            //   case 'consumerResumed': {
            //     const { consumerId } = notification.data;
            //     const consumer = this._consumers.get(consumerId);
      
            //     if (!consumer) break;
      
            //     consumer.resume();
      
            //     store.dispatch(stateActions.setConsumerResumed(consumerId, 'remote'));
      
            //     break;
            //   }
      
            //   case 'consumerLayersChanged': {
            //     const { consumerId, spatialLayer, temporalLayer } = notification.data;
            //     const consumer = this._consumers.get(consumerId);
      
            //     if (!consumer) break;
      
            //     store.dispatch(
            //       stateActions.setConsumerCurrentLayers(
            //         consumerId,
            //         spatialLayer,
            //         temporalLayer,
            //       ),
            //     );
      
            //     break;
            //   }
      
            //   case 'consumerScore': {
            //     const { consumerId, score } = notification.data;
      
            //     store.dispatch(stateActions.setConsumerScore(consumerId, score));
      
            //     break;
            //   }
      
            //   case 'dataConsumerClosed': {
            //     const { dataConsumerId } = notification.data;
            //     const dataConsumer = this._dataConsumers.get(dataConsumerId);
      
            //     if (!dataConsumer) break;
      
            //     dataConsumer.close();
            //     this._dataConsumers.delete(dataConsumerId);
      
            //     const { peerId } = dataConsumer.appData;
      
            //     store.dispatch(
            //       stateActions.removeDataConsumer(dataConsumerId, peerId),
            //     );
      
            //     break;
            //   }
      
            //   case 'activeSpeaker': {
            //     const { peerId } = notification.data;
      
            //     store.dispatch(stateActions.setRoomActiveSpeaker(peerId));
      
            //     break;
            //   }
      
            //   default: {
            //     logger.error(
            //       'unknown protoo notification.method "%s"',
            //       notification.method,
            //     );
            //   }
            // }
          });
        }

        async _joinRoom(audioEnabled = false, videoEnabled = false) {
            console.log('Inside Join Room');
            try {
              this._mediasoupDevice = new mediasoupClient.Device({  
                handlerName: this._handlerName,
              });
              console.log("🚀 ~ RoomClient ~ _joinRoom ~ this._mediasoupDevice:", this._mediasoupDevice)
        
              const routerRtpCapabilities = await this._protoo.request(
                'getRouterRtpCapabilities',
              );
              console.log("🚀 ~ RoomClient ~ _joinRoom ~ routerRtpCapabilities:", routerRtpCapabilities)
        
              await this._mediasoupDevice.load({ routerRtpCapabilities });
        
              // NOTE: Stuff to play remote audios due to browsers' new autoplay policy.
              //
              // Just get access to the mic and DO NOT close the mic track for a while.
              // Super hack!
              
                const stream = await navigator.mediaDevices.getUserMedia({
                  audio: true,
                });
                console.log("🚀 ~ RoomClient ~ _joinRoom ~ stream:", stream)
                const audioTrack = stream.getAudioTracks()[0];
                console.log("🚀 ~ RoomClient ~ _joinRoom ~ audioTrack:", audioTrack)
        
                audioTrack.enabled = false;
        
                setTimeout(() => audioTrack.stop(), 120000);
              
              // Create mediasoup Transport for sending (unless we don't want to produce).
              if (this._produce) {
                const transportInfo = await this._protoo.request(
                  'createWebRtcTransport',
                  {
                    forceTcp: this._forceTcp,
                    producing: true,
                    consuming: false,
                    sctpCapabilities: this._useDataChannel
                      ? this._mediasoupDevice.sctpCapabilities
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
        
                    this._sendTransport = this._mediasoupDevice.createSendTransport({
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
                      additionalSettings: {
                        encodedInsertableStreams: this._e2eKey && e2e.isSupported(),
                      },
                    });
        
                    this._sendTransport.on(
                      'connect',
                      (
                        { dtlsParameters },
                        callback,
                        errback, // eslint-disable-line no-shadow
                      ) => {
                        this._protoo
                          .request('connectWebRtcTransport', {
                            transportId: this._sendTransport.id,
                            dtlsParameters,
                          })
                          .then(callback)
                          .catch(errback);
                      },
                    );
        
                    this._sendTransport.on( 
                      'produce',
                      async ({ kind, rtpParameters, appData }, callback, errback) => {
                        console.log("🚀 ~ RoomClient ~ { kind, rtpParameters, appData }:", { kind, rtpParameters, appData })
                        
                        try {
                          // eslint-disable-next-line no-shadow
                          const { id } = await this._protoo.request('produce', {
                            transportId: this._sendTransport.id,
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
        
                    this._sendTransport.on(
                      'producedata',
                      async (
                        { sctpStreamParameters, label, protocol, appData },
                        callback,
                        errback,
                      ) => {
        
                        try {
                          // eslint-disable-next-line no-shadow
                          const { id } = await this._protoo.request('produceData', {
                            transportId: this._sendTransport.id,
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
                  }
        
              // Create mediasoup Transport for receiving (unless we don't want to consume).
              if (this._consume) {
                const transportInfo = await this._protoo.request(
                  'createWebRtcTransport',
                  {
                    forceTcp: this._forceTcp,
                    producing: false,
                    consuming: true,
                    sctpCapabilities: this._useDataChannel
                      ? this._mediasoupDevice.sctpCapabilities
                      : undefined,
                  },
                );
                console.log("🚀 ~ RoomClient ~ _joinRoom ~ transportInfo:", transportInfo)
        
                const {
                  id    ,
                  iceParameters,
                  iceCandidates,
                  dtlsParameters,
                  sctpParameters,
                } = transportInfo;
        
                this._recvTransport = this._mediasoupDevice.createRecvTransport({
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
                  additionalSettings: {
                    encodedInsertableStreams: this._e2eKey && e2e.isSupported(),
                  },
                });
                console.log("🚀 ~ RoomClient ~ _joinRoom ~ this._recvTransport:", this._recvTransport)
        
                this._recvTransport.on(
                  'connect',
                  (
                    { dtlsParameters },
                    callback,
                    errback, // eslint-disable-line no-shadow
                  ) => {
                    this._protoo
                      .request('connectWebRtcTransport', {
                        transportId: this._recvTransport.id,
                        dtlsParameters,
                      })
                      .then(callback)
                      .catch(errback);
                  },
                );
              }
        
              this._device['userId'] = this._strUserId;
        
              // Join now into the room.
              // NOTE: Don't send our RTP capabilities if we don't want to consume.
              const { peers } = await this._protoo.request('join', {
                displayName: this._displayName,
                displayImage: this._displayImage,
                bgImage: this._bgImage,
                userId: this._strUserId,
                device: this._device,
                //micTrack:this._micProducer.paused,
                rtpCapabilities: this._consume
                  ? this._mediasoupDevice.rtpCapabilities
                  : undefined,
                sctpCapabilities:
                  this._useDataChannel && this._consume
                    ? this._mediasoupDevice.sctpCapabilities
                    : undefined,
              });
              console.log("🚀 ~ RoomClient ~ _joinRoom ~ peers:", peers)
        
              store.dispatch(roomConnected());
    
            //   store.dispatch(stateActions.setRoomState('connected'));
        
              // Clean all the existing notifcations.
            //   store.dispatch(stateActions.removeAllNotifications());
        
            //   store.dispatch(
            //     requestActions.notify({
            //       text: 'You are in the room!',
            //       timeout: 3000,
            //     }),
            //   );
        
            //   for (const peer of peers) {
            //     store.dispatch(
            //       stateActions.addPeer({ ...peer, consumers: [], dataConsumers: [] }),
            //     );
            //   }
        
              // Enable mic/webcam.
              if (this._produce) {
                // Set our media capabilities.
                // store.dispatch(
                //   stateActions.setMediaCapabilities({
                //     canSendMic: this._mediasoupDevice.canProduce('audio'),
                //     canSendWebcam: this._mediasoupDevice.canProduce('video'),
                //   }),
                // );
        
                // this.enableMic().then(() => {
                //   if (!audioEnabled) {
                //     this.muteMic();
                //   }
                // });
        
                // const devicesCookie = cookiesManager.getDevices();
        
                // if (
                //   !devicesCookie ||
                //   devicesCookie.webcamEnabled ||
                //   this._externalVideo
                // )
                //   if (videoEnabled) {
                //     this.enableWebcam();
                //   }
        
                // this._sendTransport.on('connectionstatechange', connectionState => {
                //   if (connectionState === 'connected') {
                //     this.enableChatDataProducer();
                //     this.enableBotDataProducer();
                //   }
                // });
              }
        
              // NOTE: For testing.
            //   if (window.SHOW_INFO) {
            //     const { me } = store.getState();
            //     store.dispatch(stateActions.setRoomStatsPeerId(me.id));
            //   }
            } catch (error) {
            //   logger.error('_joinRoom() failed:%o', error);
        
            //   store.dispatch(
            //     requestActions.notify({
            //       type: 'error',
            //       text: `Could not join the room: ${error}`,
            //     }),
            //   );
        
              this.close();
            //   This is retry logic i guess
            //   setTimeout(() => {
            //     this._joinRoom()
            //   }, siteConfig.REJOIN_TIMEOUT)
            }
          }



    }






