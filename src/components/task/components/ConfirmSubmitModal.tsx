// Modal.tsx

import React from "react";
import { Flex, Button, Dialog } from "@radix-ui/themes";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  text: string;
  heading: string;
  showSubmit: boolean;
}

export const ConfirmSubmitModal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  heading,
  text,
  showSubmit,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center backdrop-brightness-50">
      <Dialog.Root open={isOpen}>
        <Dialog.Content
          style={{
            maxWidth: 450,
            alignContent: "center",
            textAlign: "center",
          }}
        >
          <Flex justify="center">
            <Dialog.Title color="purple">{heading}</Dialog.Title>
          </Flex>
          <Flex>
            <Dialog.Description>{text}</Dialog.Description>
          </Flex>

          <Flex gap="3" mt="4" justify="between">
            {showSubmit && (
              <Button
                color="purple"
                variant="solid"
                size="4"
                onClick={onSubmit}
              >
                Submit
              </Button>
            )}
            <Button color="purple" variant="outline" size="4" onClick={onClose}>
              Close
            </Button>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
};
