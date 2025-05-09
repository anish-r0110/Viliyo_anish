import React, { useState, useEffect } from "react";
import axiosInstance from "@/config/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import IBadge from "./interface/Badge";
import { Loader } from "@/components/shared";
import Shared from "./Shared";
import Recieved from "./Recieved";
import { Tabs } from "../tabs";


const Exchanged = ({ sessionId }: any) => {

  const [badgeData, setBadgeData] = useState<IBadge[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const isMobile = window.innerWidth <= 768; 
  const { user } = useSelector((state:RootState) => state.auth )

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.post("/trainee/get_badges", {
          email: user?.email,
          sessionMapId: sessionId,
        });
        setBadgeData(response.data.getBadge);
        setLoading(false);
      } catch (error:any) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [sessionId, user]);

  if (loading) {
    return <Loader size={50} />;
  }

  if (error) {
    return <div>Error fetching data.</div>;
  }

  const badgeDetails = {
    "Badges Received": [
      {
        id: 1,
        TabContent: (
          <div className="flex w-full">
            <Recieved badgeData={badgeData} />
          </div>
        ),
      },
    ],
    "Badges Shared with Others": [
      {
        id: 1,
        TabContent: <Shared sessionId={0} />,
      },
    ],
  };

  return (
    <>
      {/* Desktop view */}
      <div
        className={`flex ${
          isMobile ? "hidden" : "flex-col"
        } w-auto h-auto gap-2`}
      >
        <div className="bg-app-yellow h-12 p-4 rounded-t-xl">
          <div className="text-black font-bold">Badges Exchanged</div>
        </div>
        <Tabs data={badgeDetails} />
      </div>

      {/* Mobile modal */}
      {isMobile && (
        <div className="w-[300px] border-1 flex items-center justify-center bg-black bg-opacity-40 rounded-lg">
          <div className="bg-white rounded-lg shadow-lg overflow-x-auto text-xs">
            <div className="bg-app-yellow h-8 p-4">
              <h1 className="text-black text-xs">Badges Exchanged</h1>
            </div>
            <Tabs data={badgeDetails} />
          </div>
        </div>
      )}
    </>
  );
};

export default Exchanged;
