import ITask, { IMedia, MediaType } from "@/models/Task";
import AudioScreen from "../screens/Audio";
import VideoScreen from "../screens/Video";
import DocumentScreen from "../screens/Document";
import MediaLink from "../screens/MediaLink";
import { useState } from "react";
import { useRouter } from "next/router";
import TaskService from "@/services/TaskService";
import Wizard from "./Wizard";

enum Step {
  Instruction,
  Media,
}

const SelfStudy = ({ task }: { task: ITask }) => {
  const [step, setStep] = useState<Step>(Step.Instruction);
  const router = useRouter();

  const handleDone = () => {
    if (Step.Instruction === step) {
      setStep(Step.Media);
    } else {
      const taskService = new TaskService();
      taskService.submit(task.id);
      router.back();
    }
  };

  return (
    <div>
      {Step.Instruction === step && <div>{task.description}</div>}

      {Step.Media === step && (
        <Wizard
          heading={"Media"}
          handleSubmit={handleDone}
          steps={task.selfStudy.medias.map((el: IMedia , index:number) => {
            if (el.type === MediaType.Document)
              return <DocumentScreen key={index} documentUrl={el.url}></DocumentScreen>;
            if (el.type === MediaType.Audio)
              return <AudioScreen key={index} audioSource={el.url}></AudioScreen>;
            if (el.type === MediaType.Video)
              return <VideoScreen key={index} videoSource={el.url}></VideoScreen>;
            if (el.type === MediaType.Link)
              return <MediaLink key={index} href={el.url}></MediaLink>;
          })}
        ></Wizard>
      )}

      <div className="mt-4 p-6">
        {Step.Instruction === step && (
          <button onClick={handleDone} className="btn-primary">
            Start Self Study
          </button>
        )}
      </div>
    </div>
  );
};

export default SelfStudy;