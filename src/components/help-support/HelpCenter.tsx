import { Button } from "@/components/buttons";
import Image from "next/image";
import tutorials from "@/assets/images/help-center2.png";
import faq from "@/assets/images/help-center3.png";
import featureRequest from "@/assets/images/help-center5.png";
import contact from "@/assets/images/help-center6.png";
import helpQueryFeedback from "@/assets/images/help-queryfeedback.png";
import welcome from "@/assets/images/Welcome.png";

interface HelpCentrProps {
  setActive: (index: string) => void;
}

const HelpCenter = ({ setActive }: HelpCentrProps) => {
  return (
    <div className="grid grid-cols-4 gap-2">
      {/* Main content area */}
      <div className="flex p-3 items-center justify-between rounded-xl bg-[#907BB8] text-white col-span-4">
        <Image alt="Welcome" src={welcome} width={120} height={50} />
        <span className="mr-10 text-xl">WELCOME TO VILIYO HELP CENTRE</span>
      </div>
      {/* First ends here */}
      <div className="flex justify-between p-4 bg-app-blue rounded-lg text-white  col-span-2 mobile:col-span-4 tablet:col-span-4">
        <Image alt="help" src={tutorials} width={120} height={60} />

        <div className="flex text-right   flex-col items-end justify-evenly">
          <p className="text-app-yellow font-bold text-xl">Viliyo Tutorials</p>
          <p className=" text-white text-sm font-medium">
            Fastest way to master Viliyo!
          </p>
          <Button
            onClick={() => setActive("viliyo-tutorials")}
            styles="outline-1 my-3 px-12"
          >
            Watch
          </Button>
        </div>
      </div>

      <div className="flex justify-between col-span-2 mobile:col-span-4 bg-app-blue rounded-lg p-4 text-white tablet:col-span-4">
        <div className="flex flex-col  justify-evenly items-start">
          <p className="text-app-yellow font-bold text-xl">FAQs</p>
          <p className=" text-white text-sm font-light ">
            You have a question? We have the answer!
          </p>
          <Button
            onClick={() => setActive("faq")}
            styles="my-3 outline-1 px-12"
          >
            Read
          </Button>
        </div>
        <Image src={faq} alt="help" width={120} height={80} />
      </div>
      {/* Second ends here */}

      <div className="flex  justify-between col-span-2  mobile:col-span-4 bg-app-yellow rounded-lg p-4 text-white tablet:col-span-4">
        <Image alt="help" src={helpQueryFeedback} width={120} height={80} />

        <div className="flex text-right flex-col justify-evenly items-end">
          <p className="text-app-blue font-bold text-xl ">Queries & Feedback</p>
          <p className="text-app-gray-medium text-sm font-medium">
            We want to hear from you if you have unanswered questions or
            something to tell us!
          </p>
          <Button
            onClick={() => setActive("queries-feedback")}
            styles="outline-1 text-app-blue px-12 my-3 "
          >
            Share
          </Button>
        </div>
      </div>

      <div className="flex justify-between col-span-2 mobile:col-span-4  bg-app-yellow rounded-lg p-4 text-white tablet:col-span-4">
        <div className="flex flex-col justify-evenly items-start">
          <p className="text-app-blue font-bold text-xl">Feature Request</p>
          <p className="text-app-gray-medium  text-sm font-medium">
            Have an idea of a feature that can make<br></br> Viliyo Smarter?
          </p>
          <Button
            onClick={() => setActive("feature-request")}
            styles="outline-1 px-12 my-3 text-app-blue"
          >
            Suggest
          </Button>
        </div>
        <div className="flex text-right mb-2 col-span-1">
          <Image alt="help" src={featureRequest} width={120} height={80} />
        </div>
      </div>
      {/* Third ends here */}

      <div className="flex col-span-4  justify-between  p-4 rounded-lg bg-app-blue text-white">
        <div className="">
          <p className="text-app-yellow text-xl font-bold mobile:text-sm">
            Help & Support
          </p>
          <p className="text-white text-sm font-medium mobile:text-xs">
            We are there 24x7 to help and support you in using Viliyo
            efficiently.<br></br>Do not hesitate to connect with us anytime.
          </p>
          <Button
            onClick={() => setActive("contact-support")}
            styles="outline-1 px-12 my-3 text-app-yellow"
          >
            Get in Touch
          </Button>
        </div>

        <div className="flex items-center">
          <span className="text-app-yellow text-xl mr-4 font-bold text-right mobile:text-xs mobile:mr-0">
            Need Support?
          </span>
          <Image
            alt="Contact"
            src={contact}
            width={120}
            height={80}
            className="mobile:w-20 h-20"
          />
        </div>
      </div>
      {/* Fourth ends here */}
    </div>
  );
};

export default HelpCenter;
