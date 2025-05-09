import React, { useState } from "react";
import EventList from "./EventList";
import IEvent from "@/models/Event";

interface Props {
  events: IEvent[];
}

type ScheduledType = "Past" | "Today" | "Upcoming" 

const FilteredCalendar = ({ events }:Props) => {
   
  const [ scheduledType , setScheduledType ] = useState<ScheduledType>("Today");
  const scheduledTypes: ScheduledType[] = ["Past", "Today", "Upcoming"];

  const filterEvents = (filterType:ScheduledType) => {
    const currentDate = new Date();
    const todayStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    const todayEnd = new Date(todayStart.getTime() + 24 * 60 * 60 * 1000); // End of today
  
  
    
    
    switch (filterType) {
      case "Past":
        return events.filter((event) => new Date( event.date) < todayStart);
      case "Today":
        return events.filter(
          (event) =>
            new Date( event.date).getDate() === currentDate.getDate() &&
            new Date( event.date).getMonth() === currentDate.getMonth() &&
            new Date( event.date).getFullYear() === currentDate.getFullYear()
        );
      case "Upcoming":
        return events.filter((event) => new Date( event.date) > todayEnd);
      default:
        return events;
    }
  };

  const filteredEvents = filterEvents(scheduledType);

  return (
    <div>
        <div className="w-full text-xl m-2 font-bold mb-3 text-app-gray-medium">
            Your Programmes
        </div>
        
        <div className="w-full">
            <div className="flex justify-between space-x-4 mb-4">
                { scheduledTypes.map((scheduledType) => (
                    <button
                        key={scheduledType}
                        className={`flex-1 border-2 font-semibold border-app-blue  rounded-full py-2 text-sm text-center ${
                            scheduledType === scheduledType
                                ? "bg-app-blue text-white"
                                : "bg-white text-app-blue"
                        }`}
                        onClick={() => setScheduledType(scheduledType)}
                    >
                        {scheduledType}
                    </button>
                ))}
            </div>
        </div>
        <hr className="mb-4 border-app-blue border-[1px] w-full" />
        { !filterEvents.length && <div className="p-2 text-black w-full">There are no { scheduledType } events. </div> }
        { filterEvents.length > 0  && <EventList events={filteredEvents} />}
    </div>
);


};

export default FilteredCalendar;