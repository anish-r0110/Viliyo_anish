import Image from "next/image";
import { BsCheck } from "react-icons/bs";
import dashboard from "../../assets/images/coach-mark/coach-mark-dashboard.png";

const DashboardCoachMark = () => {
  return (
    <div>
      <h2 className="font-bold text-xl text-center my-4">
        A snapshot of your training programmes!
      </h2>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} /> <label>Overview of all programee details</label>
      </span>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} /> <label>One Click access to pending tasks</label>
      </span>
      <span className="flex items-center justify-between w-full">
        <BsCheck size={20} /> <label>One Click access to pending tasks</label>
      </span>
      <div className="p-6">
        <Image src={dashboard} alt="Dashboard Coach Image" />
      </div>
    </div>
  );
};

export default DashboardCoachMark;
