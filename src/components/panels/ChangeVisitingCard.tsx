import React, { useState, useEffect } from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import RadioButtons from "../buttons/RadioButtonYesNo";
import PanelFirstCard, {
  PanelSecondCard,
  PanelThirdCard,
} from "./PanelVisitingCards";
import axiosInstance from "@/config/axios";
import ApplicationService from "../../services/Application";
import { IoRadioButtonOffSharp, IoRadioButtonOn } from "react-icons/io5";
import VisitingCardCollectiveLayouts from "./VisitingCardCollectiveLayouts";
import { PrimaryLayout } from "../panels/layouts/PrimaryLayout";
import { SecondaryLayout } from "../panels/layouts/SecondaryLayout";
import { ThirdLayout } from "../panels/layouts/ThirdLayout";

const ChangeVisitingCard = ({
  handleChange,
  layout,
  data,
  isDefault,
  setDefault,
  profileImage,
}: any) => {
  const [selectedOption, setSelectedOption] = useState<"yes" | "no">("no");
  const [selectedVisitingCard, setSelectedVisitingCard] = useState();

  const handleOptionChange = (option: "yes" | "no") => {
    setSelectedOption(option);
  };

  const [selectCard, setSelectCard] = useState(0);
  const [visitingCardData, setVisitingCardData] = useState([]);
  const [profileData, setProfileData] = useState();
  const [defaultLayout, setDefaultLayout] = useState();

  const appService = new ApplicationService();

  const updateApproval = async (approval: any) => {
    const result = await axiosInstance.post("trainee/update_visiting_card", {
      approval: approval,
    });
    console.log("re", result);

    if (result.code === 200) {
      // getQueryDetails();
    }
  };
  const getVisitingCardData = async () => {
    const result = await axiosInstance.post("/trainee/get_visiting_card_List");
    console.log(
      "result",
      result.data.visitingCardList.map((data: any) => data.name)
    );
    setVisitingCardData(result.data.visitingCardList);
  };
  const getProfilePhoto = async () => {
    const profileDataResponse = await axiosInstance.get(
      "/trainee/get_trainee_profile_data"
    );
    setProfileData(profileDataResponse.data.userData);
  };

  const setDefaultVisitingCard = async (cardId: number) => {
    const response = await axiosInstance.post(
      "trainee/set_visiting_card_default",
      {
        cardId: cardId,
      }
    );
    setDefaultLayout(cardId);
    // localStorage.setItem("defaultVisitingCard", JSON.stringify(response));
  };

  const handleSelect = (cardIndex: number) => {
    setSelectCard(cardIndex);
  };

  useEffect(() => {
    getVisitingCardData();
    getProfilePhoto();
    updateApproval(selectedOption);
  }, [defaultLayout, selectedOption]);

  const layouts = [PrimaryLayout, SecondaryLayout, ThirdLayout];

  return (
    <>
      <div className="bg-gray-900">
        <div className="flex space-x-2">
          <div className="text-xl text-app-yellow py-1">
            <IoArrowBackSharp
              onClick={() => {
                handleChange(1);
              }}
            />
          </div>
          <div className="text-white">ChangeVisitingCard</div>
        </div>
        <div className="text-white text-xs px-7">
          Select a visiitng card to set as default
        </div>
      </div>
      <div className="p-2">
        <div>
          <p className="text-white text-xs pl-2">
            When requested, whould you like to share your visiting card without
            approval?
          </p>
          <div className="text-white  py-2">
            <RadioButtons
              selectedOption={selectedOption}
              onChange={handleOptionChange as (option: "yes" | "no") => void}
            />
          </div>
        </div>
        <div className=" space-y-20 h-96 overflow-y-auto">
          {visitingCardData.map((layout, index) => (
            <VisitingCardCollectiveLayouts
              isDefault={layout?.isDefault}
              layout={layouts[index % layouts.length]}
              key={index}
              setDefault={() => setDefaultVisitingCard(layout.id)}
              data={profileData}
              handleSelect={handleSelect}
              selectedVisitingCard={selectedVisitingCard}
              setSelectedVisitingCard={setSelectedVisitingCard}
              selectCard={selectCard}
            ></VisitingCardCollectiveLayouts>
          ))}
        </div>
        {/* <div className="space-y-8 space-x-2 flex flex-col h-96 overflow-y-auto overflow-x-clip ">
          <div className="relative">
            <PanelFirstCard
              data={profileData}
              visitingCardData={visitingCardData}
            />

            <div className="flex justify-end absolute top-2 right-2">
              {selectCard === 0 ? (
                <div
                  className="text-app-yellow text-xl"
                  onClick={() => handleSelect(0)}
                >
                  <IoRadioButtonOn />
                </div>
              ) : (
                <div className="text-app-yellow">
                  <IoRadioButtonOffSharp onClick={() => handleSelect(0)} />
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <PanelSecondCard
              data={profileData}
              visitingCardData={visitingCardData}
            />

            <div className="flex justify-end absolute top-2 right-2">
              {selectCard === 1 ? (
                <div
                  className="text-app-yellow text-xl"
                  onClick={() => handleSelect(1)}
                >
                  <IoRadioButtonOn />
                </div>
              ) : (
                <div className="text-app-yellow">
                  <IoRadioButtonOffSharp onClick={() => handleSelect(1)} />
                </div>
              )}
            </div>
          </div>
          <div className="relative">
            <PanelThirdCard
              data={profileData}
              visitingCardData={visitingCardData}
            />

            <div className="flex justify-end absolute top-2 right-2">
              {selectCard === 2 ? (
                <div
                  className="text-app-yellow text-xl"
                  onClick={() => handleSelect(2)}
                >
                  <IoRadioButtonOn />
                </div>
              ) : (
                <div className="text-app-yellow">
                  <IoRadioButtonOffSharp onClick={() => handleSelect(2)} />
                </div>
              )}
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
};
export default ChangeVisitingCard;
