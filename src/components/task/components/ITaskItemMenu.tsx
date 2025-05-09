"use client";
import { useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { DropdownMenu, Flex, IconButton, Text } from "@radix-ui/themes";
import {
  BsAlarmFill,
  BsEnvelopeFill,
  BsEnvelopeOpenFill,
} from "react-icons/bs";

interface ITaskItemMenu {
  onUnread: () => void;
  setRead: boolean;
}

export function TaskItemMenu({ onUnread, setRead }: ITaskItemMenu) {
  const [isRead, setIsRead] = useState(setRead);

  const handleToggleRead = () => {
    setIsRead((prevIsRead) => !prevIsRead);
    onUnread();
  };

  return (
    <div className="absolute top-0 right-3">
      <DropdownMenu.Root>
        <DropdownMenu.Trigger className="cursor-pointer">
          <IconButton
            className="hover:bg-transparent focus:bg-transparent focus:outline-none"
            color="violet"
            variant="ghost"
          >
            <HiDotsVertical
              className="ml-2 -mr-1 h-6 w-6 mt-2 text-[#5F488A] hover:text-black"
              aria-hidden="true"
            />
          </IconButton>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Item onClick={handleToggleRead}>
            <Flex align="center" gap="3">
              {isRead ? (
                <BsEnvelopeOpenFill></BsEnvelopeOpenFill>
              ) : (
                <BsEnvelopeFill></BsEnvelopeFill>
              )}
              <Text> {isRead ? "Mark as Read" : "Mark as Unread"}</Text>
            </Flex>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Flex align="center" gap="3">
              <BsAlarmFill></BsAlarmFill>
              <Text>Set Reminder</Text>
            </Flex>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
}
