import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { Toggle } from "../buttons";
import ToggleCalendar from "@/models/ToggleCalendar";
import { format } from "date-fns";

interface FilterCalendarViewPros {
  calendarView: ToggleCalendar;
  onChangeView: (view: ToggleCalendar) => void;
  onChangeDate: (newDate: Date) => void;
  currentDate: Date;
}

const FilterCalendarView = ({
  calendarView,
  onChangeView,
  onChangeDate,
  currentDate,
}: FilterCalendarViewPros) => {
  const handleOnChangeView = (state: boolean) => {
    if (state) onChangeView("month");
    else onChangeView("week");
  };

  const handleNextMonth = () => {
    const nextDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      1
    );
    onChangeDate(nextDate);
  };

  const handlePreviousMonth = () => {
    const prevDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - 1,
      1
    );
    onChangeDate(prevDate);
  };

  const getFormattedDateRange = (): string => {
    if (calendarView === "week") {
      const startDate = new Date(currentDate);
      const endDate = new Date(currentDate);
      endDate.setDate(endDate.getDate() + 6); // Calculate the end date of the week

      const startDateFormatted = format(startDate, "do MMM");
      const endDateFormatted = format(endDate, "do MMM");

      return `${startDateFormatted} - ${endDateFormatted}`;
    } else {
      return format(currentDate, "do MMM yyyy");
    }
  };

  const handleNextWeek = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() + 7); // Go forward 7 days (one week)
    onChangeDate(prevDate);
  };

  const handlePreviosWeek = () => {
    const prevDate = new Date(currentDate);
    prevDate.setDate(currentDate.getDate() - 7); // Go back 7 days (one week)
    onChangeDate(prevDate);
  };

  return (
    <div className="w-full flex justify-between">
      <div className="shrink w-3/4 flex">
        <button
          onClick={() => onChangeDate(new Date())}
          className="border shrink-0 inline border-app-blue  mobile:py-1 px-10 mobile:px-6 mobile:text-sm rounded-full hover:scale-105"
        >
          Today
        </button>
        <div className="mx-4 mobile:mx-0 inline-flex  items-center mobile:text-xs">
          <button
            onClick={
              calendarView === "month" ? handlePreviousMonth : handlePreviosWeek
            }
            className="mx-2 mobile:mx-1"
          >
            <FiArrowLeft className="hover:scale-125" size={20} />
          </button>
          <button
            onClick={
              calendarView === "month" ? handleNextMonth : handleNextWeek
            }
            className="mx-2  mobile:mx-1"
          >
            <FiArrowRight className="hover:scale-125" size={20} />
          </button>
          <span>{getFormattedDateRange()}</span>
        </div>
      </div>

      <div className="flex-none">
        <Toggle
          onChange={handleOnChangeView}
          activeText="Month"
          inactiveText="Week"
        ></Toggle>
      </div>
    </div>
  );
};

export default FilterCalendarView;
