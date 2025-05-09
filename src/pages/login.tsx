// loginNew.tsx
import { AppPage } from "@/layouts/types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useSearchParams } from 'next/navigation';
import { EncryptedLoginComponent, LoginForm } from "@/components/auth";


const LoginNewPage: AppPage = () => {
  const searchParams = useSearchParams();
  const emailId = searchParams.get("email");
  const name = searchParams.get("name");

  const router = useRouter();
  const [isEmailLink, setIsEmailLink] = useState(false);
  const [isNameLink, setIsNameLink] = useState(false);

  useEffect(() => {
    if(emailId) {
      setIsEmailLink(true);
    }
    if(name) {
      setIsNameLink(true);
    }

    if (router.isReady) {
      const hasEmailAndNameParams = typeof router.query.email === 'string' && typeof router.query.name === 'string';      
      setIsEmailLink(hasEmailAndNameParams);
    }
  }, [router.isReady,emailId,name, router.query.email, router.query.name]); // Include router.query.email and router.query.name in the dependency array

  return (
    <>
      {isEmailLink ? (
        <EncryptedLoginComponent />
      ) : (
        <LoginForm />
      )}
    </>
  );
};

export default LoginNewPage;

LoginNewPage.Layout = "Guest";
