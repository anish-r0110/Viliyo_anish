import { AppPage } from "@/layouts/types";
import IEvent from "@/models/Event";
import ToggleCalendar from "@/models/ToggleCalendar";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation'
import { Button, DropdownMenu, Inset, Popover, Text } from "@radix-ui/themes";
import { BiDownArrow } from "react-icons/bi";
import {
  RxCaretDown,
  RxCaretLeft,
  RxCaretRight,
  RxCaretUp,
} from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { fetchUpcomingEvents } from "@/store/reducers/event";

interface IEventData {
  date: Date;
  data: IEvent[];
  numberOfEvents: number;
}



const CalendarPage: AppPage = () => {
 
  const { items  } = useSelector((state:RootState) => state.events);
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [week, setWeek] = useState({ week: null, weekData: null });
  const [currentDateValue, setCurrentDateValue] = useState(
    new Date(selectedYear, new Date().getMonth(), new Date().getDate())
  );
  const [calendarView, setCalendarView] = useState<ToggleCalendar>("week");
  const [mobileCalenderType, setMobileCalenderType] = useState("month");
  const yearOptions = Array.from(
    { length: 3 },
    (_, index) => currentYear + 1 - index
  );

  const dispatch = useDispatch<AppDispatch>()
 

  useEffect(() => {

      dispatch( fetchUpcomingEvents() );
    let { data: weekData, week } = getDatesInWeekStartingFromSunday(
      currentDateValue,
      items
    );
    setWeek({ week: week, weekData: weekData });
  }, [currentDate, calendarView]);



  useEffect(() => {
    if (mobileCalenderType == "week") {
      let { data: weekData, week } = getDatesInWeekStartingFromSunday(
        currentDateValue,
        items
      );
      setWeek({ week: week, weekData: weekData });
    }
  }, [currentDateValue, mobileCalenderType]);

  useEffect(() => {
    setCurrentDateValue(
      new Date(selectedYear, new Date().getMonth(), new Date().getDate())
    );
  }, [selectedYear]);

  return (
    <>
      <div className="flex flex-col text-center w-full h-full mb-4">
        <div className="flex py-2 justify-center gap-5 mb-2">
          <span className="my-auto">
            <Text as="label" size={"4"} className="font-medium my-auto">
              Calendar
            </Text>
          </span>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              <Button variant="outline" radius="large" size={"2"}>
                {selectedYear}
                <BiDownArrow />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
              {yearOptions.map((val) => (
                <DropdownMenu.Item key={val} onClick={() => setSelectedYear(val)}>
                  {val}
                </DropdownMenu.Item>
              ))}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>

        <div className="flex flex-row mb-10">
            <div className="flex flex-row justify-between w-full px-[2%]">
            <div className="flex mobile:w-full gap-10 justify-between">
              {mobileCalenderType != "list" && (
                <>
                  <span className="my-auto mobile:hidden tablet:hidden">
                    <Button
                      className="w-40 my-auto"
                      onClick={() =>
                        setCurrentDateValue(
                          new Date(
                            selectedYear,
                            new Date().getMonth(),
                            new Date().getDate()
                          )
                        )
                      }
                      size={"2"}
                      variant="outline"
                    >
                      Today
                    </Button>
                  </span>

                  <DateControls
                    currentDate={currentDateValue}
                    type={mobileCalenderType}
                    setCurrentDate={setCurrentDateValue}
                    year={selectedYear}
                    week={week.week}
                  />
                </>
              )}
            </div>

            <div className="flex flex-row items-end">
              <div className="flex mr-1">
                <Button
                  onClick={() => setMobileCalenderType("month")}
                  size={"2"}
                  variant={mobileCalenderType == "month" ? "classic" : "outline"}
                  className="w-40 my-auto"
                >
                  Month
                </Button>
              </div>
              <div className="flex">
                <Button
                  onClick={() => setMobileCalenderType("list")}
                  size={"2"}
                  variant={mobileCalenderType == "list" ? "classic" : "outline"}
                  className="w-40 my-auto"
                >
                  List
                </Button>
              </div>
            </div>
        </div>

        </div>

        {mobileCalenderType == "month" && (
          <MonthView
            year={selectedYear}
            events={items}
            currentDate={currentDateValue}
          />
        )}
        {/* {mobileCalenderType == "week" && (
          <WeekViewComponent weekData={week?.weekData} />
        )} */}
        {mobileCalenderType == "list" && <ListViewComponent events={items}  />}
      </div>
      {/* <div className="mt-5">
        {calendarView === "week" && (
          <WeekView currentDate={currentDate} events={events}></WeekView>
        )}
      </div>  */}

      {/* <FullCalendar
        editable={true}
        eventMaxStack={5}
        buttonText={{
          today: "Today",
          month: "Month",
          week: "Week",
          list: "List View",
        }}
        eventDataTransform={(event) => ({
          id: event.id,
          title: event.title,
          url: `/configuration?sessionId=${event.id}`,
          start: event.startTime,
          end: event.endTime,
        })}
        buttonIcons={{
          prev: "chevron-left",
          next: "chevron-right",
        }}
        events={events as any}
        eventColor="#FFB800"
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
        weekends={true}
        headerToolbar={{
          left: "today prev,next",
          center: "title",
          right: "timeGridWeek,dayGridMonth,listWeek", // user can switch between the two
        }}
        initialView="timeGridWeek"
      /> */}
    </>
  );
};

