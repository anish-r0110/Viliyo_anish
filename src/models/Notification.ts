export default interface INotification {
  id: string;
  message: { type:string , title:string , [key:string]: any };
  type: string;
  isRead: boolean;
  created_at?: string;
}
