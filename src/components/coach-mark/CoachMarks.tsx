import CoachMark from "@/interfaces/CoachMark";
import React, { useState, useEffect, useRef } from "react";

interface CoachMarksProps {
  marks: CoachMark[];
}

interface ScreenPosition {
  top: number;
  left: number;
  right: number;
  width: number;
}

const CoachMarks: React.FC<CoachMarksProps> = ({ marks }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const coachMarkRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<ScreenPosition>({
    top: 0,
    left: 0,
    width: 0,
    right: 0,
  });

  //   const hasCoachMarksShownBefore = localStorage.getItem("hasCoachMarksShown");

  //   useEffect(() => {
  //     if (hasCoachMarksShownBefore) {
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }
  //   }, []);

  const calculatePosition = () => {
    if (marks[currentIndex]) {
      let targetElement = document.getElementById(marks[currentIndex].targetId);
      if (targetElement) {
        const targetRect = targetElement.getBoundingClientRect();
        if (marks[currentIndex].headerAlignmentType === "top") {
          setPosition({
            top: targetRect.top + 80,
            left:
              targetRect.left +
              targetRect.width / 2 -
              coachMarkRef.current?.clientWidth / 2,
            width: targetRect.width,
            right: 0,
          });
        }
        if (marks[currentIndex].headerAlignmentType === "right") {
          setPosition({
            top: targetRect.top,
            left: 0,
            right:
              targetRect.top +
              targetRect.width -
              coachMarkRef.current?.clientWidth / 2,
            width: targetRect.width,
          });
        }
      }
    }
  };

  useEffect(() => {
    calculatePosition();
  }, [currentIndex, marks]);

  const nextMark = () => {
    if (currentIndex < marks.length - 1) {
      setCurrentIndex((prevIndex) => prevIndex + 1);
    }
  };

  const prevMark = () => {
    if (currentIndex > 0) {
    }
    setCurrentIndex((prevIndex) => prevIndex - 1);
  };

  const closeCoachMarks = () => {
    setIsVisible(false);
    localStorage.setItem("hasCoachMarksShown", "true");
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div className="h-screen w-screen fixed top-0 left-0 ">
      {marks.length > 0 ? (
        <div className="relative">
          {/* Background with less opacity */}
          <div
            className="bg-gray-800  w-scren h-screen bg-opacity-50 z-50 absolute inset-0 pointer-events-none"
            onClick={closeCoachMarks} // Close coach marks on background click
          ></div>

          <div
            className={
              marks[currentIndex].headerAlignmentType === "top"
                ? "flex flex-col z-50 relative w-1/4"
                : "flex flex-row-reverse z-50 gap-[2%] absolute w-1/3"
            }
            style={
              marks[currentIndex].headerAlignmentType === "top"
                ? {
                    top: position.top, // Adjust vertical position to point to the target
                    left: position.left, // Adjust horizontal position to point to the target
                  }
                : {
                    top: position.top, // Adjust vertical position to point to the target
                    right: position.right + position.width / 2, // Adjust horizontal position to point to the target
                  }
            }
            ref={coachMarkRef}
          >
            <div
              className={
                marks[currentIndex].headerAlignmentType === "top"
                  ? "absolute left-[50%] w-5 h-10 -mt-3 -z-50 rounded-sm rotate-45 bg-app-yellow"
                  : "absolute top-[50%] w-5 h-10 -mt-3 -z-50 rounded-sm rotate-45 bg-app-yellow"
              }
            ></div>

            <div className="my-auto mx-auto font-bold w-fit px-[10%] py-[3%] bg-app-yellow rounded-2xl text-black text-center">
              {marks[currentIndex].heading}
            </div>
            <div className="bg-white mt-3 p-5 rounded-xl">
              <div className="p-6">{marks[currentIndex].content}</div>
              <div className="flex justify-between mt-4">
                <button
                  className="px-12 py-2 text-app-blue bg-app-yellow rounded"
                  onClick={nextMark}
                  hidden={currentIndex === marks.length - 1}
                >
                  Next
                </button>
                <button
                  className="px-4 py-2 ml-2 text-black bg-transparent rounded"
                  onClick={closeCoachMarks}
                >
                  {currentIndex === marks.length - 1 ? "Finish" : "Skip"}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CoachMarks;
