import { IMessage } from '@/models';
import { User } from '@/models/User';
import { getCurrentTime } from '@/utils';
import _ from 'lodash'


export const privateList = (data:any,user:any) => {
    let responseArray:any= [];
    data.map((item:any)=>{
    
        responseArray.push({
            lastMessage : item.lastMessage,
            room_id : item.room_id,
            chatParticipants : _.remove(item.users,(val:any)=>{
                if(val.id != user.id) return true
            }),
            traineeData : user   
        })
    })
    return responseArray
}

export const transformSocketMessage = ( data:any):IMessage => {

    const isTrainerMessage = typeof data.message_by == 'string' &&  data.message_by.toLowerCase() == 'trainer'
  
    return {
        author: { id: data.message_by_id , name:data.message_by_name , avatar:data.sender_image },
        text:data.message,
        isPrivate: data.sub_type == 'class'? false : true,
        isTrainerMessage: isTrainerMessage,
        type:data.message_type,
        time:data.message_time,
        threadID:data.chat_box_id ?? ''
    }

}

export const transformResponseMessage = ( data:any ):IMessage => {

    const isTrainerMessage = typeof data.message_by == 'string' &&  data.message_by.toLowerCase() == 'trainer'
    const x = JSON.parse(data.user_message_data)

    return {
        author: { id: x.message_by_id , name:x.message_by_name , avatar:x.sender_image },
        text:x.message,
        isPrivate:false,
        isTrainerMessage: isTrainerMessage,
        type:x.message_type,
        time:x.message_time,
        threadID:data.room_id ?? ''
    }

}


export const createSocketMessage = ( message:string , auth :User , type:string , roomID:string ) => {

     let payload  = {
        message: message,
        message_by: "participant",
        message_by_name: auth.name,
        message_by_id: auth.id,
        message_type:type,
        message_to: "participant",
        message_to_id:roomID ,
        message_time: getCurrentTime(),
        message_reply_to: type === 'common'
    };

    return payload

}