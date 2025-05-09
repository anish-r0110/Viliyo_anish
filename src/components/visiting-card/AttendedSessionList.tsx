import { useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/router";

interface AttendedSessionProps {
  name: string;
  date: any;
  count: number;
  arrow?: ReactNode;
  backArrow?: ReactNode;
  onClickSave?: () => void;
  onClickDelete?: () => void;
  sessionList: any;
  profileImage: any;
}

const AttendedSessionList = ({
  name,
  date,
  count,
  arrow,
  sessionList,
  profileImage,
}: AttendedSessionProps) => {
  const router = useRouter();

  const [sessionCardDetails, setSessionCardDetails] = useState();

  useEffect(() => {
    setSessionCardDetails(sessionList);
  }, []);

  return (
    <>
      <div
        className="w-full h-12 bg-white shadow-lg text-zinc-600 grid grid-cols-4 rounded-lg m-2 items-center px-4 hover:scale-100 mobile:flex-col mobile:h-32 mobile:justify-start mobile:py-4 mobile:w-full mobile:-mx-2 tablet:w-screen"
        onClick={() => {
          router.push({
            pathname: "collected-visting-card/",
            query: {
              sessionList: JSON.stringify(sessionList),
              name: name,
              date: date,
              count: count,
              profileImage: profileImage,
            },
          });
        }}
      >
        <div className="flex ">
          <p className="font-bold px-2 ">Session:</p>
          <span>{name} </span>
        </div>
        <div className="flex">
          <p className="font-bold px-2">Date:</p>
          <span>{date}</span>
        </div>
        <div className="flex">
          <p className="font-bold px-2">Visiting Card Collected:</p>
          <span>{count}</span>
        </div>
        <div>
          <div className="text-app-blue flex justify-end mobile:hidden  tablet:hidden">
            {arrow}
          </div>
        </div>
      </div>
    </>
  );
};
export default AttendedSessionList;
