import { RxCross2 } from "react-icons/rx";
import Image from "next/image";
import Icon from "@/assets/icons";

export const Warning = ({
    heading,
    content,
    buttonText,
    onCloseText,
    onOkClick,
    onClose,
  }: {
    heading: string;
    content: string;
    buttonText: string;
    onCloseText?: string;
    onOkClick: () => void;
    onClose: () => void;
  }) => {
    return (
      <>
        <div
          className={`fixed inset-0 bg-black opacity-50 pointer-events-auto`}
        ></div>
        <div className="fixed w-full inset-0 flex flex-col items-center justify-center z-50">
          <div className="flex relative flex-col bg-white p-6 shadow-md mobile:w-[80%] tablet:w-[60%] laptop:w-[45%] desktop:w-[38%] largescreen:w-[28%] rounded-[32px] ">
            <div className="bg-[#E9BE50] border-[7px] border-[#FFFFFF] shadow-xl rounded-full mx-auto mobile:-mt-[25%] tablet:-mt-[20%] laptop:-mt-[20%] desktop:-mt-[15%] largescreen:-mt-[12%]">
              <Image
                src={Icon.exclamation}
                alt={"About Vtt Icon"}
                width={90}
                className=""
              ></Image>
            </div>
            <div className="">
              <RxCross2
                size={25}
                onClick={() => onClose()}
                className="absolute top-5 right-5 cursor-pointer"
              />
            </div>
            <h2 className="mt-[20px] text-center text-2xl font-semibold break-words">
              {heading}
            </h2>
            {content && <p className="break-words">{content}</p>}
            <div className="flex flex-row justify-between">
              <button
                onClick={() => onOkClick()}
                className="bg-[#363E70] text-white py-2 w-[40%] mx-auto rounded-full mt-4"
              >
                {buttonText}
              </button>
              {onCloseText && (
                <button
                  onClick={() => onClose()}
                  className="bg-[#363E70] text-white py-2 w-[40%] mx-auto rounded-full mt-4"
                >
                  {onCloseText}
                </button>
              )}
            </div>
          </div>
        </div>
      </>
    );
  };


  export default Warning