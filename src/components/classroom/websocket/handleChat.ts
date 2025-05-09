import { transformSocketMessage } from "@/middlewares/transform/chat";
import Payload from "../interfaces/Payload";
import store from "@/store";
import { addChat } from "@/store/reducers/chat";

export default function handleChat( payload:Payload ){
    console.log( payload );
    const message = transformSocketMessage(payload.message )
    store.dispatch( addChat( message) )
 }