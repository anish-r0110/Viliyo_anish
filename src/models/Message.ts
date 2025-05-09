interface IAuthor {
    id:number
    name:string,
    avatar:string,
}

type MessageType = "text" | "attachment"

export default interface IMessage {
  text:string,
  author: IAuthor,
  isTrainerMessage:boolean
  type:MessageType
  isPrivate:boolean
  time:string,
  threadID: string
}