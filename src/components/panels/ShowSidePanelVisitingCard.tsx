import React, { useState, useEffect } from "react";
import PanelFirstCard, {
  PanelSecondCard,
  PanelThirdCard,
} from "./PanelVisitingCards";
import axiosInstance from "@/config/axios";
import ApplicationService from "../../services/Application";
import { BsPersonVcard } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { RxCrossCircled } from "react-icons/rx";
import { Popover } from "@radix-ui/themes";

const ReceivedVisitingCardSidePanel = ({
  data,
  defaultVisitingCard,
  profilePhoto,
}: any) => {
  return (
    <>
      {data.map((data) => (
        <div className="bg-purple-200 rounded-lg px-2  flex justify-between">
          <div className="text-app-blue text-xs font-medium px-1  py-2 truncate flex sapce-x-2 ">
            <BsPersonVcard />
            <p className="px-2"> {data.name}</p>
          </div>
          <div className="text-app-blue  pl-10">
            <Popover.Root>
              <Popover.Trigger>
                <span className="py-1 pl-2">
                  <GoEye />
                </span>
              </Popover.Trigger>

              <Popover.Content>
                <Popover.Close>
                  <div>
                    <RxCrossCircled />
                  </div>
                </Popover.Close>

                <div className="w-96 h-40 mt-4">
                  {defaultVisitingCard?.layout === "LAYOUT1" && (
                    <PanelFirstCard data={data} profilePhoto={profilePhoto} />
                  )}
                  {defaultVisitingCard?.layout === "LAYOUT2" && (
                    <PanelSecondCard data={data} profilePhoto={profilePhoto} />
                  )}
                  {defaultVisitingCard?.layout === "LAYOUT3" && (
                    <PanelThirdCard data={data} profilePhoto={profilePhoto} />
                  )}
                </div>
              </Popover.Content>
            </Popover.Root>
          </div>
        </div>
      ))}
    </>
  );
};
const ShowSidePanelVisitingCard = ({ handleChange }: any) => {
  const [visitingCardData, setVisitingCardData] = useState([]);
  const [profileData, setProfileData] = useState();
  const [collectedVisitingCardlist, setCollectedVisitingCardlist] = useState();
  const [currentSession, setCurrentSession] = useState();
  const [defaultVisitingCard, setDefaultVisitingCard] = useState();
  const [consoleDetails, setConsoleDetails] = useState();

  const appService = new ApplicationService();

  const getVisitingCardData = async () => {
    const result = await axiosInstance.post("/trainee/get_visiting_card_List");

    setVisitingCardData(result.data.visitingCardList);
    setDefaultVisitingCard(
      result.data.visitingCardList.find((obj) => obj.isDefault === true)
    );
  };
  const getCollectedVisitingCardList = async () => {
    const collectedVisitingList = await axiosInstance.get(
      "trainee/get_collected_visiting_card_list"
    );
    setCollectedVisitingCardlist(collectedVisitingList);
  };

  const getProfileData = async () => {
    const profileDataResponse = await axiosInstance.get(
      "/trainee/get_trainee_profile_data"
    );
    setProfileData(profileDataResponse.data.userData);
  };

  useEffect(() => {
    getCollectedVisitingCardList();
    getVisitingCardData();
    getProfileData();
    setConsoleDetails(JSON.parse(localStorage.getItem("consoleDetails")));
    setCurrentSession(
      collectedVisitingCardlist?.data?.collectedVisitingCardList.find(
        (data) => data.sessionName === consoleDetails?.session?.session_name
      )
    );
  }, [currentSession]);

  return (
    <div>
      <div className="bg-zinc-800 rounded-tl-2xl text-white p-4 font-medium">
        Visiting Cards
      </div>
      <div>
        <div className="text-white py-1 px-3">
          <p className="text-sm"> Your Visiting Card</p>
        </div>
        <div className="px-2">
          {defaultVisitingCard?.layout === "LAYOUT1" && (
            <PanelFirstCard data={profileData} />
          )}
          {defaultVisitingCard?.layout === "LAYOUT2" && (
            <PanelSecondCard data={profileData} />
          )}
          {defaultVisitingCard?.layout === "LAYOUT3" && (
            <PanelThirdCard data={profileData} />
          )}
        </div>
      </div>
      <div className="mt-10">
        <div className="flex justify-center space-x-1 ">
          <button
            className="text-app-blue bg-app-yellow shadow-xl rounded-2xl px-1 py-1 text-xs font-medium"
            onClick={() => handleChange(2)}
          >
            Share Visiting Card
          </button>
          <button
            className="text-app-yellow border border-app-yellow shadow-xl rounded-2xl px-2 py-1 text-xs font-medium"
            onClick={() => handleChange(3)}
          >
            Change Card
          </button>
        </div>
      </div>
      <div className="my-2 w-full">
        <hr className="bg-app-gray h-0.5"></hr>
      </div>
      <div className="text-white flex justify-center">
        <p>Visiting Cards Received</p>
        <span>({currentSession?.numberOfCollectedCards})</span>
      </div>
      <div className="px-4 space-y-2 overflow-y-auto h-52">
        {collectedVisitingCardlist?.data?.collectedVisitingCardList?.map(
          (data) =>
            data.sessionName === consoleDetails?.session?.session_name && (
              <ReceivedVisitingCardSidePanel
                data={JSON.parse(data.data)}
                profilePhoto={data.profilePhoto}
                defaultVisitingCard={defaultVisitingCard}
              />
            )
        )}
      </div>
    </div>
  );
};
export default ShowSidePanelVisitingCard;
