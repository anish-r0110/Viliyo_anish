import { SessionTab, SessionTabs } from "@/components/session";
import { BackNavigation, Card } from "@/components/shared";
import { AppPage } from "@/layouts/types";
import { IProgram, ISession } from "@/models";
import { AppDispatch, RootState } from "@/store";
import { getProgramDetail, resetCurrentProgram } from "@/store/reducers/programs";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const transformTabsData = (sessions: ISession[]) => {
  const tabs = sessions.reduce((acc: any, session: ISession) => {
    acc[session.name] = [
      { id: session.id, TabContent: <SessionTab session={session} /> },
    ];
    return acc;
  }, {});
  return tabs;
};

const ProgramDetailCard = ({ program }: { program: IProgram }) => {

  return (
    <>
      <div className="flex w-full">
        <BackNavigation title={program.name} />
      </div>
      <div className="my-4 gap-4 text-zinc-600 text-center">
        <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-3 largescreen:grid-cols-3 w-3/4 mobile:w-full">
          <div className="flex flex-col m-2 tablet:p-1">
  
            <Card>
              <div className="items-start justify-start">
                <div className="text-sm">Overall Program Duration</div>
                <div className="font-bold">
                  {moment(program?.startDate).format("DD MMM YYYY")} -{" "}
                  {moment(program?.endDate).format("DD MMM YYYY")}
                </div>
              </div>
            </Card>
          </div>
          <div className="flex flex-col m-2 tablet:p-1">
            <Card>
              <div className="text-sm">No. of Sessions</div>
              <div className="font-bold">
                {program?.sessions?.length} {(program?.sessions?.length!) > 1 ? "Sessions" : "Session"}
              </div>
            </Card>
          </div>
          <div className="flex flex-col m-2 tablet:p-1">
            <Card>
              <div className="text-sm">Batch Name</div>
              <div className="font-bold"> {program?.batchName}</div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

const ProgramDetail: AppPage = () => {
  const router = useRouter();
  let { programId } = router.query;
  const { currentProgram } = useSelector((state:RootState) => state.programs);
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    
    if (!programId) return;
    
    dispatch( getProgramDetail({id: programId as string}))

    return ( ) => {  dispatch( resetCurrentProgram())}

  
  }, [programId]);

  if (!currentProgram)
    return (
      <>
        <BackNavigation title="Program Detail"></BackNavigation>
        <div className="w-screen h-screen flex justify-center items-center">
          {" "}
          Please wait while program details are loading .....{" "}
        </div>
      </>
    );

  return (
    <div className="">
      <ProgramDetailCard program={currentProgram} />
      {currentProgram.sessions && (
        <SessionTabs
          sessions={currentProgram.sessions ? transformTabsData(currentProgram.sessions) : []}
        />
      )}
    </div>
  );
};

export default ProgramDetail;
ProgramDetail.Layout = "Admin";
