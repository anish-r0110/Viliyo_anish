import protooClient from "protoo-client";
import * as mediasoupClient from "mediasoup-client";
import * as cookiesManager from "./cookiesManager";
import * as e2e from "./e2e";
import { getProtooUrl } from "@/utils/StreamingHelperFunctions";
import {
  addPeer,
  addDataConsumer,
  removePeer,
  setPeerDisplayName,
  removeDataConsumer,
} from "@/store/reducers/LiveSessionReducers/peers";
import store from "@/store";
import {
  addProducer,
  removeProducer,
  setProducerPaused,
  setProducerResumed,
  setProducerScore,
  setProducerTrack,
} from "@/store/reducers/LiveSessionReducers/producers";
import Logger from "./logger";
import {
  setCanChangeWebcam,
  setMediaCapabilities,
  setRestartIceInProgress,
  setShareInProgress,
  setWebcamInProgress,
} from "@/store/reducers/LiveSessionReducers/me";
import { setRoomStatus } from "@/store/reducers/roomSlice";
import {
  removeConsumer,
  setConsumerCurrentLayers,
  setConsumerPaused,
  setConsumerResumed,
  setConsumerScore,
  addConsumer,
} from "@/store/reducers/LiveSessionReducers/consumer";
import { addDataProducer } from "@/store/reducers/LiveSessionReducers/dataProducers";
import { Producer, Transport } from "mediasoup-client/lib/types";
// import { setRoomActiveSpeaker } from '@/NewStreaming/stream/lib/redux/stateActions';

// Some Media Soup Constants
const logger = new Logger("RoomClient");

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
const WEBCAM_KSVC_ENCODINGS = [{ scalabilityMode: "S3T3_KEY" }];

const SCREEN_SHARING_SVC_ENCODINGS = [{ scalabilityMode: "S3T3", dtx: true }];

