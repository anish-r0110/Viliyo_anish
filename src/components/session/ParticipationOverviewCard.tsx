"use client";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import Icon from "../../assets/icons";
import Exchanged from "../badges/Exchanged";
import axiosInstance from "@/config/axios";
import { RootState } from "@/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const ViewDetailsPopoverButton = ({ sessionId }: any) => {
  return (
    <div className="flex flex-col items-center text-purple-900 justify-self-start">
      <Dialog.Root>
        <Dialog.Trigger
            className="outline-1 border-app-gray-medium rounded-full border p-2 text-app-blue text-[9px]">
            View Details
          </Dialog.Trigger>          

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50"/>
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-app-gray-light rounded-xl p-2 shadow-md">
             <Exchanged sessionId={sessionId} />
          </Dialog.Content>
        </Dialog.Portal>

      </Dialog.Root>
    </div>
  );
};

const ParticipationOverviewCard = ({ sessionId }: any) => {
  const { user } = useSelector(( state:RootState) => state.auth)
  const [recievedBadesCount, setReceivedBadesCount] = useState(0);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/trainee/get_badges", {
          email: user?.email,
          sessionMapId: sessionId,
        });
        setReceivedBadesCount(response.data.getBadge.length);
        console.log(
          "🚀 ~ file: ParticipationOverviewCard.tsx:47 ~ fetchData ~ recievedBadesCount:",
          recievedBadesCount
        );
      } catch (error) {
        console.error("Error fetching badges:", error);
      }
    };

    fetchData();
  }, [sessionId, user?.email]);

  return (
    <div className="h-24 bg-gradient-to-br from-app-blue from-30% to-app-purple rounded-xl shadow-lg text-base w-auto -mb-1">
      <div className="grid grid-cols-2 justify-center items-center text-center">
        <div className="flex flex-col items-center p-4 text-yellow-500 font-normal">
          <Image src={Icon.smile} alt="pic" width={24} height={24} />
          <p className="text-xs">Your Reactions</p>
        </div>
        <div>
          <p className="text-2xl text-center font-semibold p-4 text-white">
            {0}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center text-center bg-app-yellow rounded-xl h-auto">
        <div className="flex flex-col p-4 text-app-blue font-normal items-center text-center justify-center">
          <Image src={Icon.badge} alt="pic2" width={24} height={24} />
          <p className="text-[10px] text-purple-900 font-normal">
            Badges Exchanged
          </p>
        </div>

        <div className="h-20">
          <div className="flex flex-col items-center text-purple-900 justify-center h-auto">
            <p className="text-[9px] -mb-2">
              <span className="px-2">Received</span>
              <span className="px-2">Shared</span>
            </p>
            <p className=" text-app-gray-medium mt-0">
              <span className="px-1 text-lg">{recievedBadesCount}</span>
              <span className="text-lg">/</span>
              <span className="px-1 text-xl">{0}</span>
            </p>
          </div>
          <div className="justify-center">
            <ViewDetailsPopoverButton sessionId={sessionId} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParticipationOverviewCard;
