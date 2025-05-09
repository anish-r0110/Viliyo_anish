import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import calendar from "../../assets/images/coach-mark/coach-mark-calendar.png";

const CalendarCoachMark = () => {
  return (
    <div>
      <h2 className="font-bold text-xl text-center my-4">
        All your training programmes schedules in one place!
      </h2>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} />
        <label>View & access scheduled training programmes</label>
      </span>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} /> <label>Join live sessions instantly</label>
      </span>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} />{" "}
        <label>Easy to track date and time of live sessions</label>
      </span>
      <div className="p-6">
        <Image src={calendar} alt="Calendar Coach Image" />
      </div>
    </div>
  );
};

export default CalendarCoachMark;
