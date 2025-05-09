import IEvent from "@/models/Event";
import { FaRegClock } from "react-icons/fa";
import { FiMonitor } from "react-icons/fi";
import { MdOutlinePersonOutline } from "react-icons/md";
import { Button } from "../buttons";
import Popover from "../popover/Popover";
import { useRouter } from "next/router";

interface CalendarEventProps {
  event: any;
}

const CalendarEvent = ({ event }: CalendarEventProps) => {
  const router = useRouter();

  return (
    <Popover
      content={
        <div className="">
          <div className="flex">
            <FiMonitor className="mr-2" size={30} />
            <h4 className="flex  flex-col font-bold text-zinc-600">
              <span>{event.title}</span>
              <span className="block text-app-blue text-sm font-bold opacity-80">
                {event.programName}
              </span>
            </h4>
          </div>

          <div className="divide-y-2 divide-dotted divide-zinc-300">
            <div className="flex">
              <MdOutlinePersonOutline className="mr-2" size={30} />
              <span className="text-sm font-bold text-zinc-500 ">
                Trainer: {event.trainerName}
              </span>
            </div>

            <div className="flex ">
              <FaRegClock className="mr-2" size={20} />
              <span className="font-medium text-zinc-600">
                {event.startTime}-{event.endTime}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap text-app-blue font-bold text-2xl">
            <button className="btn-outline m-1 text-sm">View Details</button>
            <button
              onClick={() => router.push("/live-session")}
              className="btn-primary m-1 text-sm"
            >
              Join
            </button>
          </div>
        </div>
      }
    >
      <div className={`flex hover:bg-app-gray p-2 rounded-xl space-x-1`}>
        <span className="inline w-4 h-4 rounded-full bg-app-yellow"></span>
        <div>{event.title}</div>
      </div>
    </Popover>
  );
};

export default CalendarEvent;
