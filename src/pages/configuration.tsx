"use client";

import { AppPage } from "@/layouts/types";
import { useSearchParams } from "next/navigation";
import React from "react";
import JoinSessionBg from "../../public/img/joinSessionBackground.png";
import { useDispatch } from "react-redux";
import { updateLiveStreamSettings } from "@/store/reducers/livestreamSettings";
import SessionAcknowdlegement from "@/components/classroom/components/configuration/SessionAcknowdlegement";

const ConfigurationPage: AppPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("sessionId");

  const dispatch = useDispatch()
  dispatch(updateLiveStreamSettings({ roomId: sessionId as string}))

  return (
    <div
      className="flex justify-center items-center h-screen bg-transparent"
      style={{
        backgroundImage: `url(${JoinSessionBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <SessionAcknowdlegement sessionId={sessionId as string} />
    </div>
  );
};

export default ConfigurationPage;
ConfigurationPage.Layout = "Console";
