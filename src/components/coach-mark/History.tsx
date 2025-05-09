import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import history from "../../assets/images/coach-mark/coach-mark-history.png";

const HistoryCoachMark = () => {
  return (
    <div>
      <h2 className="font-bold text-xl text-center my-4">
        History of your performance and past programme details
      </h2>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} />{" "}
        <label>View & access completed training programmes</label>
      </span>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} />{" "}
        <label>Know your engagement and rating in live sessions </label>
      </span>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} />{" "}
        <label>Revisit assignment, reports and training materials </label>
      </span>
      <div className="p-6">
        <Image src={history} alt="Dashboard Coach Image" />
      </div>
    </div>
  );
};

export default HistoryCoachMark;
