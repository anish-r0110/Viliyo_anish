import { Flex, Button, Dialog } from "@radix-ui/themes";
import { useRouter } from "next/router";
interface SaveAsDraftModalProps {
  buttonName: string;
  handleClickOk?: Function;
  dialogContent: string;
}
const SaveAsDraftModal = ({
  buttonName,
  handleClickOk,
  dialogContent,
}: SaveAsDraftModalProps) => {
  const router = useRouter();
  const onClickFunctionCondition = () => {
    if (handleClickOk) {
      handleClickOk();
    } else router.back();
  };
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button color="purple" variant="classic" size="3">
          {buttonName}
        </Button>
      </Dialog.Trigger>

      <Dialog.Content
        style={{ maxWidth: 400, alignContent: "center", textAlign: "center" }}
      >
        <Flex justify="center" mx="9">
          <Dialog.Title>{dialogContent}</Dialog.Title>
        </Flex>

        <Flex gap="3" mt="4" justify="center">
          <Dialog.Close>
            <Button
              color="purple"
              variant="solid"
              size="4"
              //onClick={}
              onClick={onClickFunctionCondition}
            >
              Ok
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default SaveAsDraftModal;
