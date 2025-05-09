import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import history from "../../assets/images/coach-mark/coach-mark-history.png";

const UpcomingCoachMark = () => {
  return (
    <div>
      <h2 className=" font-bold text-xl text-center my-4">
      Easy access to all upcoming training programmes
      </h2>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} />{" "}
        <label>Compact view of live sessions scheduled for the day</label>
      </span>
      <span className="flex items-center w-full">
        <BsCheck size={15} />{" "}
        <label>Join live sessions </label>
      </span>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} />{" "}
        <label>Listing of all upcomming Programmes, month-wise</label>
      </span>
      <div className="p-6">
        <Image src={history} alt="Dashboard Coach Image" />
      </div>
    </div>
  );
};

export default UpcomingCoachMark;
