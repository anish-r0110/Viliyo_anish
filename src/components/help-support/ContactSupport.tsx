import Image from "next/image";

import { AiFillInstagram, AiFillLinkedin, AiTwotoneLike } from "react-icons/ai";
import { FaFacebookSquare, FaTwitterSquare } from "react-icons/fa";
import { GrMail } from "react-icons/gr";
import { IoMdCall } from "react-icons/io";

import RaiseSupportTicket from "./RaiseSupportTicket";
import contactImage from '@/assets/images/help-center6.png'


const ContactSupport = () => {
  return (
    <>
      <div className="flex justify-between items-center p-4 text-right rounded-xl bg-app-blue text-white shadow-sm">
        <div className="text-left">
          <span className="font-bold text-xl text-app-yellow text-left">
            Need some help? We are there to support you 24*7.
          </span>
          <p className="text-white font-light text-sm">
            We are there 24*7 to help and support you in using Viliyo
            efficiently. Do not hesitate to connect with us anytime.
          </p>
        </div>
        <Image
          alt="Welcome"
          src={contactImage}
          width={75}
          height={50}
        />
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="text-app-blue font-bold mt-2 col-span-4">
          Raise a Support Ticket
        </div>
        <div className="mb-2">
          <hr className="bg-app-blue h-[1px]"></hr>
        </div>
        
        <div className="mt-4 p-4 rounded-xl bg-white text-app-blue">
          <div>
            <RaiseSupportTicket title="Attach Screenshot" />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-x-2 mobile:flex  mobile:flex-col mobile:space-y-3 mobile:items-center tablet:grid-cols-1  text-app-blue m-4  tablet:space-y-4 ">
          <div>
            <div className="mobile:w-72 bg-gradient-to-br  from-app-yellow to-app-white  font-bold text-app-blue rounded-t-3xl flex flex-col p-6 ">
              <div className="flex justify-between">
                <p> Call us</p>
                <div className="font-bold text-3xl">
                  <IoMdCall />
                </div>
              </div>
            </div>
            <div className="h-20 bg-white rounded-b-3xl flex flex-col text-center items-center justify-center text-base">
              +91 00 00 00 000
            </div>
          </div>
          <div>
            <div className="mobile:w-72 bg-gradient-to-br  from-app-yellow to-app-white  font-bold text-app-blue rounded-t-3xl flex flex-col  p-6">
              <div className="flex justify-between">
                <p> Write to us</p>
                <div className="font-bold text-3xl">
                  <GrMail />
                </div>
              </div>
            </div>
            <div className="h-20 bg-white rounded-b-3xl flex flex-col justify-center items-center text-base">
              support@viliyo.com
            </div>
          </div>
          <div>
            <div className="mobile:w-72 bg-gradient-to-br  from-app-yellow to-app-white  font-bold text-app-blue rounded-t-3xl flex flex-col p-6">
              <div className="flex justify-between">
                <p> Follow us</p>
                <div className="font-bold text-3xl">
                  <AiTwotoneLike />
                </div>
              </div>
            </div>
            <div className="flex justify-evenly items-center h-20  bg-white rounded-b-3xl  text-base gap-x-4">
              <FaFacebookSquare />
              <AiFillInstagram />
              <AiFillLinkedin />
              <FaTwitterSquare />
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default ContactSupport;
