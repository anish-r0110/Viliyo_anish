import FilteredCalendar from "@/components/calendar/FilteredCalendar";
import { AppDispatch, RootState } from "@/store";
import { fetchUpcomingEvents } from "@/store/reducers/event";
import { Box } from "@radix-ui/themes";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const UpcomingPanel = () => {
  const { items , isLoading  } = useSelector((state:RootState) => state.events)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
      dispatch( fetchUpcomingEvents() )
  }, []);

  return (
    <Box className="bg-white h-screen overflow-y-auto shadow-lg rounded-3xl px-2 py-6">
      { isLoading && <span> Fetching upcoming events.... </span> }
       { (!isLoading && items.length > 0) && <FilteredCalendar events={items} />}
    </Box>
  );
};

export default UpcomingPanel;
