import React from "react";
import IEvent from "@/models/Event";
import TodayEventCard from "./TodayEventCard";

interface GroupedEventListProps {
  events: IEvent[];
}

const GroupedEventList: React.FC<GroupedEventListProps> = ({ events }) => {
  // Group events by month and date
  const groupedEvents: { [monthYear: string]: { [date: string]: IEvent[] } } = {};
  events.forEach((event) => {
    
    const monthYear = `${new Date(event.date).toLocaleString("default", { month: "long" })} ${new Date(event.date).getFullYear()}`;
    const date = `${new Date(event.date).getDate()}-${new Date(event.date).toLocaleString("default", { month: "short" })}-${new Date(event.date).getFullYear()}`;
    if (!groupedEvents[monthYear]) {
      groupedEvents[monthYear] = {};
    }
    if (!groupedEvents[monthYear][date]) {
      groupedEvents[monthYear][date] = [];
    }
    groupedEvents[monthYear][date].push(event);
  });

  return (
    <div>
      {Object.keys(groupedEvents).map((monthYear) => (
        <div key={monthYear}>
          {/* <h2 className="text-2xl font-bold mt-6 mb-2">{monthYear}</h2> */}
          {Object.keys(groupedEvents[monthYear]).map((date) => (
            <div key={date}>
              <h1 className="text-sm font-semibold text-app-gray-medium mt-4 mb-1">{date}</h1>
              
                {groupedEvents[monthYear][date].map((event) => (
                <TodayEventCard key={event.id} event={event}/>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default GroupedEventList;
