import React, { useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { Popover, Box } from "@radix-ui/themes";
import { HiOutlineUserGroup } from "react-icons/hi";
import { BsHouseDown } from "react-icons/bs";
import { IoExpandOutline } from "react-icons/io5";

interface ClusterTableProps {
  typesOfTable: string;
  tableName: string;
  view: any;
  setView: any;
}

const ClusterTable = ({
  typesOfTable,
  tableName,
  view,
  setView,
}: ClusterTableProps) => {
  return (
    <>
      <div className="flex flex-col flex-wrap justify-center items-center ">
        <div>
          {typesOfTable === "case_study_mode" && (
            <div
              className={`bg-gray-700 
                  p-2 py-2 rounded-full m-2 border-2  border-gray-600 `}
            >
              <div
                className={`flex flex-col justify-center
                    p-8  items-center  rounded-full  bg-purple-100 border  border-white space-y-5
               `}
              >
                <div>
                  <div
                    className={`bg-app-blue text-white px-4 py-1 rounded-3xl text-xs`}
                  >
                    {<p>Case Study</p>}
                    <p className="px-2 font-medium">{tableName}</p>
                  </div>
                </div>
                <div
                  className={`font-bold text-2xl text-black `}
                  onClick={() => setView(!view)}
                >
                  <IoExpandOutline />
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {typesOfTable === "group_discussion_mode" && (
            <div
              className={`bg-gray-700 
                    py-8 px-8 shadow-inner shadow-purple-400 rounded-full m-2 border-2  border-gray-600 `}
            >
              <div
                className={`flex flex-col justify-center  items-center   border  border-white space-y-5
               
                  rounded-xl rounded-t-xl bg-purple-100 rotate-45 p-2 `}
              >
                <div className={`  -right-10 `}>
                  <div
                    className={`bg-app-blue text-white px-4 py-1 rounded-3xl text-xs -rotate-45 mr-6 mt-4 `}
                  >
                    {<p>Discussion</p>}
                    <p className="px-2 font-medium">{tableName}</p>
                  </div>
                </div>
                <div
                  className={`font-bold text-black 
                        ml-20 text-2xl rotate-45`}
                  onClick={() => setView(!view)}
                >
                  <IoExpandOutline />
                </div>
              </div>
            </div>
          )}
        </div>
        <div>
          {typesOfTable === "networking_mode" && (
            <div className="bg-purple-100 p-2 py-2 rounded-2xl m-2 ">
              <div className="flex flex-col justify-center p-7 items-center  rounded-2xl  bg-purple-100 border-4  border-black space-y-5">
                <div>
                  <div className="bg-app-blue text-white py-1 px-4 rounded-lg flex">
                    {tableName}
                    <Popover.Root>
                      <Popover.Trigger>
                        <span className="py-1 pl-2">
                          <CiMenuKebab />
                        </span>
                      </Popover.Trigger>

                      <Popover.Content>
                        <Box grow="1">
                          <Popover.Close>
                            <div>
                              <div className="flex space-x-2">
                                <div className="py-1">
                                  <HiOutlineUserGroup color="purple" />
                                </div>
                                <p>Talk to this Group</p>
                              </div>
                              <div className="flex space-x-2">
                                <div className="py-1">
                                  <BsHouseDown color="purple" />
                                </div>
                                <p>Move to this Group</p>
                              </div>
                            </div>
                          </Popover.Close>
                        </Box>
                      </Popover.Content>
                    </Popover.Root>
                  </div>
                </div>
                <div
                  className="font-bold text-xl text-black "
                  onClick={() => setView(!view)}
                >
                  <IoExpandOutline />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ClusterTable;