export default CalendarPage;

CalendarPage.Layout = "Admin";



const MonthView = ({
  year,
  events,
  currentDate,
}: {
  year: number;
  events: IEvent[];
  currentDate: Date;
}) => {
  const numberOfDays = new Date(year, currentDate.getMonth() + 1, 0).getDate();
  const [popoverData, setPopOverData] = useState<number | null>(null);

  // Helper function to get the last day of the previous month
  const getPrevMonthDays = (startDay: number, lastDate: number) => {
    const days = [];
    for (let i = startDay - 1; i >= 0; i--) {
      days.push(
        <div className="text-app-gray-medium bg-slate-200 rounded-sm" key={`prev-${i}`}>
          <div className="text-app-gray-medium mt-3 relative mx-auto h-10 w-10 flex items-center justify-center">
            <span className="flex justify-center font-bold text-lg py-[10%]">
              {lastDate - i}
            </span>
          </div>
        </div>
      );
    }
    return days;
  };

  // Helper function to get the first days of the next month
  const getNextMonthDays = (remainingDays: number) => {
    const days = [];
    for (let i = 1; i <= remainingDays; i++) {
      days.push(
        <div className="text-app-gray-medium bg-slate-200 rounded-sm" key={`next-${i}`}>
          <div className="mt-3 relative mx-auto h-10 w-10 flex items-center justify-center">
            <span className="flex justify-center font-bold text-lg py-[10%]">
              {i}
            </span>
          </div>
        </div>
      );
    }
    return days;
  };

  // Helper function to filter events by date
  const filterEventsByDate = (events: IEvent[], year: number, month: number, day: number) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year &&
             eventDate.getMonth() === month - 1 &&
             eventDate.getDate() === day;
    });
  };

  const getMonthDays = () => {
    const days = [];
    for (let i = 1; i <= numberOfDays; i++) {
      const eventData = filterEventsByDate(events, year, currentDate.getMonth() + 1, i);
      days.push(
        <div className="flex flex-col col-span-1 row-span-1 text-xs p-1 h-auto laptop:min-h-[85px]" key={i}>
          <Popover.Root>
            <Popover.Trigger id={`${i}`} onClick={() => setPopOverData(i)}>
              <div>
                <div
                  className={
                    eventData.length
                      ? "mt-2 relative mx-auto text-white bg-app-purple rounded-full h-10 w-10 flex  hover:cursor-pointer items-center justify-center"
                      : "text-black mt-2 relative mx-auto h-10 w-10 flex items-center justify-center"
                  }
                >
                  <span className="flex justify-center font-bold text-sm py-[10%]">
                    {eventData.length || "-"}
                  </span>
                </div>
                <p className="border-b-[1px] border-app-purple py-1 text-[8px] text-base mobile:text-xs">
                  {i}
                </p>
              </div>
            </Popover.Trigger>
            <Popover.Content>
              <Inset className="shadow flex justify-center items-center p-3">
              {popoverData === i && (
                <div className="w-full h-full">
                  { eventData.map((item, index) =>  <CalendarItem key={index} item={item} />) }
                </div>
              )}
              <label></label>
              </Inset>
            </Popover.Content>
          </Popover.Root>
        </div>
      );
    }
    return days;
  };

  const startDay = new Date(year, currentDate.getMonth(), 1).getDay();
  const prevMonthLastDate = new Date(year, currentDate.getMonth(), 0).getDate();

  const totalDays = startDay + numberOfDays;
  const remainingDays = totalDays <= 35 ? 35 - totalDays : 42 - totalDays;

  return (
    <div className="flex flex-col min-h-full min-w-full">
      <div className="mobile:visible grid grid-cols-7 grid-rows-1 gap-y-1 mobile:w-full w-full mx-auto">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((val, index) => (
          <React.Fragment key={index}>
            <label className="mobile:hidden text-sm font-semibold text-app-gray-medium">
              {val}
            </label>
            <label className="tablet:hidden laptop:hidden desktop:hidden largescreen:hidden xxl:hidden text-xs font-semibold text-app-gray-medium">
              {val.slice(0, 3)}
            </label>
          </React.Fragment>
        ))}
      </div>
      <div className="mobile:visible grid grid-cols-7 grid-rows-5 gap-y-1 mobile:w-full w-full mx-auto">
        {getPrevMonthDays(startDay, prevMonthLastDate)}
        {getMonthDays()}
        {getNextMonthDays(remainingDays)}
      </div>
    </div>
  );
};

