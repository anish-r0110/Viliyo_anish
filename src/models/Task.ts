import Task from "@/components/session/Task";
import AudioScreen from "@/components/task/screens/Audio";
import { Component } from "react";

export type QuestionType =
  | "wieghtscale"
  | "dropdown"
  | "rankorder"
  | "iconrating"
  | "mcq"
  | "scq"
  | "openended"
  | "slider"
  | "audio"
  | "video"
  | "document"
  | "other";

export enum TaskType {
  Assignment = "Assignment",
  Profile = "Profile",
  SelfStudy = "Self Study",
  Assessment = "Assessment",
  Survey = "Survey",
  Poll = "Poll",
  ProgramExpectaion = "Expectations Form",
  SessionFeedback = "Session Feedback",
  Other = "Other",
}

export interface IOpenEndedQuestion {
  id?: string;
  question: string;
  answer?: string;
}

export interface IProgramExpectationActivityData {
  activity_submission_date: number;
  description: string;
  duration: string;
  question: string[];
  share_work: number;
  share_work_in_days: string;
  submission_date: string;
  title: string;
}

export interface IAssignment {
  medias?: IMedia[];
  questions: AssignmentQuestion[];
}

export interface IProgramExpectations {
  questions: IOpenEndedQuestion[];
  activityData: IProgramExpectationActivityData;
}

export type TaskCategory = "pre" | "post" | "other";

export enum FeedbackType {
  Agreement = 1,
  Frequency = 2,
  Quality = 3,
  Likelihood = 4,
  ClosedEnded = 5,
  OpenEnded = 6,
  Star = 7,
  EmotionIcon = 8,
}
export interface FeedbackQuestion {
  id:string ,
  question:string,
  type:FeedbackType,
  answer : string | undefined,
}

export interface AssignmentQuestion {
    question: string;
    answer: string;
}

export type AssessmentCategory = "Test" | "Quiz" | "GeneralAssessment";

export interface IMedia {
  type: MediaType;
  url: string;
}

export interface SelfStudy {
  medias: IMedia[];
}

export enum MediaType {
  Video = "video",
  Audio = "audio",
  Link = "link",
  Document = "document",
}

export interface IPollOption {
  id: string;
  option: string;
  isSelected: boolean;
}

export interface IPoll {
  id: string;
  question: string;
  isMultipleChoice: boolean;
  options: IPollOption[];
  keepResponsesAnonymous:boolean
}

interface Task {
  id: number;
  title: string;
  description: string;
  category: TaskCategory;
  type: TaskType;
  assessmentType?: AssessmentCategory;
  questionTypes: QuestionType[];
  isPending: boolean;
  isRead: boolean;
  session?: { id: number; name: string };
  program?: { id: number; name: string };
  dueDate?: string;
  duration?: number | null;
  maximumReattemptsAllowed?: number;
  redo?: boolean;
}

type DynamicItemtype = {
  [item: string]: any;
};

type ITask = Task & Partial<DynamicItemtype>;

export default ITask;
