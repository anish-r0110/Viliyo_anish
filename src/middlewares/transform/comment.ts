import IComment from "@/interfaces/Comment";

const transformComment = (data: any): IComment => ({
  id: data?.id,
  content: data?.reply || "hello",
  author: {
    id: data?.reply_by?.id,
    name: data?.reply_by?.trainee_name, //`${data?.reply_by?.first_name} ${data?.reply_by?.last_name}`,
    email: data?.reply_by?.trainee_email,
    profileImage: data?.reply_by?.profile_photo,
  },
  timestamp: data?.created_at,
});

export default transformComment;
