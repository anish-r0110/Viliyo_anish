import ITask, {
  AssignmentQuestion,
  FeedbackQuestion,
  FeedbackType,
  IMedia,
  IOpenEndedQuestion,
  IPoll,
  IPollOption,
  MediaType,
  SelfStudy,
  TaskType,
} from "@/models/Task";

const getTaskType = (input: string): TaskType => {
  switch (input.toLowerCase()) {
    case "self study":
      return TaskType.SelfStudy;
    case "assessment":
      return TaskType.Assessment;
    case "survey":
      return TaskType.Survey;
    case "assignment":
      return TaskType.Assignment;
    case "audio":
      return TaskType.SelfStudy;
    case "video":
      return TaskType.SelfStudy;
    case "document":
      return TaskType.SelfStudy;
    case "session feedback":
      return TaskType.SessionFeedback;
    case "poll":
      return TaskType.Poll;
    case "programme expectations":
      return TaskType.ProgramExpectaion;
    case "complete your profile":
      return TaskType.Profile;
    default:
      return TaskType.Other;
  }
};

export default function transformToTask(data: any): ITask {
  let activity =
    data && data.activity_data ? JSON.parse(data.activity_data) : {};

  // console.log( activity );

  const task: ITask = {
    id: data.id || Math.random(),
    description: data.description
      ? data.description
      : activity && activity.description
      ? activity.description
      : "",
    type: getTaskType(data.title.toLowerCase()),
    category: (data.type)?data.type.toLowerCase():'',
    duration: activity && activity.duration ? parseInt(activity.duration) : 0,
    assessmentType: activity && activity.assessmentCreate,
    questionTypes: [],
    dueDate: data.submission_date ??  data.activity_submission_date ??  new Date().toISOString(),
    session: {
      id: data.sessionId,
      name: data.session_name || "Not Applicable",
    },
    title: activity && activity.title ? activity.title : "",
    isPending:
      data && data.session_plan_status
        ? data.session_plan_status.toLowerCase() === "pending"
          ? true
          : false
        : data.is_pending,
    isRead: Boolean(data.read_status),
    redo: data && data.redo
  };

  if (task.type === TaskType.SelfStudy) {
    if (data && data.media_attachment && data.media_attachment.length > 0) {
      let medias = JSON.parse(data.media_attachment);

      let selfStudy: SelfStudy = {
        medias: medias.map((el: any) => ({
          type: el.type.toLowerCase(),
          url: el.url,
        })),
      };

      if (activity && activity.url) {
        let newMedia = { type: MediaType.Link, url: activity.url };
        selfStudy.medias.push(newMedia);
      }

      task.selfStudy = selfStudy;
    }
  }

  if (task.type === TaskType.Poll) {
    
    let polls: IPoll[] = [];
    console.log('Line no 101', polls );
    let questions: any[] =
      activity && activity.question ? JSON.parse(activity.question):[];

     

      questions.forEach((element: any) => {
      let poll: IPoll = {
        id: element.id,
        question: element.question,
        isMultipleChoice: element.allowMultipleVoting,
        keepResponsesAnonymous:element.keepResponsesAnonymous,
        options: element.answer?.map(
          (el: any): IPollOption => ({
            id: el.id,
            option: el.answerValue,
            isSelected: false,
          })
        ),
      };
      polls.push(poll);
    });


    task.polls = polls
   
  }

  if (task.type === TaskType.Assignment) {
    let medias: IMedia[] = [];

    if (data && data.media_attachment && data.media_attachment.length > 0) {
      let parseMedias = JSON.parse(data.media_attachment);
      medias = parseMedias.map((el: any) => ({
        type: el.type.toLowerCase(),
        url: el.url,
      }));

      if (activity && activity.url) {
        let newMedia = { type: MediaType.Link, url: activity.url };
        medias.push(newMedia);
      }
    }

    let questions = JSON.parse(activity.questions);
    questions = questions.map(
      (el: any): AssignmentQuestion => ({ question: el.question , answer:'' })
    );
    task.assignment = {
      medias,
      questions,
    };
  }

  if (task.type === TaskType.Assessment) {
    let questions: any[] = activity;

    task.assessment = { questions };
    // console.log("qus", questions);

    // console.log("assessmentqus: ", activity.assessmentDetails.questionDetails);
  }
    


    if( task.type === TaskType.Assignment ){
       let medias : IMedia[] = [];

            if( data && data.media_attachment && data.media_attachment.length > 0 ) {
              let parseMedias = JSON.parse( data.media_attachment );
              medias = parseMedias.map( (el:any) => ({ type:el.type.toLowerCase() , url:el.url }) )
            

            if( activity && activity.url ){
              let newMedia = { type: MediaType.Link  , url : activity.url };
              medias.push( newMedia );
            }
       }
       
       let questions = JSON.parse( activity.questions);
        questions = questions.map( (el:any):IOpenEndedQuestion => ({ question:el.question  }))
        task.assignment = {
          medias,
          questions
        }

    }

    if( task.type  === TaskType.Assessment ){

    }
  

  if (task.type === TaskType.ProgramExpectaion) {
    let questions: any[] =
      activity && activity.question ? JSON.parse(activity.question) : [];

    task.programExpectation = { questions };
    task.activityData = { activity };
  }


  if( task.type  === TaskType.SessionFeedback ){
       let activity = JSON.parse(data.activity_data) ;
       let elements = activity.question;
       let questions:FeedbackQuestion[] = [];

       

       elements.forEach((el:any) => {
          let feedbackQuestion:FeedbackQuestion =  {
             id: el.answerId,
             question:el.value,
             type: el.type,
             answer:undefined
          }
          questions.push( feedbackQuestion );
       })

       task.sessionFeedback = {
        questions:questions
       }

  }

  if (task.type === TaskType.Survey) {
      let questions: any[] = activity && activity.question ? JSON.parse(activity.question) : [];
      task.survey = {
        questions,
      };
  }

  return task;
}