const ListViewComponent = ({ events }: { events: IEvent[] }) => {
  const listData = organizeEventsByDate(events);
  const [selectedCard, setSelectedCard] = useState("");
  const sortedListData = [...listData].sort((a:any, b:any) => b.date - a.date);

  useEffect(() => {
    if (!selectedCard && sortedListData.length > 0) {
      setSelectedCard(new Date(sortedListData[0].date).toISOString().split('T')[0]);
    }
  }, []);

  return (
    <>
    <label className="font-semibold text-app-gray-medium">Yearly View</label>
    {sortedListData.map((item, index) => {
      const itemDate = new Date(item.date).toISOString().split("T")[0];
      const isSelected = selectedCard === itemDate;
      return (
        <>          
            <div
              className="flex flex-col w-full border shadow-sm rounded-lg justify-between px-[5%] py-[1%] mobile:py-[3%] tablet:py-[3%] mt-2"
              key={item.date.toDateString()}
            >
            
              <div
                className="flex w-full justify-between"
                onClick={() =>
                  setSelectedCard(isSelected ? '' : itemDate)
                }
              >
                <span className="flex text-base font-medium gap-3">
                  {new Date(item.date)?.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "2-digit",
                    weekday: "short",
                  })}
                </span>
                <span className="flex gap-5">
                  <div
                    className="relative text-white bg-app-purple rounded-full h-6 w-6 flex items-center justify-center"
                  >
                    <span className="font-bold text-sm">
                      {item.numberOfEvents}
                    </span>
                  </div>
                  <span className="my-auto">
                    {isSelected ? <RxCaretUp /> : <RxCaretDown />}
                  </span>
                </span>
              </div>
              {isSelected && (
                <div className="grid grid-cols-3 mobile:flex mobile:flex-col tablet:grid-cols-2">
                  {item.data.map((item, index) => (
                    <CalendarItem item={item} key={index} />
                  ))}
                </div>
              )}
            </div>
        </>
      );
    })}
  </>
  );
};

function adjustDate(baseDate: Date, operation: string) {
  const currentDate = new Date(baseDate);

  if (operation === "prevWeek") {
    currentDate.setDate(currentDate.getDate() - 7);
  } else if (operation === "prevMonth") {
    currentDate.setMonth(currentDate.getMonth() - 1);
  } else if (operation === "nextWeek") {
    currentDate.setDate(currentDate.getDate() + 7);
  } else if (operation === "nextMonth") {
    currentDate.setMonth(currentDate.getMonth() + 1);
  }

  return currentDate;
}


function filterEventsByDate(events: any[], year: any, month: any, day: any) {
  // Combine year, month, and day into a single string
  const targetDate = `${year}-${month}-${day}`;
  // Convert targetDate to UTC format for comparison
  const formattedTargetDate = new Date(targetDate).toISOString().substr(0, 10); // Take only the date part

  // Filter events based on the date
  const filteredEvents = events.filter(
    (event: { date: string | number | Date }) => {
      const eventDate = new Date(event.date).toISOString().substr(0, 10); // Take only the date part
      return eventDate === formattedTargetDate;
    }
  );

  return filteredEvents;
}

