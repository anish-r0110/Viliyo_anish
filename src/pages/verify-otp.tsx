import { useState, useEffect, useRef } from "react";
import { AppPage } from "@/layouts/types";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AuthenticationService from "@/services/Authentication";
import { BackNavigation } from "@/components/shared";

let currentOtpIndex = 0;
const VerifyOtpPage: AppPage = () => {
  const authService = new AuthenticationService();

  const [otp, setOtp] = useState(new Array(4).fill(""));
  const [activeOtpIndex, setActiveOtpIndex] = useState<number>(0);

  const [active, setActive] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const link = searchParams.get("link");
  const type = searchParams.get("type");

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeOtpIndex]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const handleChange = ({
    target,
  }: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = target;

    const newOtp: string[] = [...otp];
    newOtp[currentOtpIndex] = value.substring(value.length - 1);
    setOtp(newOtp);

    if (!value) {
      setActiveOtpIndex(currentOtpIndex - 1);
    } else {
      setActiveOtpIndex(currentOtpIndex + 1);
    }
    setActive(true);
  };

  const handleOnKeyDown = (
    { key }: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    currentOtpIndex = index;
    if (key === "Backspace") setActiveOtpIndex(currentOtpIndex - 1);
  };

  const sendOTP = () => {
    setMinutes(2);
    setSeconds(59);
  };


  const resendOTP = async () => {
    setMinutes(0);
    setSeconds(29);
    await authService.resendOtp(type ?? "signup");
  };

  const handleClick = async () => {
    console.log("entered otp", otp.join(""));
    setOtp([...otp.map(() => " ")]);
    setActive(false);

    if (type === "signup") {
      const response = await authService.verifyOtp(otp.join(""));
      if (response.code === 200) {
        toast.success(response.message + new Date().toDateString());
        link ? router.push(link) : router.push("/dashboard");
      }
    }
    if (type === "forgotPassword") {
      const response = await authService.forgotPasswordVerifyOtp(otp.join(""));
      if (response.ok) {
        toast.success("Verified Successfully");
        router.push("/set-newpassword");
      } else {
        toast.error(response.message);
      }
    }
  };
  const resendClasses =  seconds > 0 ? "text-app-gray" : "text-app-blue hover:scale-105";
  const classes = active === false ? "bg-app-gray" : "bg-app-blue hover:scale-105";

  return (
    <div className="flex relative h-full justify-center items-center p-10 border-2">
      <div className="absolute top-10 left-10">
        <BackNavigation title={"Back"} />
      </div>
      <div className="flex-col space-y-5">
        {title ? (
          <h1 className="text-4xl font-bold text-zinc-600">{title}</h1>
        ) : (
          <h1 className="text-4xl font-bold text-zinc-600">
            Enter Verification Code
          </h1>
        )}

        <p className="text-zinc-600">
          Enter the verification code shared on your email
        </p>

        <div className="flex space-x-4">
          {otp.map((_, index) => {
            return (
              <input
                ref={index === activeOtpIndex ? inputRef : null}
                key={index}
                className="h-16 mobile:h-14 w-24 mobile:w-16 border border-app-blue active:outline-app-blue hover:outline-app-blue focus:outline-app-blue shadow-md shadow-purple-300 rounded-2xl bg-white text-center text-2xl"
                value={otp[index]}
                type="text"
                maxLength={1}
                name="otp"
                onChange={(e) => handleChange(e)}
                onKeyDown={(e) => handleOnKeyDown(e, index)}
                onFocus={(e) => e.target.select()}
              ></input>
            );
          })}
        </div>
        <div className="space-y-1">
          {(seconds > 0 || minutes > 0) && (
            <p className="text-app-blue font-semibold text-lg">
              {minutes < 10 ? `0${minutes}` : minutes}:
              {seconds < 10 ? `0${seconds}` : seconds} sec
            </p>
          )}

          {(seconds > 0 ||
            minutes > 0 ||
            seconds < 0 ||
            minutes < 0 ||
            seconds == 0 ||
            minutes == 0) && (
            <p className="text-zinc-600">
              Didn&apos;t receive the verification code?
              <button
                disabled={seconds > 0 || minutes > 0}
                className={`${resendClasses} px-2 font-bold `}
                onClick={resendOTP}
              >
                Resend
              </button>
            </p>
          )}
        </div>

        <button
          disabled={active === false}
          onClick={handleClick}
          className={`rounded-full px-28 py-2 bg-app-blue text-white font-bold ${classes} `}
        >
          Verify Account
        </button>
      </div>
    </div>
  );
};

export default VerifyOtpPage;

VerifyOtpPage.Layout = "Guest";
