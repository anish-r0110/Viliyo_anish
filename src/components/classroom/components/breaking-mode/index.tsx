
import { useSelector } from "react-redux";
import Trainer from "../backup/Trainer";
import ClusterTableSittingAlignment from "../tables/ClusterTableSittingAlignment";
import { RootState } from "@/store";


const BreakingMode = () => {

    const { session , trainer } = useSelector((state:RootState) => state.live.settings)

    return (<> 
     <div className="flex flex-col bg-black text-white py-[1%] px-[2%]">
       <span className="text-sm">{ session?.session_name}</span>
       <span className="text-xs">Duration:{session?.startTime}-{ session?.endTime}</span>
     </div>
     <div className="flex flex-col w-full  bg-[#212025]">
       <Trainer name={ trainer?.name} trainerTableName="On Table 1" />
     </div>
     <div className="flex flex-col w-full h-96 bg-[#212025] overflow-y-auto">
       <ClusterTableSittingAlignment />
     </div>
   </>
    )
 }

 export default BreakingMode;