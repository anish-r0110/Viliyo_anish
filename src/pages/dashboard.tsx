import CalendarCoachMark from "@/components/coach-mark/Calendar";
import CoachMarks from "@/components/coach-mark/CoachMarks";
import DashboardCoachMark from "@/components/coach-mark/Dashboard";
import HistoryCoachMark from "@/components/coach-mark/History";
import UpcomingCoachMark from "@/components/coach-mark/Upcoming";
import { PendingTaskPanel, UpcomingPanel } from "@/components/panels";
import LatestProgrammes from "@/components/program/components/LatestProgrammes";
import LatestProgrammmesCard from "@/components/program/components/LatestProgrammmesCard";
import { Greeting } from "@/components/shared";
import CoachMark from "@/interfaces/CoachMark";
import { User } from "@/models/User";
import { AppDispatch, RootState } from "@/store";
import { getLatestPrograms } from "@/store/reducers/programs";
import OverviewWidget from "@/widgets/overview";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const DashboardPage = () => {
  const [ user , setUser ] =  useState<User>()
  const userState = useSelector((state: RootState) => state.auth.user as User);
  const { latestPrograms } = useSelector((state:RootState) => state.programs)

  useEffect(() => {
     setUser( userState );
  },[userState])


  const coachMarks: CoachMark[] = [
    {
      heading: "Dashboard",
      targetId: "dashboard-menu",
      content: <DashboardCoachMark />,
      headerAlignmentType: "top",
    },
    {
      heading: "Calendar",
      targetId: "calendar-menu",
      content: <CalendarCoachMark />,
      headerAlignmentType: "top",
    },
    {
      heading: "History",
      targetId: "history-menu",
      content: <HistoryCoachMark />,
      headerAlignmentType: "top",
    },
    {
      heading: "Upcoming Programmes",
      targetId: "upcoming-programme",
      content: <UpcomingCoachMark />,
      headerAlignmentType: "right",
    },
    // Add more coach marks as needed.
  ];

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    dispatch( getLatestPrograms());
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 w-full h-full mobile:grid-cols-1 gap-4 justify-center">
        <div className="col-span-3 mobile:col-span-4 row-span-1">
          { user?.name && <Greeting name={user?.name}>Welcome to your dashboard!</Greeting> }
        </div>
        <div
          id="target-1"
          className=" col-span-1  row-span-4 mobile:hidden tablet:hidden"
        >
          <UpcomingPanel />
        </div>
        <div className="flex col-span-2 mobile:col-span-4">
          <OverviewWidget />
        </div>
        <div className="col-span-1 mobile:col-span-4 tablet:col-span-2">
          <PendingTaskPanel />
        </div>
        <div className="flex flex-col col-span-3 tablet:col-span-4 laptop:col-span-3 desktop:col-span-3 largescreen:col-span-3">
          <div className="flex  flex-row text-app-blue font-semibold text-sm mb-1 justify-between">
            <div className="flex justify-start text-sm">Latest Programmes</div>
           { latestPrograms.length > 5 && <div className="flex justify-end text-sm">
              <Link href="/viewAllPrograms" className="hover:cursor-pointer text-app-blue text-sm font-semibold">
                View All Programmes
              </Link>
            </div> }          
          </div>
          <div>
          <hr className="mb-4 border-app-blue border-[1.5px] w-full" />
          </div>
          <div className="flex mobile:hidden tablet:hidden  flex-grow">
            <LatestProgrammes data={latestPrograms} limit={5} />
          </div>
          <div className="hidden mobile:flex mobile:justify-stretch mb-10 tablet:flex">
            <LatestProgrammmesCard data={latestPrograms} limit={5} />
          </div>
        </div>
      </div>
      <CoachMarks marks={coachMarks} />
    </>
  );
};

export default DashboardPage;
DashboardPage.Layout = "Admin";
