import INotification from "@/models/Notification";

const transformNotification = (data: any): INotification => ({
  id: data.id,
  message: JSON.parse(data.content),
  isRead: data.read_status ? true : false,
  type: "Reminder",
  created_at: data.created_at,
});

export default transformNotification;
