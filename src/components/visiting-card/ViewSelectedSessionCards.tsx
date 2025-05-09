import { ReactNode } from "react";
import Popover from "../popover/Popover";

interface SelectedSessionProps {
  name: string;
  date: string;
  count: string;
  arrow?: ReactNode;
  backArrow?: ReactNode;
  onClickSave?: () => void;
  onClickDelete?: () => void;
}

const SelectedSession = ({
  name,
  date,
  count,
  backArrow,
  onClickSave,
  onClickDelete,
}: SelectedSessionProps) => {
  return (
    <>
      <div className="w-full h-12 bg-white text-zinc-600 shadow-lg flex justify-between rounded-lg m-2 mobile:m-0 items-center px-4 mobile:px-0 mobile:text-xs mobile:flex-col mobile:h-44 tablet:w-full laptop:w-full tablet:flex-col tablet:h-40 tablet:mx-7 laptop:flex-col laptop:h-40">
        <div className="tablet:hidden ">{backArrow}</div>
        <div className="flex ">
          <p className="font-bold px-2">Session:</p>
          <span>{name}</span>
        </div>
        <div className="flex">
          <p className="font-bold px-2 ">Date:</p>
          <span>{date}</span>
        </div>
        <div className="flex">
          <p className="font-bold px-2 ">Visiting Card Collected:</p>
          <span>{count}</span>
        </div>
        <div className="mobile:flex tablet:flex">
          <Popover
            content={
              <div>
                <button
                  onClick={() => {
                    alert("Collected visiting cards saved as .png format");
                  }}
                  className="font-bold text-zinc-500"
                >
                  Save as .png
                </button>
                <button
                  className="font-bold text-zinc-500"
                  onClick={() => {
                    alert("Collected visiting cards saved as .txt format");
                  }}
                >
                  Save as .txt
                </button>
              </div>
            }
          >
            <button
              onClick={onClickSave}
              className="px-6 py-1 border-2 border-app-blue text-black rounded-full hover:scale-105"
            >
              Save All
            </button>
          </Popover>

          <Popover
            content={
              <div>
                <p className="font-bold text-app-blue">
                  Do you wish to delete all the visiting card
                </p>
                <p>Once you delete, you cannot retirve these visiting cards</p>
                <button className="border-2 border-x-app-blue rounded-full text-app-blue font-bold">
                  No
                </button>
                <button className="border-2 border-x-app-blue rounded-full font-bold text-white bg-app-blue">
                  Yes
                </button>
              </div>
            }
          >
            <button
              onClick={onClickDelete}
              className="px-6 py-1 border-2 border-app-blue text-black rounded-full hover:scale-105"
            >
              Delete All
            </button>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default SelectedSession;
