import Icon from "@/assets/icons";
import Image from "next/image";
import { RxCross2 } from "react-icons/rx";



export const Success = ({
  heading = "TEST",
  content = "TEST",
  buttonText = "text",
  onOkClick,
  onClose,
}: {
  heading: string;
  content: string;
  buttonText: string;
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
          <div className="bg-app-green shadow-xl rounded-full mx-auto mobile:-mt-[25%] tablet:-mt-[20%] laptop:-mt-[20%] desktop:-mt-[15%] largescreen:-mt-[12%]">
            <Image
              src={Icon.successTick}
              alt={"About Vtt Icon"}
              width={90}
              className=""
            ></Image>
          </div>
          <div className="">
            <RxCross2
              size={25}
              className="absolute top-5 right-5 cursor-pointer"
              onClick={() => onClose()}
            />
          </div>
          <h2 className="mt-[20px] text-center text-2xl font-semibold break-words">
            {heading}
          </h2>
          {content && <p className="break-words">{content}</p>}

          <button
            onClick={() => onOkClick()}
            className="bg-[#363E70] text-white py-2 w-[40%] mx-auto rounded-xl mt-4"
          >
            {buttonText}
          </button>
        </div>
      </div>
    </>
  );
};


export default Success