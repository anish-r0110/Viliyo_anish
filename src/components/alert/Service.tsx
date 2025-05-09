
import { ReactNode, useEffect, useState } from "react";
import Error from "./Error";
import Success from "./Success";
import Warning from "./Warning";
import Logout from "./Logout";
import alertInstance from "./services/alertInstance";

interface AlertEventData {
  type: string;
  heading: string;
  content: string;
  onOk: () => void;
  onClose: () => void;
  buttonText: string;
  onCloseText?: string;
}



export const Service = ({ children }: { children: ReactNode }) => {
  const [alertData, setAlertData] = useState<AlertEventData | boolean>();
  useEffect(() => {
    alertInstance.on("showAlert", (data) => {
      setAlertData(data);
    });
    return () => {
      alertInstance.off("showAlert", () => {});
    };
  }, []);

  const closeAlert = () => {
    setAlertData(false);
  };

  const renderAlert = (data: AlertEventData): JSX.Element => {
    if (data.type == "success")
      return (
        <Success
          heading={data.heading || ""}
          content={data?.content || ""}
          onClose={() => {
            if (data.onClose) data?.onClose();
            closeAlert();
          }}
          onOkClick={() => {
            if (data.onOk) data?.onOk();
            closeAlert();
          }}
          buttonText={data?.buttonText || "Ok"}
        />
      );

    if (data.type == "error")
      return (
        <Error
          heading={data.heading || ""}
          content={data?.content || ""}
          onClose={() => {
            if (data.onClose) data?.onClose();
            closeAlert();
          }}
          onOkClick={() => {
            if (data.onOk) data?.onOk();
            closeAlert();
          }}
          buttonText={data?.buttonText || "Ok"}
        />
      );

    if (data.type == "warning")
      return (
        <Warning
          heading={data.heading || ""}
          content={data?.content || ""}
          onClose={() => {
            if (data.onClose) data?.onClose();
            closeAlert();
          }}
          onOkClick={() => {
            if (data.onOk) data?.onOk();
            closeAlert();
          }}
          buttonText={data?.buttonText || "Ok"}
          onCloseText={data?.onCloseText || "No"}
          
        />
      );

      if (data.type == "logout")
      return (
        <Logout
          heading={data.heading || ""}
          content={data?.content || ""}
          onClose={() => {
            if (data.onClose) data?.onClose();
            closeAlert();
          }}
          onOkClick={() => {
            if (data.onOk) data?.onOk();
            closeAlert();
          }}
          buttonText={data?.buttonText || "Yes"}
          onCloseText={data?.onCloseText || "No"}
          
        />
      );

    return <></>;
  };

  return (
    <>
      {alertData && typeof alertData === "object" && renderAlert(alertData)}
      {children}
    </>
  );
};


export default Service