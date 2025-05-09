import axiosInstance from "@/config/axios";
import AppStorage from "./AppStorage";
import { User } from "@/models/User";
import { transformUser } from "@/middlewares/transform/transformerLogin";
import toast from "react-hot-toast";

class AuthenticationService {
  isAuthenticated(): boolean {
    throw new Error("Method not implemented.");
  }

  private static instance: AuthenticationService;
  private token: string | null = null;
  private userData: any | null;
  private _storage = new AppStorage();

  public static getInstance(): AuthenticationService {
    if (!AuthenticationService.instance) {
      AuthenticationService.instance = new AuthenticationService();
    }
    return AuthenticationService.instance;
  }

  public getToken(): string | null {
    return this.token;
  }

  public setToken(token: string | null): void {
    this.token = token;
    this._storage.setItem("token", token || "");
  }

  public getUserData(): any | null {
    return this.userData;
  }

  public setUserData(userData: any | null): void {
    this.userData = userData;
    this._storage.setItem("userData", userData);
  }

  public async login(
    username: string,
    password: string
  ): Promise<User | boolean> {
    try {
      // Make an HTTP request to the login endpoint
      const credentials = {
        trainee_email: username,
        trainee_password: password,
      };
      const response = await axiosInstance.post("/trainee/login", credentials);
      let { token, user } = response.data;
      user = transformUser(user);
      this.setToken(token);
      this.setUserData(user);
      return user as User;
    } catch (error) {
      return false;
    }
  }

  public async loginWithOtp(
    username: string,
  ): Promise<User | boolean> {
    try {
      // Make an HTTP request to the login endpoint
      const credentials = {
        trainee_email: username,
        loginWithOtp: true,
      };
      const response = await axiosInstance.post("/trainee/login", credentials);
      let { token, user } = response.data;
      user = transformUser(user);
      this.setToken(token);
      this.setUserData(user);
      console.log("user = ", user)
      return user as User;
    } catch (error) {
      return false;
    }
  }

  public async signup(
    firstName: string,
    lastName: string,
    email: string,
    password: string

  ): Promise<User | boolean> {
    try {
      // Make an HTTP request to the login endpoint
      const credentials = {
        trainee_name: firstName + " " + lastName,
        first_name: firstName,
        last_name: lastName,
        trainee_email: email,
        trainee_password: password,
        joineByCommonLink: true,
      };

      // For getting the response and saving the token and user data after destructuring.
      const response = await axiosInstance.post(
        "/trainee/sign_up_with_email",
        credentials
      );
      if (response.error) {
        toast.error(response.message);
      }
      let { token, user } = response.data;
      user = transformUser(user);
      this.setToken(token);
      this.setUserData(user);
      return user as User;
    } catch (error) {
      return false;
    }
  }

  // Send Otp API
  public async sendOtp(email: string): Promise<User | boolean> {
    try {
      // Make an HTTP request to the login endpoint
      const data = {
        email: email,
      };
      // For getting the response and saving the token and user data after destructuring.
      const response = await axiosInstance.post(
        "/trainee/sign_up_with_email",
        data
      );
      let { token, user } = response.data;
      user = transformUser(user);
      this.setToken(token);
      this.setUserData(user);
      return user as User;
    } catch (error) {
      return false;
    }
  }

  // Send Otp API
  public async verifyOtp(otp: string): Promise<User | boolean | any> {
  console.log("otp is coming herer at Authentication.VerifyOtp = ", otp)

    try {
      // Make an HTTP request to the login endpoint
      const data = {
        otp: otp,
      };
      // For getting the response and saving the token and user data after destructuring.
      const response = await axiosInstance.post("/trainee/verify_email", data);
      if (response.code === 200)
        return { code: response?.code, message: response?.message };
      else toast.error(response.message);
    } catch (error) {
      return false;
    }
  }

