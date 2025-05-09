import React from "react";
import { Button } from "@/components/buttons";
import { AppPage } from "@/layouts/types";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import AuthenticationService from "@/services/Authentication";
import { BackNavigation } from "@/components/shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FieldValues, useForm } from "react-hook-form";

const ResetPasswordSchema = z.object({
  email: z.string().email("Invalid email address")
})

type FormData = z.infer<typeof ResetPasswordSchema>;

const ResetPassword: AppPage = () => {

  const router = useRouter();
  const authService = new AuthenticationService()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(ResetPasswordSchema) });

  const onSubmit = async(data: FieldValues) => {
      const response = await authService.forgotPasswordSendOtp(data.email);
      localStorage.setItem("x-forgot-token", response?.data?.token?.accessToken);
      if (response?.code == 200) {
        toast.success(response?.message);
        router.push(
          "/verify-otp?title=Enter Verification Code&type=forgotPassword"
        );
      } else {
        toast.error(response?.message);
      }
    
  };

  return (
    <div className="flex relative justify-center items-center h-screen">
      <div className="absolute top-10 left-10">
        <BackNavigation title="" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col text-center w-full px-[5%] h-full pt-[15%] mobile:pt-[50%] laptop:px-[10%] desktop:px-[15%] largescreen:px-[20%] xxl:pt-[30%]">
        <h1 className="text-center text-2xl desktop:text-xl largescreen:text-5xl my-10 font-medium">
          Reset Password
        </h1>
        <div className="mb-4 text-start outline-0">
          <input
            {...register("email") }
            type="email"
            className={` w-full h-12 rounded-xl text-base desktop:text-lg largescreen:text-2xl outline-none border border-app-gray-light px-6 largescreen:h-16${
              errors.email?.message ? "border-red-500" : ""
            }`}
            placeholder="Enter your registered email id to receive OTP"
           
          />
        </div>
        { errors.email?.message  && (
          <p className="text-red-500 mb-2 text-sm">{errors.email?.message}</p>
        )}
        <Button
          type="submit"
          styles="mt-[2%] outline-1 bg-gradient-to-r shadow text-white text-lg hover:scale-105 from-app-blue to-app-purple w-full h-12 rounded-full desktop:text-lg largescreen:text-3xl"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ResetPassword;
ResetPassword.Layout = "Guest";
