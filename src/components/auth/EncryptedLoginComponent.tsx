import React, { useEffect, useState } from 'react';
import { RiEyeFill, RiEyeOffFill } from "react-icons/ri";
import usePasswordVisibility from "@/hooks/usePasswordVisibility";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import axiosInstance from '@/config/axios';

interface DecryptedParams {
  email: string | null;
  name: string | null;
  programId: string | null;
  batchId: string | null;
  type: string | null;
  registration: string | null;
  domain: string | null;
}

const decodeBase64 = (str: string) => {
  try {
    return decodeURIComponent(atob(str));
  } catch (e) {
    console.error("Failed to decode base64 string", e);
    return "";
  }
};

const EncryptedLoginComponent = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [decryptedParams, setDecryptedParams] = useState<DecryptedParams>({
    email: null,
    name: null,
    programId: null,
    batchId: null,
    type: null,
    registration: null,
    domain: null,
  });

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const { showPassword, togglePasswordVisibility } = usePasswordVisibility();
  const { showPassword: showConfirmPassword, togglePasswordVisibility: toggleConfirmPasswordVisibility } = usePasswordVisibility();

  useEffect(() => {
    // Parse URL parameters
    const queryParams = new URLSearchParams(window.location.search);
    const encryptedEmail = queryParams.get('email');
    const encryptedName = queryParams.get('name');
    const encryptedProgramId = queryParams.get('programId');
    const encryptedBatchId = queryParams.get('batchId');
    const encryptedType = queryParams.get('type');
    const encryptedRegistration = queryParams.get('registration');
    const encryptedDomain = queryParams.get('domain');
   

    // Decrypt parameters
    const decryptedEmail = encryptedEmail ? decodeBase64(encryptedEmail) : null;
    const decryptedName = encryptedName ? decodeBase64(encryptedName) : null;
    const decryptedProgramId = encryptedProgramId ? decodeBase64(encryptedProgramId) : null;
    const decryptedBatchId = encryptedBatchId ? decodeBase64(encryptedBatchId) : null;
    const decryptedType = encryptedType ? decodeBase64(encryptedType) : null;
    const decryptedRegistration = encryptedRegistration ? decodeBase64(encryptedRegistration) : null;
    const decryptedDomain = encryptedDomain ? decodeBase64(encryptedDomain) : null;


    console.log(`decryptedEmail = ${decryptedEmail}`);
    console.log(`decryptedName = ${decryptedName}`);
    console.log(`decryptedProgramId = ${decryptedProgramId}`);
    console.log(`decryptedBatchId = ${decryptedBatchId}`);
    console.log(`decryptedType = ${decryptedType}`);
    console.log(`decryptedRegistration = ${decryptedRegistration}`);
    console.log(`decryptedDomain = ${decryptedDomain}`);

    // Set decrypted parameters in state
    setDecryptedParams({
      email: decryptedEmail,
      name: decryptedName,
      programId: decryptedProgramId,
      batchId: decryptedBatchId,
      type: decryptedType,
      registration: decryptedRegistration,
      domain: decryptedDomain,
    });
  }, []);

  const splitName = (fullName: string) => {
    const names = fullName.split(" ");
    const lastName = names.pop() || "";
    const firstName = names.join(" ");
    return { firstName, lastName };
  };

  const validatePassword = (password: string) => {
    const errors = [];
    if (password.length < 8) errors.push("MUST contain at least 8 characters");
    if (!/[A-Z]/.test(password)) errors.push("MUST contain at least one uppercase letter");
    if (!/[a-z]/.test(password)) errors.push("MUST contain at least one lowercase letter");
    if (!/[0-9]/.test(password)) errors.push("MUST contain at least one number");
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) errors.push("MUST contain at least one special character");

    setValidationErrors(errors);
    return errors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
    } else if (!validatePassword(password)) {
      setPasswordError('');
    } else {
      setPasswordError('');



      // dispatch(loginStart());

      const { firstName, lastName } = splitName(decryptedParams.name || "");

      if (!decryptedParams.email) {
        // dispatch(loginFailure("Email is required"));
        return;
      }

      const userData = {
        email: decryptedParams.email,
        first_name: firstName,
        last_name: lastName,
        password: password,
        programId: decryptedParams.programId,
        batchId: decryptedParams.batchId,
        type: decryptedParams.type,
        registration: decryptedParams.registration,
        domain: decryptedParams.domain,
      };

      try {
        //const user = await authService.signup(userData.first_name,userData.last_name, userData.email ,userData.password );
        const user = await axiosInstance.post("/trainee/change_trainee_password")
        console.log("const user = await axiosInstance.post",user.data);

        if (user) {
          console.log("user = await authService.signup = ", user)
          // dispatch(loginSuccess(user));
          router.push('/login');
        } else {
          console.log("user is false")
          // dispatch(loginFailure("Signup failed"));
        }
      } catch (error) {
        console.error("Signup error:", error);
        // dispatch(loginFailure("Signup error"));
      }
    }
  };

  const toSentenceCase = (str: string) => {
    return str.replace(/\b\w/g, char => char.toUpperCase());
  };

  // const name = decryptedParams?.name;
  const { firstName} = splitName(decryptedParams.name || "");

  return (
    <form className="mobile:px-0 tablet:px-1" onSubmit={handleSubmit}>
      <div className='flex flex-col w-full justify-center items-center h-screen p-28 mobile:p-4'>
        <div className="flex items-start flex-col gap-3">
          <h2 className='text-3xl text-app-blue font-semibold'>Hey {firstName && toSentenceCase(firstName)}!</h2>
          <p className='text-lg mobile:text-sm text-app-blue font-normal flex-wrap'>
            Thanks for verifying your email id {decryptedParams?.email}. To proceed, set a Password for your Viliyo account.
          </p>
        </div>
        <div className="flex flex-col items-center m-10 gap-4 w-full">
          <div className="relative max-w-[500px] w-full">
            <input
              placeholder="Type Password"
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-3xl text-base desktop:text-lg largescreen:text-2xl outline-none border border-app-gray-light px-6 largescreen:h-16 w-full"
              type={showPassword ? "text" : "password"}
              style={{ maxWidth: "500px" }}
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
          <div className="relative max-w-[500px] w-full">
            <input
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 rounded-3xl text-base desktop:text-lg largescreen:text-2xl outline-none border border-app-gray-light px-6 largescreen:h-16 w-full"
              type={showConfirmPassword ? "text" : "password"}
              style={{ maxWidth: "500px" }}
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
          <div className="flex flex-col gap-1">
            {validationErrors.map((error, index) => (
              <p key={index} className="text-red-500">{error}</p>
            ))}
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
          <div className="flex justify-center">
            <button type="submit" className="flex bg-app-blue hover:bg-app-purple text-white font-bold py-4 px-8 justify-center rounded-full text-lg">
              Set Password & Login
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EncryptedLoginComponent;