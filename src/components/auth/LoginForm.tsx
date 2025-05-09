
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { AppDispatch, RootState } from "@/store";
import {  login   } from "@/store/reducers/authentication";
import { LoginFormSchema } from "@/zod.schema";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import AuthenticationService from "@/services/Authentication";
import { Loader } from "../shared";

export type FormData = z.infer<typeof LoginFormSchema>;

const initialLoginFormSchema: ZodType<FormData> = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const otpLoginFormSchema: ZodType<FormData> = z.object({
  username: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(4, "OTP must be a 4-digit code"),
});

const getLoginFormSchema = (authMethod: string) => {
  return authMethod === 'otp' ? otpLoginFormSchema : initialLoginFormSchema;
};



const LoginForm = () => {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const router = useRouter();
  const authService = new AuthenticationService();
  const { isLoading , error  } = useSelector((state: RootState) => state.auth);
  const [authMethod, setAuthMethod] = useState('password');
  const [resendTimer, setResendTimer] = useState<number>(0);
  const [otpVerified, setOtpVerified] = useState<boolean>(false);
  const [emailValid, setEmailValid] = useState<boolean>(false); // Step 1

  useEffect(() => {
    if( error )
     toast.error(error)
  } ,[ error])
  

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    getValues,
  } = useForm<FormData>({ resolver: zodResolver(getLoginFormSchema(authMethod)) });

  useEffect(() => {
    if (authMethod === 'otp') {
      trigger();
    }
  }, [authMethod, trigger]);

  const handleAuthMethodChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setAuthMethod(e.target.value);
    if (e.target.value === "otp") {
      startResendTimer();
      onOTPSelect();
    }
  };

  const startResendTimer = () => {
    if (resendTimer === 0) {
      setResendTimer(30);
      const interval = setInterval(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      setTimeout(() => clearInterval(interval), 30000);
    }
  };

  const dispatch = useDispatch<AppDispatch>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const isValid = await trigger();
      if (isValid) {
        let user 
        if (authMethod === 'password') {
          const response = await dispatch(login({ username:data.username , password:data.password  }));
          user = response.payload?.user
        } 
        else if (authMethod === 'otp') {
          if (!otpVerified) {
            console.error("OTP not verified");
            return;
          }
          user =  await authService.verifyOtp(data.password);
        }


        if ( user ) {
          router.push("/dashboard");
          toast.success("Logged In :" + new Date().toDateString());
        }
      }
    } catch (error) {      
      console.error("Login error:", error);
    }
  };

  const onOTPSelect = async () => {
    const email = getValues("username"); // Get email from form field
    if (validateEmail(email)) { // Check if email is valid
      await authService.loginWithOtp(email); // Call authService with email
      setOtpVerified(true); // Update OTP verification status
    } else {
      console.error("Invalid email address");
    }
  };
  
  const resendOTP = async () => {
    const email = getValues("username"); // Get email from form field
    if (validateEmail(email)) { // Check if email is valid
      if (resendTimer === 0) { // Check if resend timer is not active
        const response = await authService.loginWithOtp(email); // Call authService with email
        if (response) {
          toast.success("OTP Resent Successfully");
          startResendTimer(); // Start resend timer after successful OTP resend
        } else {
          toast.error("Failed to resend OTP");
        }
      }
    } else {
      console.error("Invalid email address");
    }
  };
  
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setEmailValid(validateEmail(email)); // Step 2
  };

  const validateEmail = (email: string) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  return (
    <>
      <div className="p-20 mobile:p-6 tablet:p-5 laptop:p-6 desktop:p-10 largescreen:p-[15%]">
        <h2 className="text-start px-16 text-lg text-app-blue desktop:text-xl largescreen:text-2xl font-bold my-2">
          Login to Viliyo
        </h2>
        <form
          className="space-y-6  px-16 mobile:px-0 tablet:px-1"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <input
              className="h-12 rounded-3xl text-base desktop:text-lg largescreen:text-2xl outline-none border border-app-gray-light px-6 largescreen:h-16"
              type="text"
              id="username"
              placeholder="Email"
              {...register("username")}
              onChange={handleEmailChange} // Step 5
            />
            {!emailValid && errors.username?.message && (
              <span className="text-red-500">{errors.username?.message}</span>
            )}
          </div>
          <div className="flex flex-row justify-start gap-4 items-start">
            <div>
              <input
                type="radio"
                id="password"
                value="password"
                checked={authMethod === 'password'}
                onChange={handleAuthMethodChange}
              />
              <label htmlFor="password" className="text-lg text-app-blue font-bold ml-2">With Password</label>
            </div>
            <div>
              <input
                type="radio"
                id="otp"
                value="otp"
                checked={authMethod === 'otp'}
                onChange={handleAuthMethodChange}
                disabled={!emailValid} // Step 3
              />
              <label htmlFor="otp" className="text-lg text-app-blue font-bold ml-2">With OTP</label>
            </div>
          </div>
          
          <div className="flex flex-col">
            <div className="relative">
              <input
                placeholder={authMethod === 'password' ? 'Enter Password' : 'Enter OTP received on your registered email ID'}
                {...register("password")}
                className="h-12 rounded-3xl w-full outline-none border border-app-gray-light px-6 largescreen:h-16  text-lg"
                type={showPassword ? "text" : "password"}
              />
              <span
                className="absolute right-2 top-[25%]"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <RiEyeFill color="#D4D6DB" size={25} />
                ) : (
                  <RiEyeOffFill color="#D4D6DB" size={25} />
                )}
              </span>
            </div>

            {errors.password && (
              <span className="text-red-500">{errors.password.message}</span>
            )}
          </div>
          {authMethod === 'password' && (            
            <div className="text-start text-lge desktop:text-sm largescreen:text-lg underline">            
              <Link
                className="font-semibold text-app-blue ml-1"
                href={"./reset-password"}
              >
                Forgot your Password?
              </Link>
            </div>
          )}
          {authMethod === 'otp' && (
            <div className="text-start text-base desktop:text-sm largescreen:text-xl underline font-semibold text-app-blue ml-1">            
              <button
                disabled={resendTimer > 0}
                className={`font-normal ${resendTimer > 0 ? 'text-app-gray' : 'text-app-blue hover:underline'}`}
                onClick={() => resendOTP()}
              >
                Resend OTP {resendTimer > 0 && `in ${resendTimer} seconds`}
              </button>
            </div>
          )}
          <div className="px-14">
            <button
              className="flex flex-row bg-gradient-to-r shadow text-white text-lg enabled:hover:scale-105 enabled:from-app-blue enabled:to-app-purple w-full h-14 rounded-full desktop:text-lg largescreen:text-3xl disabled:bg-gray-500 disabled:cursor-wait"
              type="submit"
              disabled={isLoading}
            >
              <span className="flex mx-auto my-auto">
                Login
                {isLoading && <Loader size={30} />}
              </span>
            </button>
          </div>

          <div className="text-center">
            <span className="font-light text-app-gray-medium text-base desktop:text-sm largescreen:text-xl">
              Don’t have an account with us?
              <Link
                className="font-semibold text-app-blue ml-1 underline text-lg"
                href={"./signup"}
              >
                Create one
              </Link>
            </span>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
