import { RootState } from "@/store";
import React, { useEffect, useState } from "react";
import { IoExpandOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
export const TableComponent = ({ consumers, seating }:{ consumers:any , seating:any}) => {
  const peers:any = []
  const [sittingDetails, setSittingDetails] = useState(
    JSON.parse(seating.table)
  );

  useEffect(() => {
    console.log(
      "🚀 ~ TableComponent ~ consumers:",
      consumers,
      sittingDetails,
      peers
    );
  }, [peers]);



  return (
    <div className="flex text-lg justify-center text-white w-full">
      Table Name :{sittingDetails[0].table_name}
      participants : {sittingDetails[0].seats.length}
      <div className="bg-purple-100 h-fit p-2 py-2 rounded-2xl m-2 w-fit">
        <div className="flex flex-col justify-center p-12 items-center max-w-[196px] rounded-2xl  bg-purple-100 border-4  border-black space-y-5">
          <div>
            <div className="bg-app-blue text-white py-1 px-4 rounded-lg flex">
              Group
            </div>
          </div>
          <div
            className="font-bold text-xl text-black "
            // onClick={() => setView(!view)}
          >
            <IoExpandOutline />
          </div>
        </div>
      </div>
      <div className=""></div>
   
    </div>
  );
};
