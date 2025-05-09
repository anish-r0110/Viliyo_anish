import store from "@/store";
import Payload from "../interfaces/Payload";

export default function handleShowEmoji( payload:Payload ){
   
    const auth =  store.getState().auth
    const reactedBy =  payload.user_reaction_data.reacted_by 

    if( auth.user?.email !== reactedBy )
        alert( payload.user_reaction_data.reacted_by + ' reacted with ' + payload.user_reaction_data.reaction_type)
 }
 