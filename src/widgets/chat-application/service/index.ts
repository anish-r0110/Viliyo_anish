
const getMessageToId = (roomId: string): string => {
  return roomId
    .split("_")
    .filter(value => value !== traineeData.id)
    .join("_");
};

const createMessageObject = (message: string, isAttachment: boolean, roomId: string) => ({
  message,
  message_by: "participant",
  message_by_name: traineeData.name,
  message_by_id: traineeData.id,
  message_type: isAttachment ? "attachment" : "text",
  message_to: "participant",
  message_to_id: getMessageToId(roomId),
  message_time: getCurrentTime(),
  message_reply_to: "",
});

const createPayload = (roomId: string, sessionMapId: string, messageObject: any) => ({
  type: roomId.split("_").length === 2 ? "private_chat" : "group_chat",
  room_id: roomId,
  session_map_id: sessionMapId,
  message_by_id: traineeData.id,
  message_to_id: messageObject.message_to_id,
  user_message_data: JSON.stringify(messageObject),
});

export const sendMessage = async (
  roomId: string,
  sessionMapId: string,
  message: string,
  userInfoHandler: any,
  eventObject: any,
  isAttachment = false
) => {
  const messageObject = createMessageObject(message, isAttachment, roomId);
  const payload = createPayload(roomId, sessionMapId, messageObject);

  const response = await chatService.createChat(payload);
  eventObject.message = messageObject;
  userInfoHandler?.sendMessage(JSON.stringify(eventObject));
  
  return response;
};
