import IProfileData from "../../interfaces/ProfileData";

const transformGetProfileData = (userData: any): IProfileData => {
  return {
    id: userData.id,
    userName: userData.userName,
    fullName: userData.fullName,
    email: userData.email,
    status:userData.status,
  };
};

export default transformGetProfileData;
