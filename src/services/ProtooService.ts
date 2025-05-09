import { getProtooUrl } from "@/utils/StreamingHelperFunctions";
import store from "@/store";
// Livestream Imports
import protooClient, { Peer } from "protoo-client";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
export default class ProtooService {
  protooInstance: null | Peer;
  consumers: Map<any, any>;
  constructor(sessionId: string | String, peerId: String | string) {
    const protooUrl = getProtooUrl({ roomId: sessionId, peerId });
    const protooTransport = new protooClient.WebSocketTransport(protooUrl);
    this.protooInstance = new protooClient.Peer(protooTransport);
    this.consumers = new Map();
    // Subscribing to Protoo Notificattions:
    this.protooInstance.on("open", () => {
      console.log("Protoo Event : Connected");
      store.dispatch(
        updateLiveStreamSettings({
          protooConnection: true,
          protooInstance: this.protooInstance,
        })
      );
    });
    this.protooInstance.on("failed", () => {
      console.log("Protoo Event : Failed");
    });
    this.protooInstance.on("disconnected", () => {
      console.log("Protoo Event : disconnected");
    });
    this.protooInstance.on("request", async (request, accept, reject) => {
      console.log("Protoo Event : request ");

      switch (request.method) {
        case "newConsumer": {
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
          try {
            const consumer = await this.rec.consume({
              id,
              producerId,
              kind,
              rtpParameters,
              appData: { ...appData, peerId }, // Trick.
            });

            this.consumers.set(consumer.id, consumer);
          } catch (error) {
            console.log("Error while adding new consumer", error);
          }

          break;
        }
      }
    });
    this.protooInstance.on("notification", (notifcation) => {
      console.log("Protoo Event : notification", notifcation);
    });
  }
}
