import { useRouter } from "next/router";
import { Dialog, Flex, Inset, Popover } from "@radix-ui/themes";
import CLASSNAME from "./classname";
import SIZE from "./size";
import { MdLogout, MdOutlineClosedCaption } from "react-icons/md";
import { IoMdClose } from "react-icons/io";

const LogoutControl = () => {
  const isOn = false;
  const router = useRouter();

  return (
    <>
      <div className="relative group">
        <Dialog.Root>
          <Dialog.Trigger>
            <div className={`${CLASSNAME} ${!isOn && "bg-red-600"}  `}>
              <MdLogout color="black" size={SIZE} />
            </div>
          </Dialog.Trigger>

          <Dialog.Content style={{ maxWidth: 450, padding: 0 }}>
            <div className="flex justify-end bg-app-yellow p-2">
              <Dialog.Title>
                <Dialog.Close>
                  <p className="p-1">
                    <IoMdClose />
                  </p>
                </Dialog.Close>
              </Dialog.Title>
            </div>
            <Dialog.Description size="2" mb="4">
              <div className="flex justify-center items-center font-medium text-zinc-700 p-2">
                Do you wish to exit the session?
              </div>
            </Dialog.Description>

            <Flex gap="3" mt="4" mb="4" justify="center">
              <Dialog.Close>
                <button
                  onClick={() => {
                    router.push("/");
                  }}
                  className="bg-gradient-to-br from-40% from-app-blue to-app-purple px-4 py-1 text-white rounded-2xl"
                >
                  Yes
                </button>
              </Dialog.Close>
              <Dialog.Close>
                <button className="border border-app-blue px-4 py-1  rounded-2xl font-medium text-app-blue">
                  No
                </button>
              </Dialog.Close>
            </Flex>
          </Dialog.Content>
        </Dialog.Root>
        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-md bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Exist Session
        </div>
      </div>
    </>
  );
};

export default LogoutControl;
