import React, { useState } from "react";
import { Button } from "@/components/buttons";
import { toast } from "react-hot-toast";
import FileUploader from "./FileUploader";
import axiosInstance from "@/config/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { uploadImages } from "@/services/aws-upload";

interface RaiseSupportProps {
  title: string;
}

const RaiseSupportTicket = ({ title }: RaiseSupportProps) => {
  const auth = useSelector((state:RootState)=>
    state.auth.user
  )
  const [message, setMessage] = useState("");
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [needCallBack, setNeedCallBack] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [parentValue, setParentValue] = useState("");

  const handleFileChangeInChild = (file: File | null) => {
    setScreenshot(file);
    setParentValue(file ? file.name : "No file selected");
  };

  const handleOptionChange = (option: "yes" | "no") => {
    setNeedCallBack(option === "yes");
  };

  const isValidPhoneNumber = (phoneNumber: string): boolean => {
    // Define a regular expression for a valid 10-digit phone number
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  const handlePhoneNumberChange = ( event: React.ChangeEvent<HTMLInputElement> ) => {

    const newValue = event.target.value;

    // Allowing only numbers
    if ( !/^\d*$/.test( newValue ) ) {
      toast.error( "Invalid phone number. Please enter a 10-digit number." );
      return;
    }
    // restricting user to enter more than 10 digits
    if ( newValue.length > 10 ) {
      toast.error( "Phone number cannot be more than 10 digits" );
      return;
    }

    setPhoneNumber( newValue );

  };



  const handleSubmitQuery = async () => {
    if (message.trim() === "") {
      toast.error("Query should not be empty");
      return;
    }
    // Validate phone number during submission
    if (needCallBack && phoneNumber.trim() !== "" && !isValidPhoneNumber(phoneNumber)) {
      toast.error("Invalid phone number. Please enter a 10-digit number.");
      return;
    }
    try {

      let mediaFile = "";
      if (screenshot) {
          mediaFile = await uploadImages(screenshot);
        }

        console.log("mediaFile = ", mediaFile);

      const payLoad = {
        query : message,        
        description: message,
        callbackRequired: isValidPhoneNumber(phoneNumber),
        contact_number: phoneNumber,
        phone: phoneNumber,
        media_file: mediaFile,
        file: mediaFile,
        need_call_back: isValidPhoneNumber(phoneNumber),
        email: auth?.email,
        username: auth?.name
      }

      console.log("payLoad for raise a support Ticket = ", payLoad);

      const response = await axiosInstance.post("support/raise_support_query", payLoad) 
      
      console.log("response for create_contact_support = ", response)

      if (!response.data.error) {
        toast.success("Query submitted successfully!");
        // Reset form fields
        setMessage("");
        setScreenshot(null);
        setPhoneNumber("");
        setNeedCallBack(false);
        setParentValue("No File Selected");
      } else {
        toast.error("Error submitting query");
      }
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  return (
    <>
      <div className="grid grid-cols-2 p-2 items-baseline">
        <div className="col-span-1 mobile:col-span-2 tablet:col-span-2 ">
          <textarea
            id="message"
            rows={8}
            className="block p-2.5 w-full italic text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 "
            placeholder="Type your query here"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
          ></textarea>
        </div>

        <div className="text-right col-span-1 items-baseline mobile:text-center tablet:text-start tablet:text-sm mobile:space-y-4 mobile:col-span-2 tablet:col-span-2 text-[16px] m-4 ">
          <div className="w-full flex mobile:flex-col items-center space-y-4 tablet:text-sm"> 
            <div className="flex flex-row gap-4 mb-4">
            <div className="flex mx-2 text-lg">I need a call back from Viliyo</div>
            <div className="flex mx-2 ">
              <label className="cursor-pointer">
                <input
                  type="radio"  
                  value="yes"
                  checked={needCallBack}
                  onChange={() => handleOptionChange("yes")}
                  //className="text-2xl justify-between"
                />
                &nbsp;<span className="text-xl">Yes</span> 
              </label>
              <label className="cursor-pointer ml-4">
                <input
                  type="radio"
                  value="no"
                  checked={!needCallBack}
                  onChange={() => handleOptionChange("no")}
                />
                &nbsp;<span className="text-xl">No</span>
              </label>
            </div>
            </div>
          </div>
          {needCallBack && (
            <div className="flex col-span-2 items-baseline gap-2">
              <label className="text-lg whitespace-nowrap mt-2 flex col-span-1 font-bold ml-1">
                Phone
              </label>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Enter contact number"
                className="w-[300px]  rounded-3xl border border-gray-300  focus:border-app-purple text-lg mr-14 ml-0 py-1 px-4 items-baseline mobile:mr-2"
              />
            </div>
          )}
        </div>

        <div className="flex flex-row col-span-1 mobile:col-span-2 mobile:flex mobile:justify-center tablet:col-span-2 items-end gap-4 mb-2">
         <p className="flex flex-grow w-[240px] py-2 justify-center border-2 text-xs ">{parentValue || "No file selected"}</p>
         <FileUploader title={title} key={screenshot?.name}  onFileChange={handleFileChangeInChild} />
        </div>
          <div className="col-span-2 mobile:mt-4 mobile:flex mobile:justify-center text-[14px] text-left">
          <Button
            onClick={handleSubmitQuery}
            styles="bg-gradient-to-br px-12 from-40% from-app-blue to-app-purple text-white  hover:scale-105 "
          >
            Submit Query
          </Button>
        </div>
      </div>
    </>
  );
};

export default RaiseSupportTicket;
