import React, { useState } from "react";
import { Button } from "@/components/buttons";
import { AppPage } from "@/layouts/types";
import { useRouter } from "next/router";
import Link from "next/link";

const VerifyEmailPage: AppPage = () => {
  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const router = useRouter();

  const validateEmail = async () => {
    if (email.trim() === "") {
      setIsValidEmail(false);
      return;
    }

    // Replace 'apiEndpointURL' with the actual API endpoint URL for email validation
    const apiEndpointURL =
      "https://vttapi.atwpl.com/api/v1/trainee/forgot_password";

    try {
      const response = await fetch(apiEndpointURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email }),
      });

      if (response.ok) {
        const data = await response.json();
        setIsValidEmail(data.error);
      } else {
        setIsValidEmail(false);
      }
    } catch (error) {
      console.error("Error while validating email:", error);
      setIsValidEmail(false);
    }
  };

  const validateEmailFormat = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    if (!validateEmailFormat()) {
      alert("Please enter a valid email address.");
      e.preventDefault();
      return;
    }
    await validateEmail(); // Wait for the validation to finish

    if (!isValidEmail) {
      alert("Please enter a valid email address.");
      e.preventDefault();
    }
    // else {
    //   // Perform further actions if the email is valid and registered
    //   console.log("Email is valid and registered. Submitting form...");
    //   router.push("/verify-otp");
    // }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4 text-app-gray-medium">
          Reset Password
        </h1>
        <p className="mb-4 text-app-gray-medium text-start">
          Enter your registered email id to receive OTP
        </p>
        <div className="mb-4 text-start">
          <input
            type="email"
            className={`border rounded-full w-full p-2 ${
              !isValidEmail ? "border-red-500" : ""
            }`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        {!isValidEmail && (
          <p className="text-red-500 mb-2 text-sm">
            Please enter a valid email address.
          </p>
        )}
        {/* <Button
          type="submit"
          styles="outline-1 text-white bg-gradient-to-br from-40% from-app-blue to-app-purple px-20 py-2"
          onClick={handleSubmit}
        >
          Submit
        </Button> */}
        <Link
          className="outline-1 text-white bg-gradient-to-br from-40% from-app-blue to-app-purple px-20 py-3 rounded-full"
          href={{
            pathname: "verify-otp",
            query: {
              title: "Enter Verification Code",
              link: "/set-newpassord",
            },
          }}
          onClick={handleSubmit}
        >
          Submit
        </Link>
      </div>
    </div>
  );
};

export default VerifyEmailPage;

VerifyEmailPage.Layout = "Guest";
