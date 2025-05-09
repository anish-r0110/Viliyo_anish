import { ReactNode, useEffect } from "react";
import { useRouter } from "next/router";
import AuthenticationService from "@/services/Authentication";

const RouteGaurd = ({ children }: { children: ReactNode }) => {
  const authService = AuthenticationService.getInstance();
  const router = useRouter();

  useEffect(() => {
    // Check if the user is authorized
    const isAuthorized = authService.checkAuthorization(); // Implement this method in AuthenticationService
    const currentPath = router.pathname;

    if (!isAuthorized && !isAllowedPath(currentPath)) {
      // Redirect to the login page
      router.push("/login");
    }
  }, []);

  function isAllowedPath(path: string): boolean {
    // Add the paths that should be accessible even if the user is not authorized
    const allowedPaths = ["/public", "/about"]; // Example allowed paths

    return allowedPaths.includes(path);
  }

  if (authService.checkAuthorization()) {
    // Render the content of the authenticated routes
    return <>{children}</>;
  } else {
    // Render a placeholder or loading state while checking authorization
    return <div>Loading...</div>;
  }
};

export default RouteGaurd;
