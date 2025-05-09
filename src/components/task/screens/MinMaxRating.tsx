import { Box } from "@radix-ui/themes";
import { useState } from "react";
import { RxDotFilled } from "react-icons/rx";

interface MinMaxScaleProps {
  minLabel:string;
  maxLabel:string;
  minValue:number;
  maxValue:number;
  step:number;
  value:number;
  inLine:boolean;
  onScale: ( value:number) => void;
}


const InlineMinMaxScale = ({ minLabel , maxLabel , minValue ,maxValue ,step , value , onScale  }:MinMaxScaleProps ) => {
   
  return ( <div className="flex  w-full border shadow-lg  rounded-t-2xl">
  <div className={`flex flex-col  bg-[#D7D3E3] rounded-xl shadow-lg`}>
    <div className="flex text-xs justify-between">
      <label className="flex flex-col font-medium">
        <span className="text-purple-700">{ minLabel}</span>
      </label>
      <label className="flex flex-col font-medium">
        <span className="text-purple-700 ">{ maxLabel }</span>
      </label>
    </div>
    <div className="flex text-xs justify-between px-1 my-3">
      <label className="flex flex-col font-medium">
        <span className="font-medium">{minValue}</span>{" "}
      </label>
      <label className="flex flex-col font-medium gap-3">
        <span className="font-medium"> 0</span>{" "}
      </label>
      <label className="flex flex-col font-medium">
        <span className="text-purple-700 ">{maxValue}</span>{" "}
      </label>
    </div>

    <div className="flex justify-between relative w-full border border-purple-800 bg-white rounded-3xl">
      {[-5, -4, -3, -2, 1, 0, 1, 2, 3, 4, 5].map((item ,index) => {
        return (
          <div className="flex" key={index}>
            <span>
              <RxDotFilled />
            </span>
          </div>
        );
      })}
      <input
        type="range"
        className="absolute top-[50%] w-full accent-purple-700  appearance-none h-0 [&::-webkit-range-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
        min={minValue}
        max={maxValue}
        value={`${value}`}
        step={step}
        onChange={(e) => { onScale(parseInt(e.target.value))}}
      />
    </div>
  </div>
  <div className="">
    
    <label className="flex px-12 my-[5%] border rounded-2xl text-white py-2 bg-gradient-to-br from-purple-950 to-purple-500">
      {value}
    </label>
  </div>
</div> )
}

const MinMaxScale = ({ minLabel , maxLabel , minValue ,maxValue ,step , value , onScale  }:MinMaxScaleProps ) => {
   
   return ( <div className="flex flex-col border shadow-lg max-w-3xl rounded-t-2xl">
   <div className={`flex flex-col max-w-3xl px-8 mobile:px-4 tablet:px-4 py-10 bg-[#D7D3E3] rounded-xl shadow-lg`}>
     <div className="flex text-xs justify-between py-2">
       <label className="flex flex-col font-medium">
         <span className="text-purple-700">{ minLabel}</span>
       </label>
       <label className="flex flex-col font-medium">
         <span className="text-purple-700 ">{ maxLabel }</span>
       </label>
     </div>
     <div className="flex text-xs justify-between px-1 my-3">
       <label className="flex flex-col font-medium">
         <span className="font-medium">{minValue}</span>{" "}
       </label>
       <label className="flex flex-col font-medium gap-3">
         <span className="font-medium"> 0</span>{" "}
       </label>
       <label className="flex flex-col font-medium">
         <span className="text-purple-700 ">{maxValue}</span>{" "}
       </label>
     </div>

     <div className="flex justify-between relative w-full border border-purple-800 bg-white rounded-3xl">
       {[-5, -4, -3, -2, 1, 0, 1, 2, 3, 4, 5].map((item) => {
         return (
           <div className="flex" key={item}>
             <span>
               <RxDotFilled />
             </span>
           </div>
         );
       })}
       <input
         type="range"
         className="absolute top-[50%] w-full accent-purple-700  appearance-none h-0 [&::-webkit-range-thumb]:h-[50px] [&::-webkit-slider-thumb]:w-[50px] [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-500"
         min={minValue}
         max={maxValue}
         value={`${value}`}
         step={step}
         onChange={(e) => { onScale(parseInt(e.target.value))}}
       />
     </div>
   </div>
   <div className="flex gap-2 justify-center">
     <label className="text-md my-auto font-medium text-purple-700">
       Your Response{" "}
     </label>
     <label className="flex px-12 my-[5%] border rounded-2xl text-white py-2 bg-gradient-to-br from-purple-950 to-purple-500">
       {value}
     </label>
   </div>
 </div> )
}


interface MinMaxRatingProps {
   element: any;
   index:number;
   wantOptionRating:boolean
   onScale:( option:any , scale:string , index:number) => void;
}

export const MinMaxRating = ({ element ,index , onScale , wantOptionRating  }:MinMaxRatingProps) => {

  const [ isOptionRating , setOptionRating ] = useState( wantOptionRating );
  
  return (
    <Box >
       { !isOptionRating && <MinMaxQuestion onScale={(option ,scale )=>{ onScale( option , scale ,index)  }} element={element} />  }
       { isOptionRating && <MinMaxOption onScale={( option , scale ) => { onScale( option , scale ,index) }} element={element} />  }
    </Box>
  );
};

export default MinMaxRating


export const  MinMaxQuestion = ({ element , onScale }:{element:any , onScale:( option:any , scale:string  ) => void }) => {

    const value = element.answer[0].isAnswer;
    const option = ( element && element.answer  )? element.answer[0]:( element.answerOptions[0] )?{value:element.answerOptions[0].answerOption}:{}
   return (<Box>
     <label className="block mb-2 text-normal font-bold text-app-gray-medium">{ element.question }
     {element.Mandatory && <span className="text-red-600">*</span>}
     </label>
     <MinMaxScale 
     value={value || 0} 
     minLabel={element.minLabel} 
     maxLabel={element.maxLabel} 
     minValue={element.minValue || -5} 
     maxValue={element.maxValue || 5} 
     inLine={false} 
     onScale={(scale: number) => { onScale( option  , scale.toString()  ) } } 
     step={2}></MinMaxScale>
   </Box> )
}

export const MinMaxOption = ({  element , onScale }:{element:any ,  onScale:( option:any , scale:string  ) => void }) => {
  const [scales , setScales ]  = useState<{answerId:string, value:string , isAnswer:string}[]>(element.answer);
  const options = (element && element.answer)?element.answer:(element && element.answerOptions )?element.answerOptions.map((el:any) => {return { value:el.answerOption , isAnswer:el.isAnswer}}):[]
  
   return ( <Box className="w-full"> 
     <label className="block mb-2 text-normal font-bold text-app-gray-medium">{ element.question }
     {element.Mandatory && <span className="text-red-600">*</span>}
     </label>
     { options.map( (el:any , index:number) =>  (
      <Box key={index} className="flex justify-between w-full gap-2 ">
      <div className="w-1/2 shadow-md rounded-2xl p-2">
         {el.value}
      </div>
      <div className="w-1/2">
      <InlineMinMaxScale 
          value={parseInt(el.isAnswer) || 0} 
          minLabel={element.minLabel} 
          maxLabel={element.maxLabel} 
          minValue={element.minValue || -5} 
          maxValue={element.maxValue || 5} 
          inLine={true} 
          onScale={(scale: number) => { onScale( el , scale.toString() )   } } 
          step={1}></InlineMinMaxScale>
      </div>
   </Box>
      ))   }
    </Box>)
     
}