import { useEffect, useState } from "react";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import AttendedSessionList from "./AttendedSessionList";
import axiosInstance from "@/config/axios";
import { Text } from "@radix-ui/themes";

const CollectedVisitingCardScreen = () => {

  const [collectedCardList, setCollectedCardList] = useState([]);

  const getCollectedVisitingCardListData = async () => {
    const result = await axiosInstance.get(
      "trainee/get_collected_visiting_card_list"
    );
   
      setCollectedCardList(result.data.collectedVisitingCardList);

  
  };

  useEffect(() => {
    getCollectedVisitingCardListData();
  }, []);


  return (
    <div className="mobile:space-x-0.5">
        <Text className="text-xl mb-1 font-bold text-app-blue">
          Sessions Attended
        </Text>
        <div className="mobile:w-full  mobile:-ml-2 tablet:w-screen">
          <hr className="bg-app-blue h-[1px]"></hr>
        </div>

        {collectedCardList?.map((data:any) => (
          <AttendedSessionList
            key={data.id}
            name={data.sessionName}
            date={data.createdAt.slice(0, 10)}
            count={data.numberOfCollectedCards}
            arrow={<MdOutlineArrowForwardIos />}
            sessionList={data.data}
            profileImage={data.profilePhoto}
          />
        ))}
    </div>
  );
};
export default CollectedVisitingCardScreen;
