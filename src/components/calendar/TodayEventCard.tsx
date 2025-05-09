// Import necessary modules and interfaces
import { Text } from "@radix-ui/themes";
import Link from "next/link";
import IEvent from "@/models/Event";

// Define the interface for the event card props
interface IEventCardProps {
  event: IEvent;
  height?: number;
}

// Define the TodayEventCard component
const TodayEventCard = ({ event, height = 18 }: IEventCardProps) => {
  // Determine if the event is past, cancelled, or scheduled
  const isPast = event.status.toLowerCase() === "conducted";
  const isCancelled = event.status.toLowerCase() === "cancelled";
  const isScheduled = event.status.toLowerCase() === "scheduled" && !isPast && !isCancelled;

  // Get today's date
  const today = new Date();
  const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

  // Compare event date with today's date
  const isEventToday = new Date(event.date).toDateString() === todayDate.toDateString();

  return (
    <div
      className={`grid grid-cols-10 space-x-2 w-full shadow-md rounded-r-2xl h-${height} border-l-4 text-sm text-white font-medium
           bg-gradient-to-br from-app-blue from-40% to-app-purple border-app-gray flex flex-col mb-2
        `}
    >
      <div className="col-span-7 px-1 py-1">
        <span>{event.title}</span>
        <Text as="p" className="text-white text-xs font-light">
          {String(new Date(event.startTime).getHours()).padStart(2, "0") +
            ":" +
            String(new Date(event.startTime).getMinutes()).padStart(2, "0")}
          -{" "}
          {String(new Date(event.endTime).getHours()).padStart(2, "0") +
            ":" +
            String(new Date(event.endTime).getMinutes()).padStart(2, "0")}
        </Text>
        <Text as="p" className="text-white text-xs font-light">
          {event.programName}
        </Text>
      </div>
      {isEventToday && (
        <Link
          className={`col-span-3 bg-[#ad74be] h-${height} rounded-r-2xl text-center text-lg py-6 text-white font-bold`}
          href={"/configuration?sessionId="+ event.room?.sessionMapId}
        >
          <span>Join</span>
        </Link>
      )}

{!isScheduled && !isEventToday && (
        <Link
          className={`col-span-3 bg-[#ad74be] h-${height} rounded-r-2xl text-center text-lg py-6 text-white font-bold`}
          href={"/program-detail/"+event.program.id}
        >
          <span className="text-sm">View</span>
        </Link>
      )}

{isScheduled && !isEventToday && (
        <Link
          className={`col-span-3 bg-[#ad74be] h-${height} rounded-r-2xl text-center text-lg py-6 text-white font-bold`}
          href={"/program-detail/"+event.program.id}
        >
          <span className="text-sm">View</span>
        </Link>
      )}
       
    </div>
  );
};

export default TodayEventCard;
