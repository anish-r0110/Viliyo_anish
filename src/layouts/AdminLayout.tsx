"use client";

import { PropsWithChildren, useEffect } from "react";
import Icon from "@/assets/icons";
import Image from "next/image";

import { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import NavBar from "@/components/navbar";

const BottomTabs = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("/dashboard");

  const handleTabClick = (path: string) => {
    router.push(path);
    setActiveTab(path);
  };

  return (
    <div className="mt-4">
      <div className="fixed bottom-0 left-0 w-full hidden mobile:block">
        <input
          type="radio"
          id="tab1"
          name="tabs"
          className="absolute opacity-0"
          defaultChecked={activeTab === "/dashboard"}
        />
        <input
          type="radio"
          id="tab2"
          name="tabs"
          className="absolute opacity-0"
          defaultChecked={activeTab === "/calendar"}
        />
        <input
          type="radio"
          id="tab3"
          name="tabs"
          className="absolute opacity-0"
          defaultChecked={activeTab === "/history"}
        />

        <nav className="flex items-center justify-between ">
          <label
            htmlFor="tab1"
            className="flex-1 flex justify-center items-center text-center p-2 bg-app-blue  rounded-t-lg cursor-pointer"
            onClick={() => handleTabClick("/dashboard")}
          >
            <Image className="w-8 h-8" src={Icon.dashboard} alt="Menu Icon" />
          </label>
          <label
            htmlFor="tab2"
            className="flex-1 flex justify-center items-center text-center p-2 bg-app-blue rounded-t-lg cursor-pointer"
            onClick={() => handleTabClick("/calendar")}
          >
            <Image className="w-8 h-8" src={Icon.calendar} alt="Menu Icon" />
          </label>
          <label
            htmlFor="tab3"
            className="flex-1 flex justify-center items-center text-center p-2 bg-app-blue rounded-t-lg cursor-pointer"
            onClick={() => handleTabClick("/history")}
          >
            <Image className="w-8 h-8" src={Icon.clock} alt="Menu Icon" />
          </label>
        </nav>
      </div>
    </div>
  );
};

const AdminLayout = (props: PropsWithChildren) => {

  const router = useRouter();
  const { user, isLoading } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      router.push('/dashboard');
    }
    else router.push('/login');

  }, [user]);


  return (
    <div className="flex flex-col h-screen">
     { user && <NavBar></NavBar> }
      <div className=" bg-app-purple-100 rounded-t-3xl">
        {!isLoading && <main className="flex p-5 flex-col bg-app-purple-100 rounded-t-3xl flex-grow">{props.children}</main> }
      </div>
      <BottomTabs></BottomTabs>
    </div>
  );
};

export default AdminLayout;
