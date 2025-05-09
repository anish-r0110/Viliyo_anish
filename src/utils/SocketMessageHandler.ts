import { LiveSessionEventTypes } from "@/config/LiveStreamingConstants";
import store from "@/store";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";

export class SocketMessageHandler {
  async handleSocketMessage(event) {
    event = JSON.parse(event);

    switch (event.type) {
      case LiveSessionEventTypes.SESSION_MODE: {
        // Here we get the event session mode which can be instructor / networking etc. Then we update the redux with the mode and reflect in staging / playarea
        store.dispatch(updateLiveStreamSettings({ mode: event.value }));
        break;
      }
      default: {
        console.log("Event In Handler", event);
      }
    }
  }
}
// export const handleSocketMessage = (event) => {
//   event = JSON.parse(event);
//   const dispatch = useDispatch();
//   switch (event.type) {
//     case LiveSessionEventTypes.SESSION_MODE: {
//       // Here we get the event session mode which can be instructor / networking etc. Then we update the redux with the mode and reflect in staging / playarea
//       console.log("event", event);
//       dispatch(updateLiveStreamSettings({ mode: event.value }));
//       break;
//     }
//     default: {
//       console.log("Event In Handler", event);
//     }
//   }
// };
