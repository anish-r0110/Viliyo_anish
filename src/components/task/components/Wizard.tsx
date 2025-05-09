import React, { useState } from "react";
import { Text } from "@radix-ui/themes";

interface WizardProps {
  heading?: string;
  steps: React.ReactNode[]; // Array of step components
  handleSubmit: Function;
  finishButtonText?: string;
}

const Wizard = ({
  heading = "Questions",
  steps,
  handleSubmit,
  finishButtonText = "Submit",
}: WizardProps) => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const totalSteps = steps?.length;

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prevStep) => prevStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prevStep) => prevStep - 1);
    }
  };

  return (
    <div className="flex justify-center flex-col">
      <Text className="font-bold text-app-blue mb-2">
        {currentStep + 1} out of {totalSteps} {heading}
      </Text>
      <div className="border-b-2 border-app-blue mb-2"></div>
      <div className="my-4">{steps[currentStep]}</div>
      <div className="border-t-[0.5px] my-2 border-app-blue"></div>
      <div className="flex my-4 justify-between space-x-3 mobile:justify-between ">
        <button
          className={
            currentStep != 0
              ? "btn-outline disabled:cursor-not-allowed disabled:bg-opacity-10 disabled:bg-black"
              : "btn-outline disabled:cursor-not-allowed disabled:bg-opacity-10 disabled:bg-black hidden"
          }
          onClick={handlePrevious}
          hidden={currentStep === 0}
        >
          Back
        </button>

        {currentStep < totalSteps - 1 && (
          <button
            className="btn-primary bg-gradient-to-br from-purple-950 to-purple-500 disabled:cursor-not-allowed "
            onClick={() => handleNext()}
            disabled={currentStep === totalSteps - 1}
          >
            Next
          </button>
        )}

        {currentStep === totalSteps - 1 && (
          <button
            className="btn-primary bg-gradient-to-br from-purple-950 to-purple-500"
            onClick={() => handleSubmit()}
            // disabled={currentStep === totalSteps - 1}
          >
            {finishButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default Wizard;
