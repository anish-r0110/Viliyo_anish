import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

interface SaveDraftResult {
  success: boolean;
  message: string;
  // Add any additional information here
}

interface Question {
    question: string;
    answer: string;
  }
  
  interface Grade {
    grade: string;
  }
  
  interface Assignment {
    title: string;
    description: string;
    duration: string;
    submission_date: string;
    add_question: boolean;
    questions: Question[];
    submit_assignment_evalution: boolean;
    add_grade: Grade[];
    grade_type: string;
    share_feedback: boolean;
    participant_feedback: boolean;
    trainer_feedback: boolean;
    client_feedback: boolean;
    maximum_score: string;
    rating_stars: number;
    share_work: number;
    share_work_in_days: number;
    url: string;
    activity_submission_date: number;
  }
  
  interface AssignmentRequest {
    session_segment_id: string;
    answers: Assignment;
    status: number;
  }
  
  const assignmentRequest: AssignmentRequest = {
    session_segment_id: "2169",
    answers: {
      title: "Leading with Emotions",
      description: "Watch the video and analyze the interplay of emotions between the two characters. Answer the below questions keeping in mind the observations from the video. Respond openly as this will help us assess you better.",
      duration: "3",
      submission_date: "2023-09-14",
      add_question: true,
      questions: [
        { question: "Describe in brief what was shown in the video clip?", answer: "ssdsd" },
        { question: "What happened at the end and what was the main cause of it?", answer: "sdsds" },
        { question: "Write any other observations you have from the clip?", answer: "sdsdsd" }
      ],
      submit_assignment_evalution: false,
      add_grade: [{ grade: "" }],
      grade_type: "",
      share_feedback: false,
      participant_feedback: false,
      trainer_feedback: false,
      client_feedback: false,
      maximum_score: "",
      rating_stars: 2,
      share_work: 3,
      share_work_in_days: 3,
      url: "",
      activity_submission_date: 1
    },
    status: 0
  };
  
  console.log(assignmentRequest);

  
 const url = "https://vttapi.atwpl.com/api/v1/trainee/save_answer_draft"
  

interface SaveDraftHook {
  saveDraft: (dataToSave: any) => Promise<SaveDraftResult>;
  draftData: any;
}

const useSaveDraft = (): SaveDraftHook => {

  const router = useRouter();  
  const [draftData, setDraftData] = useState<any>(null);
  const [ unsavedChanges , setUnsavedChanges ] = useState<boolean>(true);

  useEffect(() => {

    const handleRouteChange = (url:string) => {

      if (unsavedChanges) {
        const leaveConfirmation = window.confirm('You have unsaved changes. Are you sure you want to leave?');
        if (!leaveConfirmation) {
          router.events.emit('routeChangeError'); // Cancel navigation
          throw 'routeChange aborted.';
        }
      }
    };


    router.events.on('routeChangeStart', handleRouteChange);

    // Cleanup the event listener when the component is unmounted
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [ unsavedChanges ]);

  const saveDraft = async (dataToSave: any): Promise<SaveDraftResult> => {
    try {
      // Simulate a delay (replace with actual data-saving logic)
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Update the state with the draft data
      setDraftData(dataToSave);

      // Return additional information about the save operation
      return {
        success: true,
        message: 'Draft saved successfully',
        // Additional information...
      };
    } catch (error) {
      // Handle errors if the save operation fails
      console.error('Error saving draft:', error);

      return {
        success: false,
        message: 'Failed to save draft',
      };
    }
  };

  return { saveDraft, draftData };
};

export default useSaveDraft;
