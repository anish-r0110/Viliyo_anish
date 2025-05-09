import React, { useState } from "react";
import { FiMonitor } from "react-icons/fi";
import Popover from "@/components/popover/Popover";
import IEvent from "@/models/Event";

import { format, addDays } from "date-fns";
import event from "@/store/reducers/event";

interface WeekDetail {
  date: Date;
  day: string;
}

function generateWeekDaysArray(date: Date): WeekDetail[] {
  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const result: WeekDetail[] = [];

  for (let i = 0; i < 7; i++) {
    const day = addDays(date, i);

    // Format the day in the desired format (e.g., "3rd SUN")
    const element: WeekDetail = {
      date: new Date(day),
      day: weekdays[day.getDay()],
    };

    result[i] = element;
  }

  return result;
}

interface WeekViewProps {
  events: IEvent[];
  currentDate: Date;
}

const WeekCalendarEvent = ({ event }: { event: IEvent }) => {
  return <div>Event Details</div>;
};

const WeekView = ({ events, currentDate }: WeekViewProps) => {
  const numberofDiv = 8;
  const timeSlots = [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
  ];
  const eachWidthOfDiv = 1440 / numberofDiv;
  const EACH_MIN_IN_PX = 1;
  const TOTAL_HR_IN_DAY = 24;
  const HOUR_IN_MIN = 60;
  const eachHeightOfDiv =
    HOUR_IN_MIN * TOTAL_HR_IN_DAY * EACH_MIN_IN_PX + HOUR_IN_MIN;
  const weekdays = generateWeekDaysArray(currentDate);

  return (
    <div className="flex">
      <div className="relative flex flex-col w-full border p-1">
        <div className="flex">
          <div style={{ width: eachWidthOfDiv, height: 60 }}>
            <div>
              <div style={{ height: HOUR_IN_MIN }}></div>
              {timeSlots.map((el) => (
                <div style={{ height: HOUR_IN_MIN }}>{el}</div>
              ))}
            </div>
          </div>
          {weekdays.map((week) => {
            let filterEvents = events.filter(
              (event) => event.date.getDate() === week.date.getDate()
            );
            console.log(filterEvents);

            return (
              <div
                className="p-2 border"
                style={{ width: eachWidthOfDiv, height: eachHeightOfDiv }}
              >
                <div className="flex flex-col">
                  <span>{week.date.getDate()}</span>
                  <span>{week.day}</span>
                </div>
                <div className="flex w-full relative">
                  {filterEvents.map((event) => (
                    <div
                      className="border relative shrink rounded-xl p-1 bg-app-yellow  "
                      // style={{
                      //   height: (event.endTime - el.startTime) * 60,
                      //   top: el.startTime * 60,
                      // }}
                    >
                      {event.title}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// const WeekView: React.FC<WeekViewProps> = ({ events, currentDate }) => {
//   const weekdays = generateWeekDaysArray(currentDate);

//   const currentDay = currentDate.toString().toLocaleUpperCase().split(" ");
//   const todayName = currentDay[0];

//   const [currentTime] = useState(new Date());

//   const renderDayHeader = () => {
//     return weekdays.map((element) => (
//       <>
//         <th key={element.day}>
//           <div
//             className={`${
//               currentDate.getDate() === element.date.getDate()
//                 ? "bg-amber-100 rounded-full py-2 flex space-x-2 opacity-80 justify-center"
//                 : null
//             }`}
//           >
//             {element.day}
//           </div>
//         </th>
//       </>
//     ));
//   };

//   const renderTimeSlots = () => {
//     const timeSlots = [];
//     for (let hour = 0; hour < 24; hour++) {
//       const time = `${hour.toString().padStart(2, "0")}:00`;
//       timeSlots.push(
//         <tr key={time} className={`rounded-b-3xl bg-white`}>
//           <td className="border px-2 h-16 w-10 ">{time}</td>
//           {renderDaySlots(time)}
//         </tr>
//       );
//     }
//     return timeSlots;
//   };

//   const renderDaySlots = (time: string) => {
//     return weekdays.map((element) => {
//       const eventsOnDay = events.filter(
//         (event) => event.date.toDateString() === element.date.toDateString()
//       );
//       return (
//         <>
//           <td
//             key={`${element.day}-${time}`}
//             className={`${
//               element.day.slice(0, 3) === todayName
//                 ? "bg-purple-100 border-dashed border-gray-300 border-2 hover:bg-amber-50"
//                 : "bg-white border-2 border-dashed border-gray-300 hover:bg-amber-50"
//             }`}
//           >
//             <div className="flex space-x-2">
//               {eventsOnDay.map((event) => {
//                 return (
//                   <span className="bg-slate-400 p-2 h-full rounded">
//                     {event.title}
//                   </span>
//                 );
//               })}
//             </div>
//           </td>
//         </>
//       );
//     });
//   };

//   const calculateEventTop = (startTime: string) => {
//     const [hours, minutes] = startTime.split(":");
//     const totalMinutes = parseInt(hours) * 60 + parseInt(minutes);
//     return `${(totalMinutes / 60) * 2}rem`;
//   };

//   const calculateEventHeight = (startTime: string, endTime: string) => {
//     const [startHours, startMinutes] = startTime.split(":");
//     const [endHours, endMinutes] = endTime.split(":");
//     const totalMinutes =
//       parseInt(endHours) * 60 +
//       parseInt(endMinutes) -
//       (parseInt(startHours) * 60 + parseInt(startMinutes));
//     return `${(totalMinutes / 60) * 2}rem`;
//   };

//   return (
//     <div>
//       <table className="w-full rounded-3xl overflow-y-auto overflow-scroll">
//         <thead className="bg-app-yellow h-14 ">
//           <tr className="bg-app-yellow rounded-3xl">
//             <th className="rounded-tl-3xl px-2"></th>
//             {renderDayHeader()}
//           </tr>
//         </thead>
//         <tbody className={`overflow-y-auto overflow-scroll `}>
//           {renderTimeSlots()}
//         </tbody>
//       </table>
//     </div>
//   );
// };

export default WeekView;
