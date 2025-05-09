import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useRouter } from "next/router";
import { Flex, Button, Dialog } from "@radix-ui/themes";
import axiosInstance from "@/config/axios";
import {
  CollectedCardFirstOutline,
  CollectedCardSecondOutline,
  CollectedCardThirdOutline,
} from "./CollectedCardsOutline";
import Image from "next/image";
import { saveAs } from "file-saver";
import SecondaryCardImage from "../../assets/images/secondaryCardImage.png";
import thirdCardImage from "../../assets/images/thirdCardImage.png";
import { Checkbox } from "@radix-ui/themes";
import { produce } from "immer";

const CollectedCardList = ({
  name,
  count,
  date,
  sessionList,
  profileImage,
}: any) => {
  const router = useRouter();
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [cards, setCards] = useState(sessionList);

  const getCollectedVisitingCards = async () => {
    const res = await axiosInstance.get(
      "trainee/get_collected_visiting_card_list"
    );
  };

  const handleCardClick = (id: string) => {
    console.log("handleCardClick", id);
    if (selectedCards.includes(id)) {
      // If the card is already selected, remove it
      setSelectedCards(selectedCards.filter((cardId) => cardId !== id));
    } else {
      // If the card is not selected, add it
      setSelectedCards([...selectedCards, id]);
    }
  };

  const handleDeleteButtonClick = async () => {
    try {
      const result: { code: number } = await axiosInstance.post(
        "trainee/delete_collected_visiting_card",
        { id: 16, ids: selectedCards }
      );

      if (result.code === 200) {
        getCollectedVisitingCards();
        setCards(
          produce((cards: any) => {
            return cards.filter(
              (card: any) => !selectedCards.includes(card.id)
            );
          })
        );
        setSelectedCards([]);
      }
      // Optionally, you can fetch updated data or perform other actions after deletion
    } catch (error) {
      console.error("Error deleting cards", error);
    }
  };

  const handleSaveButtonClick = () => {
    // Create a CSV string from selected cards and initiate download
    const csvContent =
      "name,email,phone,linkedin,website,designation\n" +
      sessionList
        .filter((data: any) => selectedCards.includes(data.id))
        .map(
          (data: any) =>
            `${data.name},${data.email},${data.phone},${data.linkedIn},${data.website},${data.designation}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8" });
    saveAs(blob, "selected_cards.csv");
  };

  return (
    <>
      <div className="grid grid-cols-12 bg-white shadow-lg p-4">
        <div className="col-span-1 py-2 text-xl">
          <AiOutlineArrowLeft onClick={() => router.back()} />
        </div>
        <div className="col-span-2 py-2">
          Session:<span>{name}</span>
        </div>
        <div className="col-span-2 py-2">
          Date:<span>{date}</span>
        </div>
        <div className="col-span-3 py-2">
          Visiting Card Collected:<span>{count}</span>
        </div>
        <div className="space-x-1 col-span-4 ">
          <button
            className="border-2 p-2 rounded-2xl text-xs"
            onClick={handleSaveButtonClick}
          >
            Save Selected ({selectedCards.length})
          </button>

          <button
            className="border-2 p-2 rounded-2xl text-xs"
            onClick={handleDeleteButtonClick}
            disabled={selectedCards.length === 0}
          >
            Delete Selected ({selectedCards.length})
          </button>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-2 grid-rows-3 w-full">
        {cards.map((data: any) => (
          <div
            key={data.id}
            onClick={() => handleCardClick(data.id)}
            className={`relative rounded  cursor-pointer ${
              selectedCards.includes(data.id) && "border-blue-500"
            }`}
          >
            {data.layout === "LAYOUT1" ? (
              <div className="col-span-1">
                {/* <div
                  onClick={() => handleCardClick(data.id)} // Assuming each card has a unique identifier like 'id'
                  className={`cursor-pointer ${
                    selectedCards.includes(data.id) && "border-blue-500"
                  }`}
                > */}
                <CollectedCardFirstOutline
                  name={data.name}
                  email={data.email}
                  phone={data.phone}
                  linkedin={data.linkedIn}
                  website={data.website}
                  designation={data.designation}
                  profileImage={profileImage}
                />
                {/* <input
                    type="checkbox"
                    checked={selectedCards.includes(data.id)}
                    onChange={() => handleCardClick(data.id)}
                  />
                </div> */}
              </div>
            ) : data.layout === "LAYOUT2" ? (
              <div className="col-span-1">
                {/* <div
                  onClick={() => handleCardClick(data.id)} // Assuming each card has a unique identifier like 'id'
                  className={`  cursor-pointer ${
                    selectedCards.includes(data.id) && "border-blue-500"
                  }`}
                > */}
                <CollectedCardSecondOutline
                  name={data.name}
                  email={data.email}
                  phone={data.phone}
                  linkedin={data.linkedIn}
                  website={data.website}
                  designation={data.designation}
                  image={
                    <Image
                      src={profileImage}
                      alt="collectedCardImage"
                      className="rounded-r-lg h-52"
                    />
                  }
                />
                {/* <input
                    type="checkbox"
                    checked={selectedCards.includes(data.id)}
                    onChange={() => handleCardClick(data.id)}
                  />
                </div> */}
              </div>
            ) : (
              <div className="col-span-1">
                {/* <div
                  onClick={() => handleCardClick(data.id)} // Assuming each card has a unique identifier like 'id'
                  className={`  cursor-pointer ${
                    selectedCards.includes(data.id) && "border-blue-500"
                  }`}
                > */}
                <CollectedCardThirdOutline
                  name={data.name}
                  email={data.email}
                  phone={data.phone}
                  linkedin={data.linkedIn}
                  website={data.website}
                  designation={data.designation}
                  image={
                    <Image
                      src={profileImage}
                      alt="collectedCardImage"
                      className="rounded-r-lg h-52"
                      width={90}
                      height={90}
                    />
                  }
                />
                {/* <input
                    type="checkbox"
                    checked={selectedCards.includes(data.id)}
                    onChange={() => handleCardClick(data.id)}
                  />
                </div> */}
              </div>
            )}

            {selectedCards.includes(data.id) ? (
              <Checkbox
                onChange={() => handleCardClick(data.id)}
                className="absolute right-5 top-5"
                size="3"
                defaultChecked
              />
            ) : (
              <Checkbox
                onChange={() => handleCardClick(data.id)}
                className="absolute right-5 top-5"
                size="3"
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default CollectedCardList;
