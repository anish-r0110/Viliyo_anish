import { Flex, Button, Dialog } from "@radix-ui/themes";
import { useRouter } from "next/router";

interface SubmitModalProps {
  buttonName: string;
  handleClickReview?: Function;
  handleClickSubmit?: Function;
  dialogContent: string;
  dialogDescription: string;
  reviewButtonName: string;
  submitButtonName: string;
  //   nextStep: Function;
}

const SubmitModal = ({
  buttonName,
  handleClickReview,
  handleClickSubmit,
  dialogDescription,
  dialogContent,
  reviewButtonName,
  submitButtonName,
}: //   nextStep,
SubmitModalProps) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="purple" variant="classic" size="4">
          {buttonName}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        style={{
          maxWidth: 450,
          alignContent: "center",
          textAlign: "center",
        }}
      >
        <Flex justify="center">
          <Dialog.Title color="purple">{dialogContent}</Dialog.Title>
        </Flex>
        <Flex>
          <Dialog.Description>{dialogDescription}</Dialog.Description>
        </Flex>

        <Flex gap="3" mt="4" justify="between">
          <Dialog.Close>
            <Button
              color="purple"
              variant="outline"
              size="4"
              onClick={() => {
                handleClickReview();
                // nextStep();
              }}
            >
              {reviewButtonName}
            </Button>
          </Dialog.Close>
          <Dialog.Trigger>
            <Button
              color="purple"
              variant="solid"
              size="4"
              onClick={handleClickSubmit}
              // onClick={() => {
              //   handleSubmit(task?.id, task);
              //   setStep(Step.Result);
              // }}
            >
              {submitButtonName}
            </Button>
          </Dialog.Trigger>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SubmitModal;
