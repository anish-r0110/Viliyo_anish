import store from "@/store";
import Payload from "../interfaces/Payload";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
import Mode from "../model/Mode";


function handleMode( data:Payload ) {

    if(data.value === "Activity Mode")
       store.dispatch( updateLiveStreamSettings( { mode: Mode.ACTIVITY }) )
  
    if( data.value === "Break/Networking Mode")
      store.dispatch( updateLiveStreamSettings({ mode:Mode.NETWORKING}))
    
    if( data.value === "Instructor Mode")
      store.dispatch( updateLiveStreamSettings({ mode:Mode.INSTRUCTOR}) )
}

export default handleMode;