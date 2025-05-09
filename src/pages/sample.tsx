import { AppPage } from "@/layouts/types";
import React, { useEffect, useState } from 'react';
import PollResult from '@/components/task/components/PollResult';
import axiosInstance from "@/config/axios";

const SamplePage: AppPage = () => {
  const [activityData, setActivityData] = useState({
    title: '',
    description: '',
    duration: '',
    duration_in_days: '',
    submission_date: '',
    status: '',
    questions: [],
    participants: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/programme/view_activity_status", {
          "sessionSegmentId": 8763
        });
        console.log("🚀 ~ fetchData ~ response:", response)

        const apiData = response?.data?.ActivityData?.[0] || {};
        console.log("🚀 ~ fetchData ~ apiData:", apiData)

        setActivityData({
          title: apiData.activityTitle || '',
          description: '', // Add relevant field if available
          duration: '', // Add relevant field if available
          duration_in_days: '', // Add relevant field if available
          submission_date: apiData.created_on || '',
          status: apiData.ongoing ? 'Live' : 'Closed',
          questions: mapQuestions(apiData.traineeSubmittedTask),
          participants: mapParticipants(apiData),
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []); // Empty dependency array to run once on mount

  const mapQuestions = (traineeSubmittedTask) => {
    if (!traineeSubmittedTask || !traineeSubmittedTask.answers) {
      return [];
    }

    const answers = JSON.parse(traineeSubmittedTask.answers);
    if (!answers || !answers.length) {
      return [];
    }
    let id= 1;
    return answers[0].ans.map(question => ({
      question: question.question || '',
       id: id ++ || '',
      answer: question.answer.map(answer => ({
        id: answer.id || '',
        participantsName: answer.participantsName || '',
        answerValue: answer.answerValue || '',
        isAnswer: answer.isAnswer || false,
      })),
      allowMultipleVoting: question.allowMultipleVoting || false,
      keepResponsesAnonymous: question.keepResponsesAnonymous || false,
    }));
  };

  const mapParticipants = (apiData) => {
    if (!apiData || !apiData.participants) {
      return [];
    }

    return apiData.participants.map(participant => ({
      submittedPoll: participant.submittedPoll || false,
    }));
  };

  return (
    <div>
      <h1>{activityData.title || 'Sample Page'}</h1>
      <PollResult activityData={activityData} />
    </div>
  );
};

export default SamplePage;
SamplePage.Layout = "Admin";
