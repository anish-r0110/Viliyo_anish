// Notifications.tsx component
import React, { useEffect, useState } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { Menu, Transition } from "@headlessui/react";
import { RxCrossCircled } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import { useDispatch, useSelector } from "react-redux";
import { GroupChipButton } from "@/components/buttons";
import { AppDispatch, RootState } from "@/store";
import { IChipButton } from "@/components/buttons/ChipButton";
import { useRouter } from "next/router";
import {
  deleteNotification,
  getNotifications,
  markNotificationAsRead,
} from "@/store/reducers/notification";
const Notifications: React.FC = () => {
  const router = useRouter();
  const { items, loading, error, totalUnread } = useSelector(
    (state: RootState) => state.notification
  );
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNotifications(6));
  }, []);

  const [chipButtonData, setChipButtonData] = useState<IChipButton[]>([
    { id: 1, title: "Unread", isActive: false },
    { id: 2, title: "All", isActive: true },
  ]);

  const [selectedChip, setSelectedChip] = useState<IChipButton>({
    id: 1,
    title: "All",
    isActive: true,
  });

  const onSelect = (data: IChipButton) => {
    const newData = chipButtonData.map((el) => ({
      ...el,
      isActive: el === data,
    }));
    setChipButtonData(newData);
    setSelectedChip(data);
  };

  const toggleReadStatus = async (id: string, read: boolean): Promise<void> => {
    dispatch(markNotificationAsRead({ id, read: !read }));
  };

  const dismissNotification = (id: string) => {
    dispatch(deleteNotification(id));
  };

  const getUnreadNotifications = items.filter(
    (notification) => notification.isRead === false
  );

  return (
    <div className="h-dvh">
      {items.length <= 0 && (
        <div className="flex flex-col items-center justify-center p-6 h-full">
          <p className="text-app-read text-center mb-4">
            You don't have any notifications at the moment.
          </p>
          <p className="text-app-read text-center">
            Please check back later or continue browsing.
          </p>
        </div>
      )}

      {items.length > 0 && (
        <div className="w-full h-full">
          <div>
            <div className="m-4 h-[20%] flex flex-row justify-between">
              <div className="flex w-full gap-2 justify-between">
                {totalUnread} Unread
                <GroupChipButton data={chipButtonData} onSelect={onSelect} />
              </div>
            </div>
          </div>
          <div className="flex flex-col pb-4 overflow-y-auto h-[80%]">
            {selectedChip.title === "Unread"
              ? getUnreadNotifications.map((unreadNotification) => (
                  <div
                    key={unreadNotification.id}
                    className={`notification items-center  focus:bg-purple-200 ${
                      unreadNotification.isRead
                        ? "bg-app-read"
                        : "bg-app-unread"
                    }`}
                  >
                    <div className="notification-content flex justify-between m-4">
                      <div>
                        {unreadNotification.message.title && (
                          <div className="w-auto text-xs font-bold">
                            {unreadNotification.message.title}
                            {/* <p className="font-thin italic text-xs"><span>scheduled from</span> {unreadNotification.message.title.split("scheduled from")[1]}</p> */}
                          </div>
                        )}
                      </div>

                      <div className="relative inline-block text-left">
                        <Menu>
                          <Menu.Button className="focus:outline-none">
                            <HiDotsVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                          </Menu.Button>
                          <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        toggleReadStatus(
                                          unreadNotification.id,
                                          unreadNotification.isRead
                                        )
                                      }
                                      className={`${
                                        active
                                          ? "bg-app-yellow text-gray-900"
                                          : "text-gray-700"
                                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                      <TiTick />
                                      <p className="px-2 text-base font-bold text-purple-900">
                                        {unreadNotification.isRead
                                          ? "Mark as Unread"
                                          : "Mark as Read"}
                                      </p>
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        dismissNotification(
                                          unreadNotification.id
                                        )
                                      }
                                      className={`${
                                        active
                                          ? "bg-app-yellow text-gray-900"
                                          : "text-gray-700"
                                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                      <RxCrossCircled color="purple" />
                                      <p className="px-2 font-bold text-base text-purple-900">
                                        Delete
                                      </p>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <hr className="bg-app-gray h-0.5"></hr>
                  </div>
                ))
              : items.map((notification) => (
                  <div
                    key={notification.id}
                    className={`notification items-center  focus:bg-purple-200 ${
                      notification.isRead ? "bg-app-read" : "bg-app-unread"
                    }`}
                  >
                    <div className="notification-content flex justify-between m-4">
                      <p
                        className="text-gray-800 text-xs whitespace-pre-line break-words w-auto cursor-pointer"
                        onClick={() => {
                          router.push("/task-list");
                        }}

                        // dangerouslySetInnerHTML={{
                        //   __html: notification.message.title,
                        // }}
                      >
                        {notification.message.title && (
                          <div className="w-auto text-xs font-bold">
                            {notification.message.title}
                            {/* <p className="font-thin italic text-xs"><span>scheduled from</span> {notification.message.title.split("scheduled from")[1]}</p> */}
                          </div>
                        )}
                      </p>
                      <div className="relative inline-block text-left">
                        <Menu>
                          <Menu.Button className="focus:outline-none">
                            <HiDotsVertical className="text-gray-500 hover:text-gray-700 cursor-pointer" />
                          </Menu.Button>
                          <Transition
                            as={React.Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                          >
                            <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                              <div className="py-1">
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        toggleReadStatus(
                                          notification.id,
                                          notification.isRead
                                        )
                                      }
                                      className={`${
                                        active
                                          ? "bg-app-yellow text-gray-900"
                                          : "text-gray-700"
                                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                      <TiTick />
                                      <p className="px-2 text-base font-bold text-purple-900">
                                        {notification.isRead
                                          ? "Mark as Unread"
                                          : "Mark as Read"}
                                      </p>
                                    </button>
                                  )}
                                </Menu.Item>
                                <Menu.Item>
                                  {({ active }) => (
                                    <button
                                      onClick={() =>
                                        dismissNotification(notification.id)
                                      }
                                      className={`${
                                        active
                                          ? "bg-app-yellow text-gray-900"
                                          : "text-gray-700"
                                      } group flex rounded-md items-center w-full px-2 py-2 text-sm`}
                                    >
                                      <RxCrossCircled color="purple" />
                                      <p className="px-2 font-bold text-base text-purple-900">
                                        Delete
                                      </p>
                                    </button>
                                  )}
                                </Menu.Item>
                              </div>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      </div>
                    </div>
                    <hr className="bg-app-gray h-0.5"></hr>
                  </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
