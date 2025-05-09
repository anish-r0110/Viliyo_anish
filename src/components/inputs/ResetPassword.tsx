import axiosInstance from "@/config/axios";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import { z } from "zod";
import { Error, Success } from "../alert";
import { Button } from "../buttons";

const schema = z.object({
  currentPassword: z.string(),
  newPassword: z.string(),
  confirmNewPassword: z.string(),
});

type FormData = z.infer<typeof schema>;

const ResetPassword = () => {
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const {
    showPassword: showNewPassword,
    togglePasswordVisibility: toggleNewPasswordVisibility,
  } = usePasswordVisibility();
  const {
    showPassword: showConfirmPassword,
    togglePasswordVisibility: toggleConfirmPasswordVisibility,
  } = usePasswordVisibility();
  const {
    showPassword: showCurrentPassword,
    togglePasswordVisibility: toggleCurrentPasswordVisibility,
  } = usePasswordVisibility();

  const [showReSendOtpModal, setShowReSendOtpModal] = useState(false);

  const handleCancelClick = () => {
    reset();
  };

  const handleCloseModal = () => {
    setShowForgotPasswordModal(false);
  };

  const handleCloseResendOtpModal = () => {
    setShowReSendOtpModal(false);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,

    formState: { errors, isValid, isDirty, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const [isOpen, setIsOpen] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);

  const handleClose = () => {
    setIsOpen(false);
    setIsErrorAlert(false);
  };

  const onSubmit = async (data: FieldValues) => {
    console.log("onsubmit clicked");
    {
      try {
        const response: any = await axiosInstance.post(
          "/trainee/reset_trainee_password",
          {
            currentPassword: data.currentPassword,
            newPassword: data.confirmNewPassword,
          }
        );
        console.log("resPassword", response);
        if (response.code === 200) {
          setIsOpen(true);
        } else setIsErrorAlert(true);
        reset();
      } catch (error) {
        throw error;
      }
    }
  };

  return (
    <>
      <div className="h-screen w-[800px] mobile:w-full tablet:w-full">
        {isOpen && (
          <Success
            heading="Password Changed Successfully"
            content=""
            buttonText="Ok"
            onOkClick={() => handleClose()}
            onClose={() => handleClose()}
          />
        )}
        {isErrorAlert && (
          <Error
            heading="Could Not Reset your Password"
            content=""
            buttonText="Ok"
            onOkClick={() => handleClose()}
            onClose={() => handleClose()}
          />
        )}
        <h2 className="text-3xl font-bold text-app-blue text-[20px] mobile:text-base">
          Reset Password
        </h2>
        <hr className="h-0.5 bg-app-blue mb-2 " />

        <div className="w-full">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 mobile:text-lg space-y-2">
              <div className="text-[16px] font-medium text-app-blue mobile:text-lg">
                Enter your current password here to proceed.
              </div>
              <div className="col-span-1 h-full ">
                <label className="text-app-gray-medium font-medium w-full col-span-2 mobile:text-lg">
                  Current Password
                </label>
                <div className="w-full relative">
                  <input
                    {...register("currentPassword")}
                    type={showCurrentPassword ? "text" : "password"}
                    id="currentPassword"
                    placeholder="Enter Current Password"
                    className="w-1/2 mobile:w-full rounded-full shadow-sm text-lg outline-none border border-app-gray-light p-3"
                  />
                  <span
                    className="absolute -ml-8 top-[25%]"
                    onClick={toggleCurrentPasswordVisibility}
                  >
                    {showNewPassword ? (
                      <RiEyeFill color="#D4D6DB" size={25} />
                    ) : (
                      <RiEyeOffFill color="#D4D6DB" size={25} />
                    )}
                  </span>
                </div>
              </div>
            </div>
            <hr className="border-dotted  bg-app-blue w-11/12"></hr>
            <p className="text-[16px] font-medium text-app-blue mb-2 py-2 mobile:text-lg">
              Set a new password for your account.
            </p>
            <div className="grid grid-cols-2 space-y-2 mobile:text-lg mobile:grid-cols-1 m-2">
              <div className="col-span-1 h-full ">
                <label className="text-app-gray-medium font-medium w-full col-span-2 mobile:text-lg ">
                  New Password
                </label>
                <div className="relative">
                  <input
                    {...register("newPassword")}
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter New Password"
                    className="w-full rounded-full shadow-sm text-lg outline-none border border-app-gray-light p-3"
                  />
                  <span
                    className="absolute right-2 top-[25%]"
                    onClick={toggleNewPasswordVisibility}
                  >
                    {showNewPassword ? (
                      <RiEyeFill color="#D4D6DB" size={25} />
                    ) : (
                      <RiEyeOffFill color="#D4D6DB" size={25} />
                    )}
                  </span>
                </div>
                <p className="text-app-gray-medium font-medium col-span-2 mt-4 mobile:text-lg ">
                  Confirm New Password
                </p>
                <div className="relative   ">
                  <input
                    {...register("confirmNewPassword")}
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirmNewPassword"
                    placeholder="Confirm New Password"
                    className="w-full rounded-full shadow-sm text-lg outline-none border border-app-gray-light p-3"
                  />
                  <span
                    className="absolute right-2 top-[25%]"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? (
                      <RiEyeFill color="#D4D6DB" size={25} />
                    ) : (
                      <RiEyeOffFill color="#D4D6DB" size={25} />
                    )}
                  </span>
                </div>
              </div>

              <div className="col-span-2 w-full mobile:text-lg">
                <div className="flex col-span-2">
                  <span className="w-1/2 mr-4"></span>
                </div>
                <div className="flex ml-4"></div>
              </div>
            </div>

            <div className="flex space-y-4">
              <span className="py-4">
                {!isDirty ? (
                  <button className="rounded-full bg-[#C4C4C4] shadow-md text-white font-bold outline-none px-12 mobile:p-2 mobile:text-lg py-2">
                    Update Password
                  </button>
                ) : (
                  <button
                    disabled={!isDirty || !isValid || isSubmitting}
                    className={`rounded-full  py-2 bg-gradient-to-r from-[#363E70] to-[#FF6DF8] shadow-md text-white font-bold outline-none px-12 mobile:p-2 mobile:text-lg `}
                  >
                    Update Password
                  </button>
                )}
              </span>
            </div>
          </form>
          <span className="mx-8 mobile:mx-4 bottom-20 left-64 relative">
            <div>
              <Button
                onClick={handleCancelClick}
                styles="font-bold outline-1 text-app-blue px-12 mobile:px-0 mobile:w-20 mobile:text-lg"
              >
                Cancel
              </Button>
            </div>
          </span>
        </div>

        {/* Forgot Password Modal */}
        {showForgotPasswordModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Add your modal content here */}
            <div className="bg-white rounded-lg p-8">
              <h2 className="text-2xl font-bold">Forgot Password</h2>
              <button
                onClick={handleCloseModal}
                className="text-app-blue font-medium mt-4"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {showReSendOtpModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            {/* Add your modal content here */}
            <div className="flex flex-col bg-white rounded-lg p-8 items-center">
              <h2 className="text-2xl font-bold">
                OTP sent to your registered email
              </h2>
              <button
                onClick={handleCloseResendOtpModal}
                className="text-app-blue font-medium mt-4 outline-2 border px-12 rounded-full text-base"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
