import { TermsCondition } from "@/components/auth";
import { Loader } from "@/components/shared";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { AppPage } from "@/layouts/types";
import { AppDispatch, RootState } from "@/store";
import { signup } from "@/store/reducers/authentication";
import { SignupFormSchema } from "@/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";




type FormData = z.infer<typeof SignupFormSchema>;

const SignupPage: AppPage = () => {
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const [isTermsDialogOpen, setIsTermsDialogOpen] = useState(false); // Toogle Terms and Dailougue Window
  const {
    showPassword: showConfirmPassword,
    togglePasswordVisibility: toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();

  const auth = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(SignupFormSchema) });

  const router = useRouter();


  const handleSignup = async (data: FieldValues) => {
    if (data.isAgreementChecked) {
     const response:any = await dispatch(signup({ firstName:data.firstName , lastName:data.LastName , email:data.email , password:data.password })) 
  
      if( response.payload.user ) 
        router.push(`/verify-otp?title=${"Enter Verification Code"}&type=${"signup"}`);
      else toast.error( auth.error )
    }
    else toast.error('Please agree the Terms and Conditions');
  }



  return (
    <div className="flex justify-center items-center h-screen">
      <div className="flex px-20 items-center text-center mobile:px-4">
        <form
          className="space-y-2 mobile:p-0  tablet:p-1 w-full"
          onSubmit={handleSubmit(handleSignup)}
        >
          <h2 className="text-start text-2xl text-app-blue font-bold">
        Hi! Let’s Sign You Up!  
        </h2>
          <div className="flex flex-row justify-between  mobile:flex-col gap-2">
            <div className="flex flex-1 flex-col">
              <input
                className=" rounded-full text-lg  outline-none border border-app-gray-light px-6 h-12 w-full"
                type="text"
                id="firstName"
                placeholder="First Name"
                {...register("firstName")}
              />
              {errors.firstName?.message && (
                <span className="text-red-500">{errors.firstName?.message}</span>
              )}
            </div>
    
            <div className="flex flex-1 flex-col">
              <input
                className=" rounded-full text-lg  outline-none border border-app-gray-light px-6 h-12 w-full"
                type="text"
                id="lastName"
                placeholder="Last Name"
                {...register("lastName")}
              />
              {errors.lastName?.message && (
                <span className="text-red-500">{errors.lastName?.message}</span>
              )}
            </div>
          </div>
    
          <div className="flex flex-col">
            <input
              className=" rounded-full text-lg  outline-none border border-app-gray-light px-6 h-12 w-full"
              type="text"
              id="email"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email?.message && (
              <span className="text-red-500">{errors.email?.message}</span>
            )}
          </div>
    
          <div className="flex flex-col">
            <div className="relative">
              <input
                placeholder="Password"
                {...register("password")}
                className=" rounded-full text-lg  outline-none border border-app-gray-light px-6 h-12 w-full"
                type={showPassword ? "text" : "password"}
              />
              <span
                className="absolute right-6 top-[25%]"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <RiEyeFill color="#D4D6DB" size={25} />
                ) : (
                  <RiEyeOffFill color="#D4D6DB" size={25} />
                )}
              </span>
            </div>
    
            {errors.password?.message && (
              <span className="text-red-500">{errors.password?.message}</span>
            )}
          </div>
    
          <div className="flex flex-col">
            <div className="relative">
              <input
                placeholder="Confirm Password"
                {...register("confPassword")}
                className=" rounded-full text-lg  outline-none border border-app-gray-light px-6 h-12 w-full"
                type={showConfirmPassword ? "text" : "password"}
              />
              <span
                className="absolute right-6 top-[25%]"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? (
                  <RiEyeFill color="#D4D6DB" size={25} />
                ) : (
                  <RiEyeOffFill color="#D4D6DB" size={25} />
                )}
              </span>
            </div>
    
            {errors.confPassword?.message && (
              <span className="text-red-500">{errors.confPassword.message}</span>
            )}
          </div>
    
          <div className="flex flex-row items-center text-right justify-start text-base">
            <input
              type="checkbox"
              id="agreeCheckbox"
              {...register('isAgreementChecked')}
              className="form-checkbox h-4 w-4 ml-2 text-app-blue mr-2 focus:ring-0"
            />
            <label htmlFor="agreeCheckbox">I agree to the </label>
            <span
              className="font-semibold text-app-blue ml-1 cursor-pointer"
              onClick={() =>  setIsTermsDialogOpen(true)}
            >
              Terms of Service
            </span>
          </div>
          {/* Add this span for displaying the error message */}
          {errors.isAgreementChecked && (
            <span className="text-red-500">{errors.isAgreementChecked.message}</span>
          )}
    
          <div className="flex flex-row justify-between space-x-4 items-baseline">

            <div className="flex">
              <button
                className="flex bg-gradient-to-r shadow text-white font-bold px-20 mobile:px-8 hover:scale-105 from-app-blue to-app-purple w-full py-2 rounded-full"
                type="submit"
                disabled={auth.isLoading}
              >
                <span className="whitespace-nowrap">
                  Sign up
                  {auth.isLoading && <Loader size={30} />}
                </span>
              </button>
            </div>  
            <div className="flex text-base mobile:text-sm" >
              <span className="">
                Already have an account with us? &nbsp;
                <Link className="font-bold text-app-blue underline" href={"./login"}>
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
    
        <div>
          {isTermsDialogOpen && <TermsCondition onClose={() => setIsTermsDialogOpen(false)} />}
        </div>
      </div>
    </div>
  );

  
};

export default SignupPage;
SignupPage.Layout = "Guest";