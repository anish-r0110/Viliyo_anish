import React, { useState } from "react";
import { Button } from "@/components/buttons";
import { AppPage } from "@/layouts/types";
import PasswordInputVH from "@/components/inputs/PWDInputViewHide"; // Update the correct path
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import AuthenticationService from "@/services/Authentication";
import { alertInstance } from "@/components/alert";

const SetNewPasswordPage: AppPage = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const [passwordValidationErrors, setPasswordValidationErrors] = useState<
    string[]
  >([]);
  const authService = new AuthenticationService()
  const router = useRouter();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent default form submission behavior

    if (newPassword !== confirmPassword) {
      setPasswordMatchError(true);
      return;
    }

    // Password validation
    const errors: string[] = [];
    if (newPassword.length < 8) {
      errors.push("Password must be at least 8 characters long.");
    }
    if (!/\d/.test(newPassword)) {
      errors.push("Password must contain at least one number.");
    }
    if (!/[a-zA-Z]/.test(newPassword)) {
      errors.push("Password must contain at least one alphabet character.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(newPassword)) {
      errors.push("Password must contain at least one special character.");
    }
    setPasswordValidationErrors(errors);

    if (errors.length > 0) {
      return;
    }



    try {
      const response = await authService.setNewPassword(newPassword);
      console.log(
        "🚀 ~ file: set-newpassword.tsx:50 ~ handleSubmit ~ response:",
        response
      );

      if (response) {
        // Handle successful response from the API if required
        // For example, you can redirect the user to another page

        alertInstance.emit("showAlert", {
          type: "success",
          heading: "Password Changed Successfully",
          buttonText: "Ok",
          onOk: () => {
            router.push("/login");
          },
          onClose: () => {
            router.push("/login");
          },
        });
      } else {
        // Handle error response from the API if required
        toast.error("Error While Changing Password");
      }
    } catch (error) {
      console.error("Error while calling the API:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-app-gray-medium">
          Set New Password
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-start">
            <p className="text-app-gray-medium">Enter New Password</p>
            <PasswordInputVH
              value={newPassword}
              onChange={(value) => setNewPassword(value)}
              placeholder="New Password"
            />
          </div>
          <div className="mb-4 text-start">
            <p className="text-app-gray-medium">Confirm New Password</p>
            <PasswordInputVH
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
              placeholder="Confirm Password"
            />
            {passwordMatchError && (
              <p className="text-red-500 text-sm">Passwords do not match.</p>
            )}
            {passwordValidationErrors.map((error, index) => (
              <p key={index} className="text-red-500 text-sm">
                {error}
              </p>
            ))}
          </div>
          <Button
            type="submit"
            styles="outline-1 text-white bg-gradient-to-br from-40% from-app-blue to-app-purple px-20 py-2"
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

SetNewPasswordPage.Layout = "Guest";

export default SetNewPasswordPage;
