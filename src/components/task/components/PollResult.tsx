import React, { useEffect, useState } from 'react';

interface Answer {
  id: string;
  participantsName: string;
  answerValue: string;
  isAnswer: boolean;
  answerCount: number; 
}

interface Question {
  question: string;
  id: string;
  answer: Answer[];
  allowMultipleVoting: boolean;
  keepResponsesAnonymous: boolean;
}

interface Participant {
  submittedPoll: boolean;
}

interface ActivityData {
  title: string;
  description: string;
  duration: string;
  duration_in_days: string;
  submission_date: string;
  questions: Question[];
  participants: Participant[];
  status : string;
  submittedParticipants: number,
  totalParticipants: number,
  keepResponsesAnonymous: boolean,
  allowMultipleVoting: boolean,
}

interface PollResultProps {
  activityData:ActivityData;
}

const PollResult: React.FC<PollResultProps> = ({ activityData }) => {
  console.log("🚀 ~ activityData:", activityData)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const handleQuestionClick = (question: Question) => {
    setSelectedQuestion(question);
  };

  const calculateSubmissionInfo = (question: Question | null) => {
    if (question && activityData && activityData) {
      const totalParticipants = activityData.participants.length;
      const submittedParticipants = activityData.participants.filter(
        (participant) => participant.submittedPoll
      ).length;

      const percentage = (submittedParticipants / totalParticipants) * 100;
      return(
        <>
        <div className='flex flex-row'>
          <div className='flex items-start self-start'>
          {submittedParticipants}/{totalParticipants} Responses
          </div>
          <div className='flex items-end self-end'>
            {percentage.toFixed(0)+"%"}
          </div>
        </div>
        </>
      )
    }

    return '';
  };

    console.log("🚀 ~ file: PollResult.tsx:74 ~ activityData:", activityData)

  return (
    <div className="">
      <div className="rounded-xl flex items-center justify-between">

      <div className={`w-1/4 mobile:w-1/4 laptop:w-1/5 text-white ${activityData.status === "Live" ? 'bg-green-600' : activityData.status === "Closed" ? 'bg-red-600' : ''} rounded-tl-xl text-center font-bold p-2`}>
        {activityData.status}
      </div>
        <div className="w-3/4 mobile:w-3/4 laptop:w-4/5 bg-app-yellow rounded-tr-xl text-start font-bold p-2 px-8 text-app-gray-medium">
          {activityData.title}
          {/* {activityData[0].activityTitle} */}
        </div>
      </div>
      <div className="flex flex-row mobile:flex-col p-4 mt-2">
        <div className="mr-10 mobile:w-full w-1/3">
          {activityData?.questions?.map((q) => (
            <button
              key={q.id}
              className={` text-app-blue rounded-lg p-2 mb-2 w-full font-bold ${
                selectedQuestion === q ? 'bg-[#E9E0FA] text-app-blue' : 'bg-[#D4D6DB] text-app-gray-medium'
              }`}
              onClick={() => handleQuestionClick(q)}
            >
              {`Question ${q.id}`}
            </button>
          ))}
        </div>
        <div className="w-full">
          {selectedQuestion && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold mb-2 text-app-gray-medium">{selectedQuestion.question}</h3>
              <div className="flex flex-row justify-start gap-4 items-start text-app-blue font-bold">
                <div className="flex">{activityData.keepResponsesAnonymous && "Anonymous Responses" || ""}</div> 
                <div className="flex">{activityData.allowMultipleVoting && "Multi-choice Responses" || "" }</div>

              </div>
              
              <div className='flex flex-col'>
                {selectedQuestion.answer.map((a) => (
                  <div key={a.id} className="flex flex-row justify-evenly items-baseline shadow-2xl p-6 gap-2 mb-2 w-full rounded-3xl bg-white">
                    <div className="flex flex-1 font-semibold text-app-gray-medium">{a.answerValue}</div>
                    <div className="flex flex-1  text-xs text-start font-light">{a.answerCount} / {activityData.totalParticipants} Responses</div>
                    <div className="flex text-end mr-1 text-2xl font-bold text-app-gray-medium"> {((a.answerCount ?? 0) / activityData.totalParticipants * 100).toFixed(0)} %</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
export default PollResult;