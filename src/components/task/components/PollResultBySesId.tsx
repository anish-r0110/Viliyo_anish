import { useEffect, useState } from 'react';
import PollResult from '@/components/task/components/PollResult'; // Adjust the import path based on your project structure
import axiosInstance from "@/config/axios"; // Adjust the import path based on your project structure
import { clippingParents } from '@popperjs/core';
import { Console } from 'console';

function extractAllAnswerCount(data) {
  console.log("🚀 ~ extractAllAnswerCount ~ data:", data)
  
  const counts = {};

  data.forEach((entry) => {
    const answers = JSON.parse(entry.answers);

    answers.forEach(ans => {
      const question = ans.ans[0].question;

      ans.ans[0].answer.forEach((answer) => {
        const isAnswerTrue = answer.isAnswer;

        if (isAnswerTrue) {
          counts[question] = counts[question] || {};
          counts[question][answer.id] = (counts[question][answer.id] || 0) + 1;
        }
      });
    });
  });

  // Convert counts to a clean object without prototypes
  console.log('JSON.parse(JSON.stringify(counts)');
  return JSON.parse(JSON.stringify(counts));
}


function extractParticipantWiseDetails(data) {
  const participantDetails = {};

  data.forEach((entry) => {
    const traineeId = entry.trainee_id;
    const answers = JSON.parse(entry.answers);

    answers.forEach((ans) => {
      const question = ans.ans[0].question;

      ans.ans[0].answer.forEach((answer) => {
        const isAnswerTrue = answer.isAnswer;

        if (isAnswerTrue) {
          if (!participantDetails[traineeId]) {
            participantDetails[traineeId] = [];
          }

          participantDetails[traineeId].push({
            question: question,
            answerId: answer.id
          });
        }
      });
    });
  });

  return participantDetails;
}


function mapQuestions(traineeSubmittedTask, isAnswerCounts, participantDetails) {
  const answers = isAnswerCounts ? Object.values(isAnswerCounts)[0] : [];
  const questionText = Object.keys(isAnswerCounts)[0];
  console.log("questionText = ", questionText)
  

  if (!traineeSubmittedTask || !traineeSubmittedTask.answers) {
    return [];
  }

  const parsedAnswers = JSON.parse(traineeSubmittedTask.answers);

  console.log("parsedAnswers = ", parsedAnswers)

  if (!parsedAnswers || !parsedAnswers.length) {
    console.log("Coming here means (!parsedAnswers || !parsedAnswers.length) ")
    return [];
  }

  let id = 1;
  console.log("parsedAnswers[0].ans[0].id =", parsedAnswers[0].ans[0].id)
  console.log("parsedAnswers[0].ans[0].answer =", parsedAnswers[0].ans[0].answer)
  const questionId = question.id;
    console.log("questionId =", parsedAnswers[0].ans[0].id)
    
  return parsedAnswers[0].ans[0].answer.map((question) => {
    console.log("answers[questionId] = ",answers[questionId])

    let count;
    if (question.allowMultipleVoting) {
      count = answers[questionId];
      console.log("count is coming inside (question.allowMultipleVoting) : " , count);
    } else {
      const uniqueTrainees = new Set(participantDetails.map(entry => entry.trainee_id));
      count = uniqueTrainees.size;
      console.log("count is coming like this here :" , count)
    }

    return {
      question: question.question || '',
      id: id++ || '',
      answer: question.answer.map((answer) => {
        const answerId = answer.id;

        return {
          id: answerId,
          participantsName: answer.participantsName || '',        
          answerValue: answer.answerValue || '',
          isAnswer: answer.isAnswer || false,
          answerCount: count || 0,
        };
      }),
      allowMultipleVoting: question.allowMultipleVoting || false,    
      keepResponsesAnonymous: question.keepResponsesAnonymous || false
    };
  });
}




function mapParticipants(apiData) {
  if (!apiData || !apiData.participants) {
    return [];
  }

  return apiData.participants.map(participant => ({
    submittedPoll: participant.submittedPoll || false,
  }));
}

function usePollResultData(sessionSegmentId) {
  const [activityData, setActivityData] = useState({
    title: '',
    description: '',
    duration: '',
    duration_in_days: '',
    submission_date: '',
    status: '',
    questions: [],
    participants: [],
    submittedParticipants: 0,
    totalParticipants: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/programme/view_activity_status", {
          "sessionSegmentId": sessionSegmentId
        });
        console.log("🚀 ~ fetchData ~ response:", response)
  
        console.log('API Response:', response);
  
        const apiData = response?.data?.ActivityData?.[0] || {};
        console.log('API Data:', apiData);
  
        const submissionResponse = await axiosInstance.get("/trainer/get_trainee_submitted_task?session_segment_id=" + sessionSegmentId);
        console.log('Submission Response:', submissionResponse);
  
        const submissionApiData = submissionResponse?.data || [];
        console.log('Submission API Data:', submissionApiData);
  
        const totalParticipants = submissionApiData.length;
  
        const isAnswerCounts = extractAllAnswerCount(submissionApiData);
        console.log('Is Answer Counts:', isAnswerCounts);

        const participantDetails = extractParticipantWiseDetails(submissionApiData);
        console.log("participantDetails: ", participantDetails);
  
        const submittedParticipants = apiData.traineeSubmittedTask.submittedParticipants || 0;
        console.log("🚀 ~ fetchData ~ submittedParticipants:", submittedParticipants)
  
          console.log( "apiData.traineeSubmittedTask = ",apiData.traineeSubmittedTask)
          console.log("isAnswerCounts=  ", isAnswerCounts)

        setActivityData({
          title: apiData.activityTitle || '',
          description: '',
          duration: '',
          duration_in_days: '',
          submission_date: apiData.created_on || '',
          status: apiData.ongoing ? 'Live' : 'Closed',
          questions: mapQuestions(apiData.traineeSubmittedTask, isAnswerCounts, participantDetails),
          participants: mapParticipants(apiData),
          totalParticipants,
          submittedParticipants,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    fetchData();
  }, [sessionSegmentId]);
  

  return activityData;
}

const PollResultBySesId = ({ sessionSegmentId }) => {
  const activityData = usePollResultData(sessionSegmentId);

  return (
    <div>
      <PollResult activityData={activityData} />
    </div>
  );
};

export default PollResultBySesId;