import Image from "next/image";
import React, { useState } from "react";
import p18 from "../../../../../assets/images/p18.jpg";
import p13 from "../../../../../assets/images/p13.jpg";
import p14 from "../../../../../assets/images/p14.jpg";
import { IoMicOutline } from "react-icons/io5";
import { IoMicOffOutline } from "react-icons/io5";
import { TiDocumentText } from "react-icons/ti";
import { Dialog } from "@radix-ui/themes";
import { RxCross2 } from "react-icons/rx";

const RolePlayerView = () => {
  const [micOn, setMicOn] = useState(false);
  const [rolePlayInProgress, setRolePlayInProgress] = useState(true);

  return (
    <>
      <div className="-top-10">
        Role Player's briefing in progress{" "}
        {/* <span className="bg-green-600 rounded-full px-1 border border-white"></span> */}
      </div>
      <div className="grid grid-cols-2 ">
        {rolePlayInProgress ? (
          <div className="grid grid-rows-2 col-span-1">
            <div className="-space-y-20 w-full">
              <div className="flex justify-end">
                <div className="bg-gray-800 opacity-50 rounded-xl text-xs text-white py-4 w-40 ">
                  <div className="px-2">
                    <p>TraineeName</p>
                    <p>Role: RoleName</p>
                  </div>
                </div>
              </div>
              <div className="border border-black -space-y-4">
                <Image src={p18} alt="person"></Image>
                <div className="text-white  px-2 flex justify-end">
                  {micOn ? (
                    <IoMicOutline
                      onClick={() => setMicOn(!micOn)}
                      color="black"
                    />
                  ) : (
                    <IoMicOffOutline
                      onClick={() => setMicOn(!micOn)}
                      color="black"
                    />
                  )}
                </div>
              </div>
            </div>
            <div className="border border-black -space-y-8 ">
              <Image src={p18} alt="person"></Image>
              <div className="text-white  px-2 flex justify-end">
                {micOn ? (
                  <IoMicOutline
                    onClick={() => setMicOn(!micOn)}
                    color="black"
                  />
                ) : (
                  <IoMicOffOutline
                    onClick={() => setMicOn(!micOn)}
                    color="black"
                  />
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="-space-y-20 w-full">
            <div className="flex justify-end">
              <div className="bg-gray-800 opacity-50 rounded-xl text-xs text-white py-4 w-40 ">
                <div className="px-2">
                  <p>TraineeName</p>
                  <p>Role: RoleName</p>
                </div>
              </div>
            </div>
            <div className="border border-black -space-y-4">
              <Image src={p14} alt="person"></Image>
              <div className="text-white  px-2 flex justify-end">
                {micOn ? (
                  <IoMicOutline onClick={() => setMicOn(!micOn)} color="gray" />
                ) : (
                  <IoMicOffOutline
                    onClick={() => setMicOn(!micOn)}
                    color="gray"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <div className="-space-y-20 col-span-1">
          <div className="bg-gray-800 opacity-50 rounded-xl text-xs text-white py-4  w-40">
            <div className="px-2">
              <p>TraineeName</p>
              <p>Role: RoleName</p>
            </div>
          </div>
          <div className="border border-black -space-y-4 h-full">
            <Image src={p14} alt="person"></Image>
            <div className="text-white  px-2 flex justify-end ">
              {micOn ? (
                <IoMicOutline onClick={() => setMicOn(!micOn)} color="black" />
              ) : (
                <IoMicOffOutline
                  onClick={() => setMicOn(!micOn)}
                  color="black"
                />
              )}
            </div>
          </div>
          <div className="flex justify-center pt-14 text-white">
            <Dialog.Root>
              <Dialog.Trigger>
                <TiDocumentText />
              </Dialog.Trigger>
              <Dialog.Content
                style={{ width: 360, padding: 0 }}
                className="p-0"
              >
                <div className="bg-blue-50 rounded-xl w-full h-full">
                  <div className="flex justify-between bg-app-yellow p-4">
                    <div>
                      <p className="text-black font-medium">Role Name Brief</p>
                    </div>
                    <div>
                      <Dialog.Close>
                        <RxCross2 />
                      </Dialog.Close>
                    </div>
                  </div>
                  <p className="p-4 h-96 overflow-y-auto">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </p>
                </div>
              </Dialog.Content>
            </Dialog.Root>
          </div>
        </div>
      </div>
    </>
  );
};

export default RolePlayerView;
