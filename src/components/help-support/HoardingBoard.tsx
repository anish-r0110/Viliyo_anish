import Image from "next/image"
import queriesFeedbackImage from '@/assets/images/help-queryfeedback.png'

const HoardingBoard = () =>{
    return ( <div className="flex p-4 justify-between items-center rounded-xl bg-app-blue text-white mobile:m-2 ">
    <div className="text-left">
      <div className="flex font-bold text-xl text-app-yellow col-span-2">
        We want to hear from you and know where we can improve.
      </div>
      <p className="text-white font-light text-sm">
        We want to hear from you if you have unanswered<br></br>questions or
        something to tell us!
      </p>
    </div>
    
    <div className="col-span-1 text-right ">
      <div className="flex justify-end mr-4">
        <Image
          alt="Welcome"
          src={queriesFeedbackImage}
          width={75}
          height={50}
        />
      </div>
    </div>
  </div> )
  }


  export default HoardingBoard