import { PrimaryLayout } from "@/components/visiting-card/layouts/PrimaryLayout";
import { SecondaryLayout } from "@/components/visiting-card/layouts/SecondaryLayout";
import { ThirdLayout } from "@/components/visiting-card/layouts/ThirdLayout";
import axiosInstance from "@/config/axios";
import { RootState } from "@/store";
import { Box } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import EditFormButton from "./components/EditFormButton";
import EditableVisitingCard from "./EditableVisitingCard";








const setDefault = async ( cardId:number ) => {
  return await axiosInstance.post(
    "trainee/set_visiting_card_default", { cardId }
  );
}




const VistingCardPanel = () => {

  const [visitingCardData, setVisitingCardData] = useState([]);
  const layouts = [ PrimaryLayout, SecondaryLayout, ThirdLayout ];
  const auth = useSelector( (state:RootState) => state.auth.user)
  


  useEffect(() => {
    getVisitingCardData();
  }, []);






  const setDefaultCard = async ( cardId: number) => {

    try{

      const response:any = await setDefault( cardId );
      setVisitingCardData( response.data.visitingCardList );
    }
    catch( error ){
      console.error('Error while setting the Default Card', error )
      throw new Error('Unable to set the default card')
    }
   
  };

  const getVisitingCardData = async () => {
    const result = await axiosInstance.post("/trainee/get_visiting_card_List");
    setVisitingCardData(result.data.visitingCardList);
  };




  return (
    <div className="min-h-screen  w-full divide-y divide-black mobile:w-11/12  mobile:px-0 mobile:space-x-4 ">
      <div className=" grid grid-cols-5 ">
        <h1 className="col-span-4 text-base font-bold text-app-blue mobile:text-xs mobile:w-11/12 mobile:mx-4">
          Set as default one of the Visiting Card you&apos;d like to share
          during Networing. You can also customize the visiting card.
        </h1>

        <EditFormButton />
       
      </div>
       <Box>
       {visitingCardData.map((layout:any, index) => { 
          
          return(
          <EditableVisitingCard
            isDefault={layout.isDefault}
            layout={layouts[index % layouts.length]}
            key={index}
            setDefault={() => setDefaultCard(layout.id)}
            data={auth}
          ></EditableVisitingCard>
        )})}
       </Box>
    </div>
  );
};
export default VistingCardPanel;
