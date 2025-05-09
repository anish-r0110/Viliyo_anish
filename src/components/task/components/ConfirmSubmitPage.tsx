import { Button } from "@radix-ui/themes";
interface ConfirmSubmitPageProps {
  onSubmit: Function;
  setStep: Function;
  prevStep: Number;
  reviewResponse?:boolean;
}

export const ConfirmSubmitPage = ({
  onSubmit,
  setStep,
  prevStep,
  reviewResponse = true,
}: ConfirmSubmitPageProps) => {
  return (
    <div>
      <div className="w-full border-b-4 px-[2%] pb-5">
        <p>Are you sure you want to submit your responses?</p>
      </div>
      <div className="flex gap-[5%] pt-5 px-[2%]">
        <Button
          color="purple"
          variant="solid"
          size="3"
          onClick={() => onSubmit()}
        >
          Yes
        </Button>

        {reviewResponse && (
          <Button
            color="purple"
            variant="outline"
            size="3"
            onClick={() => setStep(prevStep)}
          >
            No, Preview Responses
          </Button>
        )}
      </div>
    </div>
  );
};
