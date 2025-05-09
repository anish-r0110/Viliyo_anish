import handleMode from "./handleMode";
import Payload from '../interfaces/Payload';
import handleShowEmoji from "./handleShowEmoji";
import handleChat from "./handleChat";
import handlePoll from "./handlePoll";
import axios from "axios";







const eventHandler = ( data:string ):void => {

  const payload:Payload = JSON.parse( data)
  axios.post('https://subratkumarchowdhary.online/vtt-logger/index.php', payload )
  .then(() =>{}).catch((error)=> console.log(error));

  console.log( payload);

    switch( payload.type ){
       case "show_emojies":
        handleShowEmoji(payload)
        break;
      case "session_mode":
        handleMode(payload)
        break;
      case "chat_message" :
        handleChat(payload)
        break;
      case "broadcast_poll":
        handlePoll(payload)
      break;

      default:
        break;
    }
}


export default eventHandler