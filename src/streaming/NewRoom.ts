import protooClient from 'protoo-client';
import * as mediasoupClient from 'mediasoup-client';
import * as cookiesManager from './cookiesManager';
import * as e2e from './e2e'
import { getProtooUrl } from '@/utils/StreamingHelperFunctions';
import { useSelector } from 'react-redux';
import { addPeer, addDataConsumer, removePeer, setPeerDisplayName, removeDataConsumer } from '@/store/reducers/LiveSessionReducers/peers';
import store from '@/store';
import { addProducer, removeProducer, setProducerPaused, setProducerResumed, setProducerScore, setProducerTrack } from '@/store/reducers/LiveSessionReducers/producers';
import Logger from './logger';
import { setMediaCapabilities, setRestartIceInProgress, setShareInProgress, setWebcamInProgress } from '@/store/reducers/LiveSessionReducers/me';
import { setRoomStatus } from '@/store/reducers/roomSlice';
import { removeConsumer, setConsumerCurrentLayers, setConsumerPaused, setConsumerResumed, setConsumerScore,addConsumer } from '@/store/reducers/LiveSessionReducers/consumer';
import { addDataProducer } from '@/store/reducers/LiveSessionReducers/dataProducers';

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
  // Used for simulcast screen sharing.
  const SCREEN_SHARING_SIMULCAST_ENCODINGS = [
    { dtx: true, maxBitrate: 1500000 },
    { dtx: true, maxBitrate: 6000000 },
  ];
  // Used for VP9 screen sharing.
  const SCREEN_SHARING_SVC_ENCODINGS = [{ scalabilityMode: 'S3T3', dtx: true }];
  // const EXTERNAL_VIDEO_SRC = '/resources/videos/video-audio-stereo.mp4';

export default class NewRoom{
      /**
   * @param  {Object} data
   * @param  {Object} data.store - The Redux store.
   */
  static init(data: { store: any; }) {
    store = data.store;
  }

}
