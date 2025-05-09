import React from "react";
import Popover from "@/components/popover/Popover";
import IEvent from "@/models/Event";
import CalendarEvent from "@/components/calendar/CalendarEvent";

interface CalendarProps {
  events: IEvent[];
  currentDate: Date;
}

const MonthView: React.FC<CalendarProps> = ({ events, currentDate }) => {
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);

  const currentDay = currentDate.toString().toLocaleUpperCase().split(" ");
  const todayName = currentDay[0];

  const renderDayHeader = () => {
    return weekdays.map((day) => (
      <>
        <th
          key={day}
          className={`${
            day === weekdays[6]
              ? "text-center font-semibold rounded-tr-3xl"
              : "text-center font-semibold"
          } `}
        >
          <div
            className={`${
              day === todayName
                ? "bg-app-lightYellow rounded-full opacity-80"
                : null
            }`}
          >
            {day.slice(0, 3)}
          </div>
        </th>
      </>
    ));
  };

  const renderDays = () => {
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <td
          key={`empty-${i}`}
          className={` border-2 border-dashed border-gray-300  `}
        ></td>
      );
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(year, month, day);
      const dayName = currentDate.toLocaleDateString("en-US", {
        weekday: "long",
      });

      const eventsOnDate = events.filter(
        (event) => event.date.toDateString() === currentDate.toDateString()
      );

      days.push(
        <td
          key={`day-${day}`}
          className={`border-2 border-dashed border-gray-300 hover:bg-app-lightYellow ${
            day === Number(currentDay[2]) && "bg-cyan-50"
          } ${
            dayName === "Sunday" || dayName === "Saturday"
              ? "bg-fuchsia-100"
              : "bg-white"
          } `}
        >
          <div className={`flex flex-col p-2 `}>
            <div
              className={`font-semibold py-1 px-1 ${
                day === Number(currentDay[2])
                  ? " mb-2 text-4xl text-app-blue"
                  : "text-black"
              } `}
            >
              {day}
            </div>

            {eventsOnDate.slice(0, 3).map((event) => (
              <CalendarEvent key={event.id} event={event} />
            ))}
            {eventsOnDate.length > 3 && (
              <Popover
                content={
                  <div className="flex flex-col">
                    {eventsOnDate.slice(3, eventsOnDate.length).map((event) => (
                      <CalendarEvent key={event.id} event={event} />
                    ))}
                  </div>
                }
              >
                <span className="text-app-blue underline">
                  {" "}
                  {eventsOnDate.length - 3} More{" "}
                </span>
              </Popover>
            )}
          </div>
        </td>
      );
    }

    const weeks: JSX.Element[] = [];
    let week: JSX.Element[] = [];
    days.forEach((day, index) => {
      week.push(day);
      if ((index + 1) % 7 === 0) {
        weeks.push(
          <tr className={` bg-white`} key={`week-${index / 7}`}>
            <td className={`text-center `}>{"Week"} </td>
            {week}
          </tr>
        );

        week = [];
      }
    });

    if (week.length > 0) {
      weeks.push(
        <tr className=" bg-white" key={`week-${weeks.length}`}>
          <td className="text-center rounded-bl-3xl">{"Week"}</td>
          {week}
        </tr>
      );
    }

    return weeks;
  };

  return (
    <table className="w-full">
      <thead className="bg-app-yellow">
        <tr>
          <th className="rounded-tl-3xl"></th>
          {renderDayHeader()}
        </tr>
      </thead>
      <tbody className={`border border-inherit border-dashed `}>
        {renderDays()}
      </tbody>
    </table>
  );
};

export default MonthView;