function getDatesInWeekStartingFromSunday(baseDate: Date, events: IEvent[]) {
  const datesInWeek = [];
  const currentDate = new Date(baseDate);
  const weekObject: any = {
    week: {},
    data: {},
  };

  // Find the Sunday of the current week
  const dayOfWeek = currentDate.getDay();
  const daysUntilSunday = (dayOfWeek + 7) % 7;
  currentDate.setDate(currentDate.getDate() - daysUntilSunday);

  // Add start date to the weekObject
  weekObject.week.startDate = new Date(currentDate);

  // Generate dates for the week starting from Sunday
  for (let i = 0; i < 7; i++) {
    datesInWeek.push(new Date(currentDate));
    weekObject.data[
      `${new Date(currentDate).toLocaleDateString("en-US", {
        weekday: "long",
      })}`
    ] = {
      date: new Date(currentDate),
      value: filterEventsByDate(
        events,
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        currentDate.getDate()
      ),
    };
    currentDate.setDate(currentDate.getDate() + 1);
  }

  // Subtract one day to get the correct end date
  currentDate.setDate(currentDate.getDate() - 1);

  // Add end date to the weekObject
  weekObject.week.endDate = new Date(currentDate);
  return weekObject;
}
function organizeEventsByDate(events: IEvent[]): IEventData[] {
  const eventsByDateMap = new Map<string, IEventData>();

  // Organize events by date
  events.forEach((event) => {
    const eventDate = new Date(event.date).toISOString().split("T")[0];
    if (!eventsByDateMap.has(eventDate)) {
      eventsByDateMap.set(eventDate, {
        date: new Date(event.date),
        data: [],
        numberOfEvents: 0,
      });
    }
      const eventData = eventsByDateMap.get(eventDate);
      if( eventData ){
        eventData?.data.push(event);
        eventData.numberOfEvents += 1;
      }
  });

  // Filter out dates with no events
  const filteredEventsByDate = Array.from(eventsByDateMap.values()).filter(
    (eventData) => eventData.numberOfEvents > 0
  );

  return filteredEventsByDate;
}


const DateControls = ({ currentDate, setCurrentDate, year, type, week }:{ currentDate:any , setCurrentDate:any , year:any , type:any , week:any }) => {
  return (
    <div className="flex gap-8 my-auto mobile:my-3">
      <RxCaretLeft
        className="my-auto"
        size={35}
        onClick={() => {
          if (type == "month")
            setCurrentDate(adjustDate(currentDate, "prevMonth"));
          if (type == "week")
            setCurrentDate(adjustDate(currentDate, "prevWeek"));
        }}
      />
      {type == "month" && (
        <label className="my-auto select-none">
          {currentDate.toLocaleDateString("default", { month: "long" })}, {year}
        </label>
      )}
      {type == "week" && (
        <span className="my-auto select-none">
          {week.startDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
          -
          {week.endDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </span>
      )}
      <RxCaretRight
        className="my-auto"
        size={35}
        onClick={() => {
          if (type == "month")
            setCurrentDate(adjustDate(currentDate, "nextMonth"));
          if (type == "week")
            setCurrentDate(adjustDate(currentDate, "nextWeek"));
        }}
      />
    </div>
  );
};

const CalendarItem = ({ item }:{ item:any}) => {
  const router = useRouter()
  const sessionId = item?.id || '1234'; // Use a default value if item.id is not available
  const joinUrl = `/configuration?sessionId=${sessionId}`;

  return (
    <div
      className="text-xs flex flex-col "
      key={item?.id || 1}
    >
      <span className="">
        <span className="font-semibold text-wrap ">Program Name : {item.programName} </span>
      </span>
      <span>
        <span className="font-semibold">Session Name:</span>
        {item.title}
      </span>
      <span>
        <span className="font-semibold">Trainer :</span>
        {item.trainerName}
      </span>
      <span>
        <span className="font-semibold">Duration :</span>
        {String(new Date(item.startTime).getHours()).padStart(2, "0") +
          ":" +
          String(new Date(item.startTime).getMinutes()).padStart(2, "0")}
        -{" "}
        {String(new Date(item.endTime).getHours()).padStart(2, "0") +
          ":" +
          String(new Date(item.endTime).getMinutes()).padStart(2, "0")}
      </span>
      <span className="flex justify-center">
        <Button variant="classic" size={"2"} className="w-[50%]" onClick={() => router.push(joinUrl)}>
          Join
        </Button>
      </span>
    </div>
  );
};
