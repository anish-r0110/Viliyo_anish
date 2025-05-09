import axiosInstance from "@/config/axios";
import useToogle from "@/hooks/useToggle";
import { AppDispatch, RootState } from "@/store";
import { fetchSessionPlan } from "@/store/reducers/livestreamSettings";
import { Text } from "@radix-ui/themes";
import { useEffect } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";


interface SubSegmentProps {
  item:any
}
const SubSegment = ({item}:SubSegmentProps) => {
  return (
    <div className="bg-[#F0F0F0] flex flex-col justify-between p-2 border-2 border-b-app-blue border-dotted">
      <Text className="text-xs font-medium">{item.activity_name}</Text>
      <div className="flex space-x-4">
        {/* <Text className="text-app-blue text-xs">45 Mins</Text> */}
      </div>
    </div>
  );
};


interface Props{
  item:any
}

const Segment = ({item}:Props) => {
  const [isOn, setToogle] = useToogle();

  return (
    <div>
      <div className="bg-[#DADFF1] flex justify-between border-2 border-b-app-blue">
        <div className="flex flex-col">
          <p className="font-medium text-xs">{item.title}</p>
          <p className="text-app-blue text-xs">{item.duration} Mins</p>
        </div>
        <div className="flex space-x-4">
          {isOn ? (
            <RiArrowDropDownLine
              className="cursor-pointer"
              onClick={setToogle}
              size={40}
            />
          ) : (
            <RiArrowDropUpLine
              className="cursor-pointer"
              onClick={setToogle}
              size={40}
            />
          )}
        </div>
      </div>
      {isOn && (
        <div>
          {item.segmentActivities.map((el:any, index:number) =>  <SubSegment item={el} key={index}></SubSegment> )}
        </div>
      )}
    </div>
  );
};

const SessionPlanPanel = () => {

  const { session } = useSelector(( state:RootState) => state.live.settings)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {

      dispatch( fetchSessionPlan({ sessionID:session?.id.toString() , mapID:session?.mapID.toString() as string}))

  } ,[ session?.mapID , session?.id])

  return (
    <div className="bg-fuchsia-500 h-full w-full">
      <div className="bg-gray-900 text-white rounded-tr-2xl py-4 px-1 w-full ">
        Sesssion Plan
      </div>
      {/* <Text className="text-app-blue font-bold">Programme Name:Viliyo</Text> */}
      <div className="bg-[#E9E0FA] border-b-2 border-app-yellow p-3">
        <Text className="text-app-blue font-bold text-sm">
          Session Name: { session?.session_name}
        </Text>
        <div className="flex space-x-2 justify-between text-xs">
          <Text>{ session?.startDate }</Text>
          <Text>{session?.startTime} {session?.endTime}</Text>
        </div>
      </div>
      <div className=" h-full">
       { session?.segments?.map((el, index) => <Segment item={el} key={index}></Segment> ) } 
      </div>
    </div>
  );
};

export default SessionPlanPanel;
