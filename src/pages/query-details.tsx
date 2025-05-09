import { BackNavigation } from "@/components/shared";
import axiosInstance from "@/config/axios";
import IQuery, { IComment, IReply } from "@/interfaces/Query";
import { AppPage } from "@/layouts/types";
import { AppDispatch, RootState } from "@/store";
import { fetchQueryById, postComment, resetSelectQuery } from "@/store/reducers/queries";
import formatDateString from "@/utils/formatDateString";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, Dialog, Flex, Inset, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { BiMessageDetail } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";


export interface IList {
  id: string;
  image: any;
  qus: string;
  session?: string;
  programme?: string;
  trainerName: string;
  date: string;
}


const QueryDetails: AppPage = () => {

  const auth  = useSelector((state:RootState) => state.auth );
  const { selectedQuery }  = useSelector((state:RootState) => state.queries );
  const dispatch = useDispatch<AppDispatch>()
  const router = useRouter();
  const { query: queryId } = router.query;


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });


  useEffect(() => {
    if( queryId )
       dispatch(fetchQueryById(queryId as string))

   return () => { dispatch(resetSelectQuery()) }

  }, [queryId]);


  const onSubmit = async (data: FieldValues) => {
    const result:any = await axiosInstance.post(
      "/trainee/reply_on_others_queries",
      {
        query: selectedQuery,
        reply: data.reply,
        reply_by: auth.user?.id,
        replier_Icon: selectedQuery?.raisedBy.profileImage,
      }
    );

    if( auth.user && selectedQuery )
        dispatch(postComment({ queryId: selectedQuery?.id.toString(), reply:data.reply , replyBy:auth.user?.id , replierIcon:auth.user?.profileImage ?? ''}))
 
    reset();
 
  };

  return (
    <div className="flex flex-col  py-2 w-full">
      <div className="px-[2%]">
        <BackNavigation title={"Queries"} />
      </div>

      <div className="flex flex-row gap-[2%] ">
        {selectedQuery && (
          <div className={`flex flex-col w-full mx-[5%] rounded-2xl shadow-lg`}>
            {selectedQuery ? (
              <div>
                <QueryDescription query={selectedQuery} />
              </div>
            ) : (
              <span> Please Select a query</span>
            )}
         

            <div className="my-2">
              <p className="text-app-blue font-medium">Replies ({selectedQuery.replies.length}) </p>
              <hr className="bg-app-blue h-0.5"></hr>
            </div>
           

              {
                 selectedQuery.replies.map( reply => <div className="mx-5"  key={reply.id}>
                 
                 <Reply reply={reply}>
                 </Reply> 
                   { ((selectedQuery.type === 'public') && auth.user?.id != selectedQuery.raisedBy.id ) &&<div>
                        <CommentUI onComment={() => { 
                          
                        }} replyId={reply.id} auth={auth} comments={reply.comments}></CommentUI>
                    </div>}
                   {( auth.user?.id === selectedQuery.raisedBy.id &&  reply.isTrainerResponse) && <div>
                    <Dialog.Root>
            <Dialog.Trigger>
            <button className="text-app-blue underline">Reply</button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Inset>
              <Flex>
                <div className="bg-app-yellow w-full rounded-t-lg p-2 flex justify-between text-black font-medium">
                     <p>Reply To Trainer</p>
                    <Dialog.Close>
                      <Flex>
                        <button className="text-2xl">x</button>
                      </Flex>
                    </Dialog.Close>
                </div>
              </Flex>
              <div className="p-5">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full py-2">
                  <textarea
                    {...register("reply")}
                    // type="text"
                    className="w-full h-32 border-2"
                    placeholder="Type here..."
                    id="reply"
                  />
                </div>
                {errors.reply && (
                  <p className="text-red-500 py-2 ">{errors.reply.message}</p>
                )}
                <Dialog.Close>

                <button className="px-4 py-2 bg-app-blue rounded-3xl text-white ">
                  Reply
                </button>
                </Dialog.Close>
              </form>

              </div>
             
              </Inset>
            </Dialog.Content>
          </Dialog.Root>
                     
                    </div> }
                 </div>
                 )
              }
          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default QueryDetails;
QueryDetails.Layout = "Admin";






























const QueryDescription = ({ query }: { query: IQuery }) => {

  return (
    <div className="bg-white rounded-xl ">
      <div className="grid grid-cols-6 tablet:flex-row h-fit w-full bg-white rounded-2xl  py-[1%] ">
        <div
          className="flex justify-start items-center space-x-2 mx-4
      mobile:min-w-[10%] col-span-2"
        >
          <Avatar
            src={query.raisedBy.profileImage}
            size="5"
            fallback={query.raisedBy.firstName ? query.raisedBy.firstName?.charAt(0) : "?"}
          ></Avatar>
          <div className="text-xs text-black">
            <p className="font-medium">{query?.raisedBy.name}</p>
            <p className="italic opacity-75">
              {formatDateString(new Date(query?.createdAt))}
            </p>
          </div>
        </div>

        <div className="w-full gap-[1%] px-[2%] text-base col-span-4  border-l-2">
          <div className=" w-full">
            <div
              className="
           text-app-blue mobile:text-sm font-bold"
            >
              {query?.title}
            </div>
            <div className="gap-[15%] py-2  mobile:text-xs">
              <div className="flex space-x-2 ">
                <Text className=" text-zinc-600">Session:</Text>
                <p className="text-zinc-600 font-bold">{query?.session.name}</p>
              </div>
              <div className="flex space-x-2">
                <Text className=" text-zinc-600">Programme:</Text>
                <p className="text-zinc-600 font-bold">{query?.program.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="m-4 rounded-xl italic text-zinc-600 flex justify-center mobile:text-sm">
        {query?.query}
      </div>
    </div>
  );
};

const Reply = ({
  reply,
}: {
  reply: IReply;
}) => { 
  return (
    <div className="flex  mx-auto rounded-lg ">
      <div className={`grid grid-cols-4 w-full h-fit p-2  rounded-2xl shadow-xl ${reply.isTrainerResponse ? 'bg-[#FFFBEF]':'bg-white'}`}>
        <div className="col-span-3 border-r-2 ">
          <p className="mobile:text-xs break-all p-4">
            {reply.message}
          </p>
        </div>
        <div className="flex mobile:text-xs space-x-4 px-2">
          <div className="py-2">
            <Avatar
              src={reply.avatar}
              fallback={
                reply?.name
                  ? reply?.name.charAt(0)
                  : "?"
              }
              size="5"
            ></Avatar>
          </div>
          <div className="py-2">
            <p>{reply?.name}</p>
            <div className="italic text-zinc-600">
              {formatDateString(new Date(reply.createdAt))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const schema = z.object({
  reply: z.string().nonempty({ message: "Please enter your comment" }),
});

type FormData = z.infer<typeof schema>;

const PostComment = ({
  query,
  reply_by,
  replier_icon,
  queryRaisedById,
  getQueryDetails,
}: {
  query: number;
  reply_by: number;
  replier_icon: string;
  queryRaisedById?: number;
  getQueryDetails: () => void;
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsErrorAlert(false);
  };

  const onSubmit = async (data: FieldValues) => {
    const result:any = await axiosInstance.post(
      "/trainee/reply_on_others_queries",
      {
        query: query,
        reply: data.reply,
        reply_by: reply_by,
        replier_Icon: replier_icon,
      }
    );

    reset();

    if (result.code === 200) {
      getQueryDetails();
      toast.success('Your comment was added successfully');
    } else {
      toast.error('Error while adding a comment , please try again.')
    }
  };

  return (
    <div className=" px-2 py-[1%] mx-auto">
      <div>
        <div className="flex justify-end mx-4">
          <Dialog.Root>
            <Dialog.Trigger>
              {queryRaisedById === reply_by ? (
                <button className="border border-app-blue px-4 py-2 rounded-full font-bold text-app-blue">
                  Reply
                </button>
              ) : (
                <button className="flex space-x-2 border-2 border-app-blue px-4 py-2 rounded-3xl text-app-blue">
                  <BiMessageDetail />
                  <span>Add Comment</span>
                </button>
              )}
            </Dialog.Trigger>
            <Dialog.Content>
              <Flex>
                <div className="bg-app-yellow w-full rounded-t-lg p-4 flex justify-between text-black font-medium">
                  <>
                    <p className="text-xl">
                      {queryRaisedById === reply_by
                        ? "Reply to Trainer"
                        : "Add Comment"}
                    </p>
                    <Dialog.Close>
                      <Flex>
                        <button className="text-2xl">x</button>
                      </Flex>
                    </Dialog.Close>
                  </>
                </div>
              </Flex>
              {/* onSubmit={handleSubmit(onSubmit)} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full py-2">
                  <textarea
                    {...register("reply")}
                    // type="text"
                    className="w-full h-32 border-2"
                    placeholder="Type here..."
                    id="reply"
                  />
                </div>
                {errors.reply && (
                  <p className="text-red-500 py-2 ">{errors.reply.message}</p>
                )}

                <button className="px-4 py-2 bg-app-blue rounded-3xl text-white ">
                  {queryRaisedById === reply_by ? "Reply" : "Add Comment"}
                </button>
              </form>
            </Dialog.Content>
          </Dialog.Root>
        </div>
        {/* <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex px-4 py-2 mobile:text-sm">
            <input
              {...register("reply")}
              type="text"
              className="w-full"
              placeholder="Add comment"
              id="reply"
            />

            <button className="text-app-blue text-2xl mobile:text-base mobile:py-1">
              <BiMessageDetail />
            </button>
          </div>
        </form> */}
      </div>
    </div>
  );
};

const CommentUI = ({ comments , replyId , auth , onComment }: { comments: IComment[] , replyId:number , auth:any , onComment: () => void }) => {
  
  const [isOpen , setOpen ] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
      // axiosInstance.post('')
  },[])

  
  const onSubmit = async (data: FieldValues) => {
    const result:any = await axiosInstance.post(
      "trainer/comment_on_reply",
      {
        comment: data.reply,
        replyId: replyId,
        commentedBy: auth.id,
        commenterIcon: auth.profileImage
      }
    );

    reset();

    if (result.code === 200) {
      onComment()
      toast.success('Your comment was added successfully');
    } else {
      toast.error('Error while adding a comment , please try again.')
    }
  };
 
  return (
    <div className="bg-white relative -top-2   rounded-b-lg">
      <div  className="flex mb-4 px-5 py-2 text-app-blue bg-white justify-between rounded-b-lg">
          <div>
              <span >Comments ({comments.length})</span>
               { !isOpen && <button className="ml-5 underline font-bold" onClick={() => setOpen(true)}>View</button> }
          </div>

           { isOpen && <button className="font-semibold" onClick={() => setOpen(  value => !value)}>
             Close
           </button> }

           { !isOpen && 
           <Dialog.Root>
            <Dialog.Trigger>
                <button className="flex items-center space-x-2 underline px-4 py-2 rounded-3xl text-app-blue">
                  <BiMessageDetail size="25" />
                  <span>Add Comment</span>
                </button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Flex>
                    <p className="text-xl">
                      Add Comment
                    </p>
                    <Dialog.Close>
                      <Flex>
                        <button className="text-2xl">x</button>
                      </Flex>
                    </Dialog.Close>
              </Flex>
              {/* onSubmit={handleSubmit(onSubmit)} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full py-2">
                  <textarea
                    {...register("reply")}
                    // type="text"
                    className="w-full h-32 border-2"
                    placeholder="Type here..."
                    id="reply"
                  />
                </div>
                {errors.reply && (
                  <p className="text-red-500 py-2 ">{errors.reply.message}</p>
                )}
                  <Dialog.Close>
                    <button type="submit" className="px-4 py-2 bg-app-blue rounded-3xl text-white ">
                        Add Comment
                    </button>
                  </Dialog.Close>
                
              </form>
            </Dialog.Content>
              </Dialog.Root>
           }
      </div>
      { isOpen &&  <hr className="bg-app-blue"/>}
     
        { isOpen &&  <div className=" bg-white  px-5  py-[1%] border-[1px]  rounded-md  ">

            { comments.map( comment =>  <div className="flex justify-between my-2 px-3" key={comment.id}>
              <div className="bg-[#F1F3FF] w-3/4 p-2">
              { comment.message} 
              </div>
                <div className="flex flex-col justify-start w-1/4 px-1">
                    <span>{comment.auth.name}</span>
                    <span>{ new Date(comment.createdAt).toDateString()}</span>
                </div>
              </div> )}
          
           
        
              <Dialog.Root>
            <Dialog.Trigger>
                <button className="flex items-center space-x-2 underline px-4 py-2 rounded-3xl text-app-blue">
                  <BiMessageDetail size="25" />
                  <span>Add Comment</span>
                </button>
            </Dialog.Trigger>
            <Dialog.Content>
              <Flex>
                    <p className="text-xl">
                      Add Comment
                    </p>
                    <Dialog.Close>
                      <Flex>
                        <button className="text-2xl">x</button>
                      </Flex>
                    </Dialog.Close>
              </Flex>
              {/* onSubmit={handleSubmit(onSubmit)} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="w-full py-2">
                  <textarea
                    {...register("reply")}
                    // type="text"
                    className="w-full h-32 border-2"
                    placeholder="Type here..."
                    id="reply"
                  />
                </div>
                {errors.reply && (
                  <p className="text-red-500 py-2 ">{errors.reply.message}</p>
                )}
                <Dialog.Close>
                    <button type="submit" className="px-4 py-2 bg-app-blue rounded-3xl text-white ">
                        Add Comment
                    </button>
                  </Dialog.Close>
              </form>
            </Dialog.Content>
              </Dialog.Root>
      </div> }
    </div>
  );
};