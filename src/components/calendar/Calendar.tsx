import React, { Fragment, useState } from "react";
import IEvent from "@/models/Event";
import { CiCalendar } from "react-icons/ci";
import { HiOutlineArrowSmRight, HiOutlineArrowSmLeft } from "react-icons/hi";
import Link from "next/link";
import { Box, Text } from "@radix-ui/themes";

interface CalendarProps {
  events: IEvent[];
  onChangeMonth: (date: Date) => void;
}

interface IEventCardProps {
  event: IEvent;
  height?: number;
}

const FutureEventCard = ({ event, height = 20 }: IEventCardProps) => {
  return (
    <div
      className={` w-full shadow-md rounded-r-2xl h-${height}  border-l-4 
         bg-white border-black flex flex-col
      `}
    >
      <div className="px-1 py-1 ">
        <span className="text-black font-bold text-base">{event.title}</span>

        <Text as="p" className="text-purple-700 text-sm">
          {String(event.startTime.getHours()).padStart(2, "0") +
            ":" +
            String(event.startTime.getMinutes()).padStart(2, "0")}
          -{" "}
          {String(event.endTime.getHours()).padStart(2, "0") +
            ":" +
            String(event.endTime.getMinutes()).padStart(2, "0")}
        </Text>
      </div>
    </div>
  );
};

const PastEventCard = ({ event, height = 20 }: IEventCardProps) => {
  return (
    <Box
      className={` w-full shadow-md rounded-r-2xl h-${height}  border-l-4  opacity-25
         bg-white border-black flex flex-col
      `}
    >
      <div className="px-1 py-1 ">
        <span className="text-black font-bold text-base">{event.title}</span>
        <Text as="p" className="text-app-blue text-sm">
          {String(event.startTime.getHours()).padStart(2, "0") +
            ":" +
            String(event.startTime.getMinutes()).padStart(2, "0")}
          -{" "}
          {String(event.endTime.getHours()).padStart(2, "0") +
            ":" +
            String(event.endTime.getMinutes()).padStart(2, "0")}
        </Text>
      </div>
    </Box>
  );
};

const NoEvent = ({ height = 20 }) => {
  return (
    <div
      className={` w-full shadow-xl rounded-r-2xl h-${height}  border-l-4  opacity-10
         bg-app-gray border-black flex flex-col
      `}
    >
      <div className="px-1 py-1 ">
        <div className="my-8">
          <hr className="bg-zinc-700 h-0.5 "></hr>
        </div>
      </div>
    </div>
  );
};

const TodayEventCard = ({ event, height = 20 }: IEventCardProps) => {
  return (
    <div
      className={`grid grid-cols-10 space-x-2 w-full shadow-md rounded-r-2xl h-${height}  border-l-4  text-base text-white font-medium
         bg-gradient-to-br from-app-blue from-40% to-app-purple border-app-gray flex flex-col
      `}
    >
      <div className="col-span-7 px-1 py-1 space-x-2">
        <span>{event.title}</span>
        <Text as="p" className="text-white text-sm">
          {String(event.startTime.getHours()).padStart(2, "0") +
            ":" +
            String(event.startTime.getMinutes()).padStart(2, "0")}
          -{" "}
          {String(event.endTime.getHours()).padStart(2, "0") +
            ":" +
            String(event.endTime.getMinutes()).padStart(2, "0")}
        </Text>
      </div>
      <Link
        className="col-span-3 bg-gradient-to-tr from-app-purple from-10% to-app-fuchsia h-20 rounded-r-2xl text-center text-lg py-6 text-white font-bold"
        href={"live-session"}
      >
        <span>Join</span>
      </Link>
    </div>
  );
};

const Calendar: React.FC<CalendarProps> = ({ events, onChangeMonth }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const handlePrevMonth = () => {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );

    setCurrentDate(prevDate);
    onChangeMonth(prevDate);
  };

  const handleNextMonth = () => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );

    setCurrentDate(nextDate);
    onChangeMonth(nextDate);
  };

  const getDaySlots = () => {
    const daySlots: { [key: string]: IEvent[] } = {};

    events.forEach((event) => {
      const eventDate = event.date.toDateString();
      if (!daySlots[eventDate]) {
        daySlots[eventDate] = [];
      }
      daySlots[eventDate].push(event);
    });

    return daySlots;
  };

  const daySlots = getDaySlots();

  const startDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  );
  const endDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  );
  const daysInMonth = [];

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    daysInMonth.push(new Date(date));
  }

  return (
    <div className="flex flex-row bg-gray-100 overflow-hidden">
      <div className="flex flex-col flex-grow bg-white">
        <h1 className="font-bold text-app-blue text-xl">Upcoming programmes</h1>
        <div className="flex space-x-2 items-center border-b">
          <div>
            <CiCalendar />
          </div>
          <div>
            <h2 className="text-lg font-semibold">
              {currentDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </h2>
          </div>

          <div className="pl-6 pr-2">
            <button
              className="px-1 text-zinc-600 py-4"
              onClick={handlePrevMonth}
            >
              <HiOutlineArrowSmLeft />
            </button>
            <button
              className="px-1 text-zinc-600 py-2"
              onClick={handleNextMonth}
            >
              <HiOutlineArrowSmRight />
            </button>
          </div>
        </div>
        <div
          className="py-4 overflow-y-auto space-y-4"
          id={"upcoming" + "-" + "programme"}
        >
          {daysInMonth.map((date, index) => {
            const dateString = date.toDateString();
            const eventsForDate = daySlots[dateString] || [];

            return (
              <div className="flex space-x-1" key={Math.random()}>
                <span className="text-sm w-20 font-semibold mb-2">
                  {/* <p className="text-lg font-semibold mb-2"> */}
                  {date.getDate() + " " + DAYS[date.getDay()]}
                  {/* </p> */}
                </span>
                <div key={index} className="w-full flex flex-col space-y-4">
                  <>
                    {eventsForDate.map((event) => (
                      <Fragment key={event.id}>
                        {/* <TodayEventCard key={event.id} event={event} /> */}

                        {/* {event.date === new Date() ? (
                          <TodayEventCard key={event.id} event={event} />
                        ) : (
                          <NoEvent key={index} />
                        )} */}

                        {event.status.toLowerCase() === "cancelled" && (
                          <PastEventCard event={event} />
                        )}
                        {event.status.toLowerCase() === "scheduled" && (
                          <TodayEventCard event={event} />
                        )}
                      </Fragment>
                    ))}
                  </>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