  public async forgotPasswordSendOtp(
    email: string
  ): Promise<User | boolean | any> {
    try {
      // Make an HTTP request to the login endpoint
      const data = {
        email: email,
      };
      // For getting the response and saving the token and user data after destructuring.
      const response = await axiosInstance.post(
        "/trainee/forgot_password",
        data
      );
      return response;
    } catch (error) {
      return false;
    }
  }

  public async forgotPasswordVerifyOtp(
    otp: string
  ): Promise<User | boolean | any> {
    try {
      // Make an HTTP request to the login endpoint
      const data = {
        newUser: false,
        otp: otp,
      };
      const token = localStorage.getItem("x-forgot-token");

      const response = await axiosInstance.post('/trainee/verify_otp' , data, {
         headers:{ Authorization:'Bearer' + token }
      });

      localStorage.removeItem('x-forgot-token');
      return response;
    } catch (error) {
      return false;
    }
  }

  public async signupWithSocial(
    name: string,
    media_id: string,
    media_type: string
  ): Promise<User | boolean> {
    try {
      // Make an HTTP request to the login endpoint
      const signUpMediaUser = {
        trainee_name: name,
        social_media_id: media_id,
        social_media_type: media_type,
      };

      // For getting the response and saving the token and user data after destructuring.
      const response = await axiosInstance.post(
        "/trainee/login_or_signUpWith_SocialMedia",
        signUpMediaUser
      );
      let { token, user } = response?.response?.data;
      user = transformUser(user);
      this.setToken(token);
      this.setUserData(user);
      return user as User;
    } catch (error) {
      return false;
    }
  }

  public async setNewPassword(newPassword: string): Promise<boolean | any> {
    try {
      // Make an HTTP request to the login endpoint
      const data = {
        newPassword: newPassword,
      };

      const token = localStorage.getItem("ForgotPasswordAccessToken");
      const response = await fetch(
        "https://vttapi.atwpl.com/api/v1/trainee/change_trainee_password",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
          },
          body: JSON.stringify(data),
        }
      );
      // For getting the response and saving the token and user data after destructuring.
      if (response.ok) return response;
      else return false;
    } catch (error) {
      return false;
    }
  }

  public async resendOtp(type: string): Promise<boolean | any> {
    try {
      // Make an HTTP request to the login endpoint
      if (type === "signup") {
        const token = JSON.parse(localStorage.getItem("token") || "");

        if (token.accessToken) {
          const response = await fetch(
            "https://vttapi.atwpl.com/api/v1/trainee/resend_otp",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token.accessToken,
              },
            }
          );
          if (response.ok) {
            toast.success("Otp Sent Successfully");
            return response;
          } else toast.error("Something Went Wrong");
        } else {
          toast.error("Please Try Signup Again");
        }
      }

      if (type === "forgotPassword") {
        const token = localStorage.getItem("ForgotPasswordAccessToken");

        if (token) {
          const response = await fetch(
            "https://vttapi.atwpl.com/api/v1/trainee/resend_otp",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                authorization: "Bearer " + token,
              },
            }
          );
          if (response.ok) {
            toast.success("Otp Sent Successfully");
            return response;
          } else toast.error("Something Went Wrong");
        } else {
          toast.error("Please Try Signup Again");
        }
      }

      // For getting the response and saving the token and user data after destructuring.
      // const response = await axiosInstance.post('/trainee/login_or_signUpWith_SocialMedia', signUpMediaUser );
      // let { token, user } = response?.response?.data;
      // user = transformUser( user )
      // this.setToken(token);
      // this.setUserData(user);
      // return user as User
    } catch (error) {
      return false;
    }
  }

  public checkAuthorization(): boolean {
    // Replace this with your actual authorization logic
    const userData = this.getUserData();
    return !!userData; // Return true if user data exists, indicating authorized user
  }

  public logout(): Promise<void> {
    this.setToken(null);
    this.setUserData(null);
    this._storage.clear();
    return new Promise(() => {});
  }
}

export default AuthenticationService;
