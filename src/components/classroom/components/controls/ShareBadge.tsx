import React, { useState, useEffect } from "react";

import { Flex, Button, Dialog } from "@radix-ui/themes";
import axiosInstance from "@/config/axios";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

const ShareBadge = ({ badge }: any) => {
  const [sharedBadge, setSharedBadge] = useState();
  const router = useRouter();
  const [checkedState, setCheckedState] = useState();
  const  { live:{ settings:{ batch} } , auth } = useSelector(( state:RootState) => state )

  const handleCheckboxChange = (trainee: string) => {
    setCheckedState((prevState: any) => ({
      ...prevState,
      [trainee]: !prevState[trainee],
    }));
  };

  //   const currentSessionId = localStorage.getItem("sessionId");

  const saveBadge = async (currentSessionId: any) => {
    const result = await axiosInstance.post("trainee/save_badges", {
      achievementName: "Exemplary Leader",
      sessionId: currentSessionId,
      programId: 5262,
      receiverEmail: [
        "yash.amlani.c@viliyo.com",
        "geetha.nagarajan.c@viliyo.com",
      ],
      senderName: "Nitin Singh",
    });
    setSharedBadge(result.data.arr);
    console.log("saveBadgeresult", result);
  };



  useEffect(() => {
  
  }, []);

  return (
    <>
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Share</Button>
        </Dialog.Trigger>

        <Dialog.Content style={{ maxWidth: 400, padding: 0 }}>
          <Flex direction="column">
            <div className="bg-app-yellow p-4 font-bold">
              Share {badge} badge with -
            </div>
            <div>
              { batch?.participants?.filter((el:any) => el.id !== auth.user?.id ).map((el:any) => <span key={el.name}>{el.name}</span>)}

            </div>
            
          </Flex>

          <Flex gap="3" mt="4" justify="end" style={{ padding: 12 }}>
            <Dialog.Close>
              <Button color="gray">Close</Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button color="purple" onClick={saveBadge}>
                Share
              </Button>
            </Dialog.Close>
          </Flex>
        </Dialog.Content>
      </Dialog.Root>
    </>
  );
};
export default ShareBadge;
