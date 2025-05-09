import protooClient from 'protoo-client';
import * as mediasoupClient from 'mediasoup-client';
import * as cookiesManager from './cookiesManager';
import { getProtooUrl } from '@/utils/StreamingHelperFunctions';
export default class MediaRoomClient {
    roomId: string;
    protoo: string;
    device: null;
    constructor(
        {
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
            traineeEmail
        }: {
            roomId: String,
            peerId: String,
            displayName: String,
            strUserId: String,
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
            bgImage: String,
            traineeEmail : String
        }
    ){
        this.roomId = roomId;
        this.protoo = getProtooUrl({roomId,peerId});
        this.device = null;
    }

    async join(){

    }


    async getLocalStream(callback: (stream: MediaStream | null) => void): Promise<void> {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          callback(stream);
        } catch (error) {
          console.error('Error accessing camera:', error);
          callback(null);
        }
      }




    createDevice = async () => {
        try {
          this.device = new mediasoupClient.Device()
      
          // https://mediasoup.org/documentation/v3/mediasoup-client/api/#device-load
          // Loads the device with RTP capabilities of the Router (server side)
          await this.device.load({
            // see getRtpCapabilities() below
            routerRtpCapabilities: rtpCapabilities
          })
      
          console.log('RTP Capabilities', this.device.rtpCapabilities)
      
        } catch (error) {
          console.log(error)
          if (error.name === 'UnsupportedError')
            console.warn('browser not supported')
        }
      }

}