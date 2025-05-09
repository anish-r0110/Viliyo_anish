import IQuery, { IComment, IReply } from "@/interfaces/Query";




const transformReply = (data:any):IReply => ({ 
   id:data.id ,
   isTrainerResponse:data.repliedByTrainer,
   avatar:(data && data.reply_by && data.reply_by.profile_photo)?data.reply_by.profile_photo:'',
   message:data.reply ,
   name:data.trainee_name ,
   comments:data.commentsOnReply.map( (comment:any) => transformComment( comment)),
   createdAt:data.created_at
});

const transformComment = ( data:any):IComment => ({
   id:data.id ,
   message:data.comment,
   auth:{
      id: data.commentedBy.id ?? "01",
      name: data.commentedBy?.trainee_name ?? '',
      email: data.commentedBy?.trainee_email ?? '',
      profileImage:data.commentedBy?.profile_photo ?? ''

   },
   createdAt:data.createdAt
})



const transformQuery = (data: any): IQuery => ({
  id: data?.id,
  query: data?.query,
  title: data?.title,
  type: data?.type.toLowerCase(),
  session: { id:data?.session?.id , name: data?.session?.session_name },
  program: {id:data?.program?.id , name: data?.program?.program_name },
  createdAt: data?.query_date,
  replies:(data && data.replies ) ? data?.replies.map((reply:any) => transformReply(reply) ):[],
  raisedBy: {
    id: data?.raised_by?.id,
    name: data?.raised_by?.trainee_name,
    email: data?.raised_by?.trainee_email,
    profileImage: data?.profile_photo,
  },
  hasNewReplies: ( data.hasNewTrainerReply && data.hasNewTraineeReply )
});

export default transformQuery;