export default class TestRoomClient {
  _protooUrl: string;
  _protoo: any;
  _closed: boolean;
  _displayName: String;
  _displayImage: String;
  _bgImage: String;
  _strUserId: String;
  _device: mediasoupClient.Device;
  _forceTcp: String;
  _produce: String;
  _consume: String;
  _useDataChannel: String;
  _forceH264: boolean;
  _forceVP9: boolean;
  _externalVideo: null;
  _e2eKey: String;
  _externalVideoStream: null;
  _nextDataChannelTestNumber: number;
  _handlerName: mediasoupClient.types.BuiltinHandlerName;
  _useSimulcast: String;
  _useSharingSimulcast: String;
  _mediasoupDevice: any;
  _sendTransport: Transport;
  _recvTransport: Transport;
  _micProducer: Producer;
  _webcamProducer: null;
  _shareProducer: null;
  _chatDataProducer: null;
  _botDataProducer: null;
  _consumers: Map<any, any>;
  _dataConsumers: Map<any, any>;
  _webcams: Map<any, any>;
  _socketList: String;
  _webcam: { device: null; resolution: string };
  traineeEmail: any;

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
    bgImage,
    traineeEmail,
  }: {
    roomId: String;
    peerId: String;
    displayName: String;
    strUserId: String;
    device: mediasoupClient.Device | null;
    handlerName: String;
    useSimulcast: Boolean;
    useSharingSimulcast: Boolean;
    forceTcp: Boolean;
    produce: Boolean;
    consume: Boolean;
    forceH264: Boolean;
    forceVP9: Boolean;
    svc: String | null;
    datachannel: Boolean;
    externalVideo: String;
    e2eKey: String;
    socketList: String;
    displayImage: String;
    bgImage: String;
    traineeEmail: String;
  }) {
    store.subscribe(this.handleStoreChange);

    // Closed flag.
    // @type {Boolean}
    this._closed = false;
    // Display name.
    // @type {String}
    this.traineeEmail = traineeEmail;
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
      resolution: "hd",
    };

    this._protooUrl = getProtooUrl({ roomId, peerId });
  }

  handleStoreChange = () => {
    // Handle store changes here
    const state = store.getState();
    const peers = state.peers; // Access the peers slice state
    // Use the peers state as needed
  };

  async getCameraStream(
    callback: (stream: MediaStream | null) => void
  ): Promise<void> {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      callback(stream);
    } catch (error) {
      console.error("Error accessing camera:", error);
      callback(null);
    }
  }

  async join(audioEnabled = true, videoEnabled = true) {
    const protooTransport = new protooClient.WebSocketTransport(
      this._protooUrl
    );
    this._protoo = new protooClient.Peer(protooTransport);
    this._protoo.on("open", () => this._joinRoom(audioEnabled, videoEnabled));
    this._protoo.on("failed", () => {});

    this._protoo.on("disconnected", () => {
      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: 'WebSocket disconnected',
      //   }),
      // );
      console.log("Protoo Disconnected");

      // Close mediasoup Transports.
      if (this._sendTransport) {
        this._sendTransport.close();
        this._sendTransport = null;
      }

      if (this._recvTransport) {
        this._recvTransport.close();
        this._recvTransport = null;
      }

      // store.dispatch(stateActions.setRoomState('closed'));
    });

    this._protoo.on("request", async (request, accept, reject) => {
      // console.log("🚀 ~ TestRoomClient ~ this._protoo.on ~ request:", request);
      logger.debug(
        'proto "request" event [method:%s, data:%o]',
        request.method,
        request.data
      );

      switch (request.method) {
        case "newConsumer": {
          if (!this._consume) {
            reject(403, "I do not want to consume");
            break;
          }

          const {
            peerId,
            producerId,
            id,
            kind,
            rtpParameters,
            type,
            appData,
            producerPaused,
          } = request.data;

          console.log(
            "🚀 ~ TestRoomClient ~ this._protoo.on ~    peerId",
            peerId,
            producerId,
            id,
            kind,
            rtpParameters,
            type,
            appData,
            producerPaused
          );

          try {
            const consumer = await this._recvTransport.consume({
              id,
              producerId,
              kind,
              rtpParameters,
              appData: { ...appData, peerId }, // Trick.
            });

            if (this._e2eKey && e2e.isSupported()) {
              e2e.setupReceiverTransform(consumer.rtpReceiver);
            }
            // Store in the map.
            this._consumers.set(consumer.id, consumer);
            consumer.on("transportclose", () => {
              this._consumers.delete(consumer.id);
            });
            const { spatialLayers, temporalLayers } =
              mediasoupClient.parseScalabilityMode(
                consumer.rtpParameters.encodings[0].scalabilityMode
              );
            console.log("new Consumer", consumer);
            store.dispatch(
              addConsumer({
                consumer: {
                  id: consumer.id,
                  type: type,
                  locallyPaused: false,
                  remotelyPaused: producerPaused,
                  rtpParameters: consumer.rtpParameters,
                  spatialLayers: spatialLayers,
                  temporalLayers: temporalLayers,
                  preferredSpatialLayer: spatialLayers - 1,
                  preferredTemporalLayer: temporalLayers - 1,
                  priority: 1,
                  codec:
                    consumer.rtpParameters.codecs[0].mimeType.split("/")[1],
                  track: consumer.track,
                  peerId: peerId,
                },
                peerId: consumer.id,
              })
            );
            // We are ready. Answer the protoo request so the server will
            // resume this Consumer (which was paused for now if video).
            accept();
            // If audio-only mode is enabled, pause it.
            if (consumer.kind === "video") console.log("inside if");
            // this._pauseConsumer(consumer);
          } catch (error) {
            logger.error('"newConsumer" request failed:%o', error);

            // store.dispatch(
            //   requestActions.notify({
            //     type: 'error',
            //     text: `Error creating a Consumer: ${error}`,
            //   }),
            // );

            throw error;
          }

          break;
        }

        case "newDataConsumer": {
          if (!this._consume) {
            reject(403, "I do not want to data consume");

            break;
          }

          if (!this._useDataChannel) {
            reject(403, "I do not want DataChannels");

            break;
          }

          const {
            peerId, // NOTE: Null if bot.
            dataProducerId,
            id,
            sctpStreamParameters,
            label,
            protocol,
            appData,
          } = request.data;

          try {
            const dataConsumer = await this._recvTransport.consumeData({
              id,
              dataProducerId,
              sctpStreamParameters,
              label,
              protocol,
              appData: { ...appData, peerId }, // Trick.
            });

            // Store in the map.
            this._dataConsumers.set(dataConsumer.id, dataConsumer);

            dataConsumer.on("transportclose", () => {
              console.log("Data Consumer Transport Close");
              this._dataConsumers.delete(dataConsumer.id);
            });

            dataConsumer.on("open", () => {
              console.log("Data Consumer Open");
              logger.debug('DataConsumer "open" event');
            });

            dataConsumer.on("close", () => {
              console.log("Data Consumer Close");
              logger.warn('DataConsumer "close" event');

              this._dataConsumers.delete(dataConsumer.id);

              // store.dispatch(
              //   requestActions.notify({
              //     type: 'error',
              //     text: 'DataConsumer closed',
              //   }),
              // );
            });

            dataConsumer.on("error", (error) => {
              logger.error('DataConsumer "error" event:%o', error);

              // store.dispatch(
              //   requestActions.notify({
              //     type: 'error',
              //     text: `DataConsumer error: ${error}`,
              //   }),
              // );
            });

            dataConsumer.on("message", (message) => {
              logger.debug(
                'DataConsumer "message" event [streamId:%d]',
                dataConsumer.sctpStreamParameters.streamId
              );

              // TODO: For debugging.
              // window.DC_MESSAGE = message;

              if (message instanceof ArrayBuffer) {
                const view = new DataView(message);
                const number = view.getUint32();

                if (number == Math.pow(2, 32) - 1) {
                  logger.warn("dataChannelTest finished!");

                  this._nextDataChannelTestNumber = 0;

                  return;
                }

                if (number > this._nextDataChannelTestNumber) {
                  logger.warn(
                    "dataChannelTest: %s packets missing",
                    number - this._nextDataChannelTestNumber
                  );
                }

                this._nextDataChannelTestNumber = number + 1;

                return;
              } else if (typeof message !== "string") {
                logger.warn('ignoring DataConsumer "message" (not a string)');

                return;
              }

              switch (dataConsumer.label) {
                case "chat": {
                  const { peers } = store.getState();
                  const peersArray = Object.keys(peers).map(
                    (_peerId) => peers[_peerId]
                  );
                  const sendingPeer = peersArray.find((peer) =>
                    peer.dataConsumers.includes(dataConsumer.id)
                  );

                  if (!sendingPeer) {
                    logger.warn('DataConsumer "message" from unknown peer');

                    break;
                  }

                  // store.dispatch(
                  //   requestActions.notify({
                  //     title: `${sendingPeer.displayName} says:`,
                  //     text: message,
                  //     timeout: 5000,
                  //   }),
                  // );

                  break;
                }

                case "bot": {
                  // store.dispatch(
                  //   requestActions.notify({
                  //     title: 'Message from Bot:',
                  //     text: message,
                  //     timeout: 5000,
                  //   }),
                  // );

                  break;
                }
              }
            });

            // TODO: REMOVE
            // window.DC = dataConsumer;

            store.dispatch(
              addDataConsumer({
                dataConsumer: {
                  id: dataConsumer.id,
                  sctpStreamParameters: dataConsumer.sctpStreamParameters,
                  label: dataConsumer.label,
                  protocol: dataConsumer.protocol,
                },
                peerId: peerId,
              })
            );

            // We are ready. Answer the protoo request.
            accept();
          } catch (error) {
            logger.error('"newDataConsumer" request failed:%o', error);

            // store.dispatch(
            //   requestActions.notify({
            //     type: 'error',
            //     text: `Error creating a DataConsumer: ${error}`,
            //   }),
            // );

            throw error;
          }

          break;
        }
      }
    });

    this._protoo.on("notification", (notification) => {
      if (
        notification.method != "downlinkBwe" &&
        notification.method != "activeSpeaker"
      )
        console.log(
          "🚀 ~ TestRoomClient ~ this._protoo.on ~ notification:",
          notification
        );

      // if (notification.method !== "downlinkBwe") {
      //   console.log(
      //     "🚀 ~ TestRoomClient ~ this._protoo.on ~ notification:",
      //     notification
      //   );
      // }

      logger.debug(
        'proto "notification" event [method:%s, data:%o]',
        notification.method,
        notification.data
      );
      switch (notification.method) {
        case "producerScore": {
          const { producerId, score } = notification.data;
          store.dispatch(
            setProducerScore({ producerId: producerId, score: score })
          );
          break;
        }

        case "newPeer": {
          const peer = notification.data;

          console.log("🚀 ~ TestRoomClient ~ join ~ peer:", peer);

          store.dispatch(
            addPeer({ ...peer, consumers: [], dataConsumers: [] })
          );

          // store.dispatch(
          //   requestActions.notify({
          //     text: `${peer.displayName} has joined the room`,
          //   }),
          // );

          break;
        }

        case "peerClosed": {
          const { peerId } = notification.data;

          store.dispatch(removePeer(peerId));

          break;
        }

        case "peerDisplayNameChanged": {
          const { peerId, displayName, oldDisplayName } = notification.data;

          store.dispatch(
            setPeerDisplayName({ displayName: displayName, peerId: peerId })
          );

          // store.dispatch(
          //   requestActions.notify({
          //     text: `${oldDisplayName} is now ${displayName}`,
          //   }),
          // );

          break;
        }

        case "bgImageChanged": {
          const { peerId, bgImage, oldBgImage } = notification.data;

          // store.dispatch(stateActions.setPeerDisplayName(displayName, peerId));
          // store.dispatch(
          //   requestActions.notify({
          //     text: `${oldBgImage} is now ${oldBgImage}`,
          //   }),
          // );

          break;
        }

        case "downlinkBwe": {
          logger.debug("'downlinkBwe' event:%o", notification.data);
          // console.log('Downlink BWE',notification.data)
          break;
        }

        case "consumerClosed": {
          const { consumerId } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (!consumer) break;

          consumer.close();
          this._consumers.delete(consumerId);

          const { peerId } = consumer.appData;

          store.dispatch(removeConsumer(consumerId));
          // store.dispatch(removeConsumer(consumerId, peerId));

          break;
        }

        case "consumerPaused": {
          const { consumerId } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (!consumer) break;

          consumer.pause();

          store.dispatch(
            setConsumerPaused({ consumerId: consumerId, originator: "remote" })
          );

          break;
        }

        case "consumerResumed": {
          const { consumerId } = notification.data;

          console.log(
            "🚀 ~ TestRoomClient ~ this._protoo.on ~ consumerId:",
            consumerId
          );

          const consumer = this._consumers.get(consumerId);

          console.log(
            "🚀 ~ TestRoomClient ~ this._protoo.on ~ consumer:",
            consumer
          );

          if (!consumer) break;

          consumer.resume();

          store.dispatch(
            setConsumerResumed({ consumerId: consumerId, originator: "remote" })
          );

          break;
        }

        case "consumerLayersChanged": {
          const { consumerId, spatialLayer, temporalLayer } = notification.data;
          const consumer = this._consumers.get(consumerId);

          if (!consumer) break;

          store.dispatch(
            setConsumerCurrentLayers({
              consumerId: consumerId,
              spatialLayer: spatialLayer,
              temporalLayer: temporalLayer,
            })
          );

          break;
        }

        case "consumerScore": {
          const { consumerId, score } = notification.data;

          store.dispatch(
            setConsumerScore({ consumerId: consumerId, score: score })
          );

          break;
        }

        case "dataConsumerClosed": {
          const { dataConsumerId } = notification.data;
          const dataConsumer = this._dataConsumers.get(dataConsumerId);

          if (!dataConsumer) break;

          dataConsumer.close();
          this._dataConsumers.delete(dataConsumerId);

          const { peerId } = dataConsumer.appData;

          store.dispatch(
            removeDataConsumer({
              dataConsumerId: dataConsumerId,
              peerId: peerId,
            })
          );

          break;
        }

        case "activeSpeaker": {
          const { peerId } = notification.data;

          store.dispatch(setRoomActiveSpeaker({ peerId: peerId }));

          break;
        }

        default: {
          logger.error(
            'unknown protoo notification.method "%s"',
            notification.method
          );
        }
      }
    });
  }

  async _joinRoom(audioEnabled: Boolean, videoEnabled: Boolean) {
    logger.debug("_joinRoom()");
    console.log("inside join");
    try {
      this._mediasoupDevice = new mediasoupClient.Device({
        handlerName: this._handlerName,
      });

      const routerRtpCapabilities = await this._protoo.request(
        "getRouterRtpCapabilities"
      );

      console.log(
        "🚀 ~ TestRoomClient ~ _joinRoom ~ routerRtpCapabilities:",
        routerRtpCapabilities
      );

      await this._mediasoupDevice.load({ routerRtpCapabilities });

      // NOTE: Stuff to play remote audios due to browsers' new autoplay policy.
      //
      // Just get access to the mic and DO NOT close the mic track for a while.
      // Super hack!
      {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        const audioTrack = stream.getAudioTracks()[0];

        audioTrack.enabled = false;

        setTimeout(() => audioTrack.stop(), 120000);
      }
      // Create mediasoup Transport for sending (unless we don't want to produce).

      if (this._produce) {
        console.log(
          "🚀 ~ TestRoomClient ~ _joinRoom ~ this._produce:",
          this._produce
        );

        const transportInfo = await this._protoo.request(
          "createWebRtcTransport",
          {
            forceTcp: this._forceTcp,
            producing: true,
            consuming: false,
            sctpCapabilities: this._useDataChannel
              ? this._mediasoupDevice.sctpCapabilities
              : undefined,
          }
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
            role: "auto",
          },
          sctpParameters,
          iceServers: [],
          proprietaryConstraints: PC_PROPRIETARY_CONSTRAINTS,
          additionalSettings: {
            encodedInsertableStreams: this._e2eKey && e2e.isSupported(),
          },
        });

        this._sendTransport.on(
          "connect",
          (
            { dtlsParameters },
            callback,
            errback // eslint-disable-line no-shadow
          ) => {
            this._protoo
              .request("connectWebRtcTransport", {
                transportId: this._sendTransport.id,
                dtlsParameters,
              })
              .then(callback)
              .catch(errback);
          }
        );

        this._sendTransport.on(
          "produce",
          async ({ kind, rtpParameters, appData }, callback, errback) => {
            try {
              // eslint-disable-next-line no-shadow
              const { id } = await this._protoo.request("produce", {
                transportId: this._sendTransport.id,
                kind,
                rtpParameters,
                appData,
              });

              callback({ id });
            } catch (error) {
              errback(error);
            }
          }
        );

        this._sendTransport.on(
          "producedata",
          async (
            { sctpStreamParameters, label, protocol, appData },
            callback,
            errback
          ) => {
            try {
              // eslint-disable-next-line no-shadow
              const { id } = await this._protoo.request("produceData", {
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
          }
        );
      }
      // Create mediasoup Transport for receiving (unless we don't want to consume).
      if (this._consume) {
        console.log(
          "🚀 ~ TestRoomClient ~ _joinRoom ~ this._consume:",
          this._consume
        );

        const transportInfo = await this._protoo.request(
          "createWebRtcTransport",
          {
            forceTcp: this._forceTcp,
            producing: false,
            consuming: true,
            sctpCapabilities: this._useDataChannel
              ? this._mediasoupDevice.sctpCapabilities
              : undefined,
          }
        );

        console.log(
          "🚀 ~ TestRoomClient ~ _joinRoom ~ transportInfo:",
          transportInfo
        );

        const {
          id,
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
            role: "auto",
          },
          sctpParameters,
          iceServers: [],
          additionalSettings: {
            encodedInsertableStreams: this._e2eKey && e2e.isSupported(),
          },
        });

        console.log(
          "🚀 ~ TestRoomClient ~ _joinRoom ~ this._recvTransport:",
          this._recvTransport
        );

        this._recvTransport.on(
          "connect",
          (
            { dtlsParameters },
            callback,
            errback // eslint-disable-line no-shadow
          ) => {
            console.log("inside connect");
            this._protoo
              .request("connectWebRtcTransport", {
                transportId: this._recvTransport.id,
                dtlsParameters,
              })
              .then(callback)
              .catch(errback);
          }
        );
      }

      // this._device["userId"] = this._strUserId;

      console.log(
        "🚀 ~ TestRoomClient ~ _joinRoom ~ _strUserId:",
        this._strUserId
      );

      // Join now into the room.
      // NOTE: Don't send our RTP capabilities if we don't want to consume.
      const { peers } = await this._protoo.request("join", {
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

      console.log("🚀 ~ TestRoomClient ~ _joinRoom ~ peers:", peers);

      store.dispatch(setRoomStatus("connected"));

      // Clean all the existing notifcations.

      for (const peer of peers) {
        store.dispatch(addPeer({ ...peer, consumers: [], dataConsumers: [] }));
      }

      // Enable mic/webcam.
      if (this._produce) {
        // Set our media capabilities.
        store.dispatch(
          setMediaCapabilities({
            canSendMic: this._mediasoupDevice.canProduce("audio"),
            canSendWebcam: this._mediasoupDevice.canProduce("video"),
          })
        );

        this.enableMic().then(() => {
          if (!audioEnabled) {
            this.muteMic();
          }
        });

        const devicesCookie = cookiesManager.getDevices();

        //           if (
        // true          )
        //            { if (videoEnabled) {
        //               this.enableWebcam();
        //             }
        //             }
        this.enableWebcam();
        this._sendTransport.on("connectionstatechange", (connectionState) => {
          if (connectionState === "connected") {
            this.enableChatDataProducer();
            this.enableBotDataProducer();
          }
        });
      }

      // NOTE: For testing.
      // if (window.SHOW_INFO) {
      //   const { me } = store.getState();
      // store.dispatch(stateActions.setRoomStatsPeerId(me.id));
      // }
    } catch (error) {
      logger.error("_joinRoom() failed:%o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Could not join the room: ${error}`,
      //   }),
      // );

      // this.close();
      // setTimeout(() => {
      //   this._joinRoom()
      // }, siteConfig.REJOIN_TIMEOUT)
    }
  }

  async enableMic() {
    logger.debug("enableMic()");
    if (this._micProducer) return;
    this.enableWebcam();
    if (!this._mediasoupDevice.canProduce("audio")) {
      logger.error("enableMic() | cannot produce audio");

      return;
    }

    let track;

    try {
      if (!this._externalVideo) {
        logger.debug("enableMic() | calling getUserMedia()");
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        track = stream.getAudioTracks()[0];
      } else {
        const stream = await this._getExternalVideoStream();
        track = stream.getAudioTracks()[0].clone();
      }

      this._micProducer = await this._sendTransport.produce({
        track,
        codecOptions: {
          opusStereo: 1,
          opusDtx: 1,
        },
        // NOTE: for testing codec selection.
        // codec : this._mediasoupDevice.rtpCapabilities.codecs
        // 	.find((codec) => codec.mimeType.toLowerCase() === 'audio/pcma')
      });

      if (this._e2eKey && e2e.isSupported()) {
        e2e.setupSenderTransform(this._micProducer.rtpSender);
      }

      store.dispatch(
        addProducer({
          producer: {
            id: this._micProducer.id,
            paused: this._micProducer.paused,
            track: this._micProducer.track,
            rtpParameters: this._micProducer.rtpParameters,
            codec:
              this._micProducer.rtpParameters.codecs[0].mimeType.split("/")[1],
            identifier: this.traineeEmail,
          },
        })
      );

      this._micProducer.on("transportclose", () => {
        this._micProducer = null;
      });

      this._micProducer.on("trackended", () => {
        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: 'Microphone disconnected!',
        //   }),
        // );

        this.disableMic().catch(() => {});
      });
    } catch (error) {
      logger.error("enableMic() | failed:%o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Error enabling microphone: ${error}`,
      //   }),
      // );

      if (track) track.stop();
    }
  }

  async _pauseConsumer(consumer) {
    if (consumer.paused) return;

    try {
      await this._protoo.request("pauseConsumer", { consumerId: consumer.id });

      consumer.pause();

      store.dispatch(
        setConsumerPaused({ consumerId: consumer.id, originator: "local" })
      );
    } catch (error) {
      logger.error("_pauseConsumer() | failed:%o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Error pausing Consumer: ${error}`,
      //   }),
      // );
    }
  }

  async disableMic() {
    logger.debug("disableMic()");

    if (!this._micProducer) return;

    this._micProducer.close();

    store.dispatch(removeProducer(this._micProducer.id));

    try {
      await this._protoo.request("closeProducer", {
        producerId: this._micProducer.id,
      });
    } catch (error) {
      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Error closing server-side mic Producer: ${error}`,
      //   }),
      // );
    }

    this._micProducer = null;
  }

  async muteMic() {
    logger.debug("muteMic()");

    this._micProducer.pause();

    try {
      await this._protoo.request("pauseProducer", {
        producerId: this._micProducer.id,
      });

      store.dispatch(setProducerPaused(this._micProducer.id));
    } catch (error) {
      logger.error("muteMic() | failed: %o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Error pausing server-side mic Producer: ${error}`,
      //   }),
      // );
    }
  }

  async unmuteMic() {
    logger.debug("unmuteMic()");

    this._micProducer?.resume();

    try {
      await this._protoo.request("resumeProducer", {
        producerId: this._micProducer.id,
      });

      store.dispatch(setProducerResumed(this._micProducer.id));
    } catch (error) {
      logger.error("unmuteMic() | failed: %o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Error resuming server-side mic Producer: ${error}`,
      //   }),
      // );
    }
  }

  async enableWebcam() {
    logger.debug("enableWebcam()");

    if (this._webcamProducer) return;
    else if (this._shareProducer) await this.disableShare();
    if (!this._mediasoupDevice) {
      // if mediasoup device is not loaded yet, return.
      return;
    }
    if (!this._mediasoupDevice?.canProduce("video")) {
      logger.error("enableWebcam() | cannot produce video");
      return;
    }

    let track;
    let device;

    store.dispatch(setWebcamInProgress(true));

    try {
      if (!this._externalVideo) {
        await this._updateWebcams();
        device = this._webcam.device;
        const { resolution } = this._webcam;
        if (!device) throw new Error("no webcam devices");

        logger.debug("enableWebcam() | calling getUserMedia()");
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            deviceId: { ideal: device.deviceId },
            ...VIDEO_CONSTRAINS[resolution],
          },
        });
        track = stream.getVideoTracks()[0];
      } else {
        device = { label: "external video" };
        const stream = await this._getExternalVideoStream();
        track = stream.getVideoTracks()[0].clone();
      }

      let encodings;
      let codec;
      const codecOptions = {
        videoGoogleStartBitrate: 1000,
      };

      if (this._forceH264) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === "video/h264"
        );
        if (!codec) {
          throw new Error("desired H264 codec+configuration is not supported");
        }
      } else if (this._forceVP9) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === "video/vp9"
        );
        if (!codec) {
          throw new Error("desired VP9 codec+configuration is not supported");
        }
      }

      if (this._useSimulcast) {
        const firstVideoCodec =
          this._mediasoupDevice.rtpCapabilities.codecs.find(
            (c) => c.kind === "video"
          );
        if (
          (this._forceVP9 && codec) ||
          firstVideoCodec.mimeType.toLowerCase() === "video/vp9"
        ) {
          encodings = WEBCAM_KSVC_ENCODINGS;
        } else {
          encodings = WEBCAM_SIMULCAST_ENCODINGS;
        }
      }

      this._webcamProducer = await this._sendTransport.produce({
        track,
        encodings,
        codecOptions,
        codec,
      });

      if (this._e2eKey && e2e.isSupported()) {
        e2e.setupSenderTransform(this._webcamProducer.rtpSender);
      }

      await store.dispatch(
        addProducer({
          producer: {
            id: this._webcamProducer.id,
            deviceLabel: device.label,
            type: this._getWebcamType(device),
            paused: this._webcamProducer.paused,
            track: this._webcamProducer.track,
            rtpParameters: this._webcamProducer.rtpParameters,
            codec:
              this._webcamProducer.rtpParameters.codecs[0].mimeType.split(
                "/"
              )[1],
          },
        })
      );

      this._webcamProducer.on("transportclose", () => {
        this._webcamProducer = null;
      });

      this._webcamProducer.on("trackended", () => {
        this.disableWebcam().catch(() => {});
      });
    } catch (error) {
      logger.error("enableWebcam() | failed:%o", error);
      console.log("Stopping the track inside catch", error);
      if (track) track.stop();
    }

    store.dispatch(setWebcamInProgress(false));
  }

  _getWebcamType(device) {
    if (/(back|rear)/i.test(device.label)) {
      logger.debug("_getWebcamType() | it seems to be a back camera");

      return "back";
    } else {
      logger.debug("_getWebcamType() | it seems to be a front camera");

      return "front";
    }
  }

  async disableWebcam() {
    logger.debug("disableWebcam()");

    if (!this._webcamProducer) return;

    this._webcamProducer.close();

    store.dispatch(removeProducer(this._webcamProducer.id));

    try {
      await this._protoo.request("closeProducer", {
        producerId: this._webcamProducer.id,
      });
    } catch (error) {
      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Error closing server-side webcam Producer: ${error}`,
      //   }),
      // );
    }

    this._webcamProducer = null;
  }

  async changeWebcam() {
    logger.debug("changeWebcam()");

    store.dispatch(setWebcamInProgress(true));

    try {
      await this._updateWebcams();

      const array = Array.from(this._webcams.keys());
      const len = array.length;
      const deviceId = this._webcam.device
        ? this._webcam.device.deviceId
        : undefined;
      let idx = array.indexOf(deviceId);

      if (idx < len - 1) idx++;
      else idx = 0;

      this._webcam.device = this._webcams.get(array[idx]);

      logger.debug(
        "changeWebcam() | new selected webcam [device:%o]",
        this._webcam.device
      );

      // Reset video resolution to HD.
      this._webcam.resolution = "hd";

      if (!this._webcam.device) throw new Error("no webcam devices");

      // Closing the current video track before asking for a new one (mobiles do not like
      // having both front/back cameras open at the same time).
      // this._webcamProducer.track.stop();

      logger.debug("changeWebcam() | calling getUserMedia()");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: this._webcam.device.deviceId },
          ...VIDEO_CONSTRAINS[this._webcam.resolution],
        },
      });

      const track = stream.getVideoTracks()[0];

      await this._webcamProducer.replaceTrack({ track });

      // store.dispatch(setProducerTrack(this._webcamProducer.id, track));
    } catch (error) {
      logger.error("changeWebcam() | failed: %o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Could not change webcam: ${error}`,
      //   }),
      // );
    }

    store.dispatch(setWebcamInProgress(false));
  }

  async changeWebcamResolution() {
    logger.debug("changeWebcamResolution()");

    store.dispatch(setWebcamInProgress(true));

    try {
      switch (this._webcam.resolution) {
        case "qvga":
          this._webcam.resolution = "vga";
          break;
        case "vga":
          this._webcam.resolution = "hd";
          break;
        case "hd":
          this._webcam.resolution = "qvga";
          break;
        default:
          this._webcam.resolution = "hd";
      }

      logger.debug("changeWebcamResolution() | calling getUserMedia()");

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: this._webcam.device.deviceId },
          ...VIDEO_CONSTRAINS[this._webcam.resolution],
        },
      });

      const track = stream.getVideoTracks()[0];

      await this._webcamProducer.replaceTrack({ track });

      // store.dispatch(setProducerTrack(this._webcamProducer.id, track));
    } catch (error) {
      logger.error("changeWebcamResolution() | failed: %o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Could not change webcam resolution: ${error}`,
      //   }),
      // );
    }

    store.dispatch(setWebcamInProgress(false));
  }

  async enableShare(captureAudio) {
    logger.debug("enableShare()");

    if (this._shareProducer) return;
    else if (this._webcamProducer) await this.disableWebcam();

    if (!(this._mediasoupDevice && this._mediasoupDevice.canProduce("video"))) {
      logger.error("enableShare() | cannot produce video");
      return;
    }
    let track;

    store.dispatch(setShareInProgress(true));

    try {
      logger.debug("enableShare() | calling getUserMedia()");
      const stream = await navigator.mediaDevices
        .getDisplayMedia({
          audio: captureAudio,
          video: {
            displaySurface: "monitor",
            logicalSurface: true,
            cursor: true,
            width: { max: 1920 },
            height: { max: 1080 },
            frameRate: { max: 30 },
          },
        })
        .then((stream) => {})
        .catch((error) => {
          if (error.name === "NotAllowedError") {
            // store.dispatch(setCancelRecording(true));
            // User cancelled screen sharing
          } else {
            // Handle other errors
            // store.dispatch(setCancelRecording(false));
            console.error("Error accessing screen sharing:", error);
          }
        });

      // May mean cancelled (in some implementations).
      if (!stream) {
        store.dispatch(setShareInProgress(true));

        return;
      }

      track = stream.getVideoTracks()[0];

      let encodings;
      let codec;
      const codecOptions = {
        videoGoogleStartBitrate: 1000,
      };

      if (this._forceH264) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === "video/h264"
        );

        if (!codec) {
          throw new Error("desired H264 codec+configuration is not supported");
        }
      } else if (this._forceVP9) {
        codec = this._mediasoupDevice.rtpCapabilities.codecs.find(
          (c) => c.mimeType.toLowerCase() === "video/vp9"
        );

        if (!codec) {
          throw new Error("desired VP9 codec+configuration is not supported");
        }
      }

      if (this._useSharingSimulcast) {
        // If VP9 is the only available video codec then use SVC.
        const firstVideoCodec =
          this._mediasoupDevice.rtpCapabilities.codecs.find(
            (c) => c.kind === "video"
          );

        if (
          (this._forceVP9 && codec) ||
          firstVideoCodec.mimeType.toLowerCase() === "video/vp9"
        ) {
          encodings = SCREEN_SHARING_SVC_ENCODINGS;
        } else {
          encodings = SCREEN_SHARING_SIMULCAST_ENCODINGS.map((encoding) => ({
            ...encoding,
            dtx: true,
          }));
        }
      }

      this._shareProducer = await this._sendTransport.produce({
        track,
        encodings,
        codecOptions,
        codec,
        appData: {
          share: true,
        },
      });

      if (this._e2eKey && e2e.isSupported()) {
        e2e.setupSenderTransform(this._shareProducer.rtpSender);
      }

      store.dispatch(
        addProducer({
          id: this._shareProducer.id,
          type: "share",
          paused: this._shareProducer.paused,
          track: this._shareProducer.track,
          rtpParameters: this._shareProducer.rtpParameters,
          codec:
            this._shareProducer.rtpParameters.codecs[0].mimeType.split("/")[1],
        })
      );

      this._shareProducer.on("transportclose", () => {
        this._shareProducer = null;
      });

      this._shareProducer.on("trackended", () => {
        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: 'Share disconnected!',
        //   }),
        // );

        this.disableShare().catch(() => {});
      });
    } catch (error) {
      logger.error("enableShare() | failed:%o", error);

      if (error.name !== "NotAllowedError") {
        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: `Error sharing: ${error}`,
        //   }),
        // );
      }

      if (track) track.stop();
    }

    // store.dispatch(stateActions.setShareInProgress(false));
  }

  async disableShare(sessionMapId = null) {
    logger.debug("disableShare()");

    if (!this._shareProducer) return;

    this._shareProducer.close();

    store.dispatch(removeProducer(this._shareProducer.id));

    try {
      await this._protoo.request("closeProducer", {
        producerId: this._shareProducer.id,
      });
    } catch (error) {}
    this._shareProducer = null;
    // this is for disabling share screen
    // let objMessage = {
    //   type: "disable_screenshare",
    //   room_id: sessionMapId,
    // }
    // if (sessionMapId !== null) {
    //   instUserInfoMapperSocket.initSocket(sessionMapId, () => null);
    //   instUserInfoMapperSocket.sendMessage(JSON.stringify(objMessage));
    // }
  }

  async _updateWebcams() {
    // Reset the list.
    this._webcams = new Map();

    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log("🚀 ~ TestRoomClient ~ _updateWebcams ~ devices:", devices);

    for (const device of devices) {
      if (device.kind !== "videoinput") continue;
      this._webcams.set(device.deviceId, device);
    }

    console.log(
      "🚀 ~ TestRoomClient ~ _updateWebcams ~ this._webcams:",
      this._webcams,
      this._webcam.device
    );

    const array = Array.from(this._webcams.values());
    const len = array.length;
    const currentWebcamId = this._webcam.device
      ? this._webcam.device.deviceId
      : undefined;
    console.log(
      "🚀 ~ TestRoomClient ~ _updateWebcams ~ currentWebcamId:",
      currentWebcamId
    );

    if (len === 0) this._webcam.device = null;
    else if (!this._webcams.has(currentWebcamId))
      this._webcam.device = array[0];

    store.dispatch(setCanChangeWebcam(this._webcams.size > 1));
  }

  async _getExternalVideoStream() {
    if (this._externalVideoStream) return this._externalVideoStream;

    if (this._externalVideo.readyState < 3) {
      await new Promise((resolve) =>
        this._externalVideo.addEventListener("canplay", resolve)
      );
    }

    if (this._externalVideo.captureStream)
      this._externalVideoStream = this._externalVideo.captureStream();
    else if (this._externalVideo.mozCaptureStream)
      this._externalVideoStream = this._externalVideo.mozCaptureStream();
    else throw new Error("video.captureStream() not supported");

    return this._externalVideoStream;
  }

  async restartIce() {
    logger.debug("restartIce()");

    store.dispatch(setRestartIceInProgress(true));

    try {
      if (this._sendTransport) {
        const iceParameters = await this._protoo.request("restartIce", {
          transportId: this._sendTransport.id,
        });

        await this._sendTransport.restartIce({ iceParameters });
      }

      if (this._recvTransport) {
        const iceParameters = await this._protoo.request("restartIce", {
          transportId: this._recvTransport.id,
        });

        await this._recvTransport.restartIce({ iceParameters });
      }

      // store.dispatch(
      //   requestActions.notify({
      //     text: 'ICE restarted',
      //   }),
      // );
    } catch (error) {
      logger.error("restartIce() | failed:%o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `ICE restart failed: ${error}`,
      //   }),
      // );
    }

    store.dispatch(setRestartIceInProgress(false));
  }

  async enableChatDataProducer() {
    logger.debug("enableChatDataProducer()");

    if (!this._useDataChannel) return;

    // NOTE: Should enable this code but it's useful for testing.
    // if (this._chatDataProducer)
    // 	return;

    try {
      // Create chat DataProducer.
      this._chatDataProducer = await this._sendTransport.produceData({
        ordered: false,
        maxRetransmits: 1,
        label: "chat",
        priority: "medium",
        appData: { info: "my-chat-DataProducer" },
      });

      store.dispatch(
        addDataProducer({
          id: this._chatDataProducer.id,
          sctpStreamParameters: this._chatDataProducer.sctpStreamParameters,
          label: this._chatDataProducer.label,
          protocol: this._chatDataProducer.protocol,
        })
      );

      this._chatDataProducer.on("transportclose", () => {
        this._chatDataProducer = null;
      });

      this._chatDataProducer.on("open", () => {
        logger.debug('chat DataProducer "open" event');
      });

      this._chatDataProducer.on("close", () => {
        logger.error('chat DataProducer "close" event');

        this._chatDataProducer = null;

        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: 'Chat DataProducer closed',
        //   }),
        // );
      });

      this._chatDataProducer.on("error", (error) => {
        logger.error('chat DataProducer "error" event:%o', error);

        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: `Chat DataProducer error: ${error}`,
        //   }),
        // );
      });

      this._chatDataProducer.on("bufferedamountlow", () => {
        logger.debug('chat DataProducer "bufferedamountlow" event');
      });
    } catch (error) {
      logger.error("enableChatDataProducer() | failed:%o", error);

      store.dispatch(
        requestActions.notify({
          type: "error",
          text: `Error enabling chat DataProducer: ${error}`,
        })
      );

      throw error;
    }
  }

  async enableBotDataProducer() {
    logger.debug("enableBotDataProducer()");

    if (!this._useDataChannel) return;

    // NOTE: Should enable this code but it's useful for testing.
    // if (this._botDataProducer)
    // 	return;

    try {
      // Create chat DataProducer.
      this._botDataProducer = await this._sendTransport.produceData({
        ordered: false,
        maxPacketLifeTime: 2000,
        label: "bot",
        priority: "medium",
        appData: { info: "my-bot-DataProducer" },
      });

      store.dispatch(
        addDataProducer({
          id: this._botDataProducer.id,
          sctpStreamParameters: this._botDataProducer.sctpStreamParameters,
          label: this._botDataProducer.label,
          protocol: this._botDataProducer.protocol,
        })
      );

      this._botDataProducer.on("transportclose", () => {
        this._botDataProducer = null;
      });

      this._botDataProducer.on("open", () => {
        logger.debug('bot DataProducer "open" event');
      });

      this._botDataProducer.on("close", () => {
        logger.error('bot DataProducer "close" event');

        this._botDataProducer = null;

        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: 'Bot DataProducer closed',
        //   }),
        // );
      });

      this._botDataProducer.on("error", (error) => {
        logger.error('bot DataProducer "error" event:%o', error);

        // store.dispatch(
        //   requestActions.notify({
        //     type: 'error',
        //     text: `Bot DataProducer error: ${error}`,
        //   }),
        // );
      });

      this._botDataProducer.on("bufferedamountlow", () => {
        logger.debug('bot DataProducer "bufferedamountlow" event');
      });
    } catch (error) {
      logger.error("enableBotDataProducer() | failed:%o", error);

      // store.dispatch(
      //   requestActions.notify({
      //     type: 'error',
      //     text: `Error enabling bot DataProducer: ${error}`,
      //   }),
      // );

      throw error;
    }
  }

  // Redux Functions
}
