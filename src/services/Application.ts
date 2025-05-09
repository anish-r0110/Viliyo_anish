import axiosInstance from "@/config/axios";
import IAgeGroup from "@/interfaces/AgeGroup";
import ICountry from "@/interfaces/Country";
import IIndustry from "@/interfaces/Industry";
import IProfileData from "@/interfaces/ProfileData";
import transformAgeGroup from "@/middlewares/transform/ageGroup";
import transformCountry from "@/middlewares/transform/country";
import transformIndustry from "@/middlewares/transform/industry";
import transformSaveProfileData from "@/middlewares/transform/saveProfileData";
import transformGetProfileData from "../middlewares/transform/getProfile";

export default class ApplicationService {
  async SaveProfileData(
    firstName: string,
    lastName: string,
    ageGroup: string,
    industry: string,
    organization: string,
    designation: string,
    city: string,
    country: string,
    aboutMe: string,
    website: string,
    profileMessage: string,
    linkedinLink: string
  ): Promise<IProfileData[]> {
    try {
      const response = await axiosInstance.post(
        "/trainee/save_trainee_profile_data",
        {
          first_name: firstName,
          last_name: lastName,
          age_group: ageGroup,
          industry: industry,
          organization: organization,
          role: designation,
          town_city: city,
          country: country,
          website: website,
          short_bio: profileMessage,
          aboutMe: aboutMe,
          linkedinLink: linkedinLink,
        }
      );
      let profileData: IProfileData[] = response.data.map((el: any) =>
        transformSaveProfileData(el)
      );

      return profileData;
    } catch (error) {
      return [];
    }
  }

  async postProfileImage(profilePhoto: string) {
    try {
      const response = await axiosInstance.post(
        "/trainee/update_trainee_profile_image",
        { profilePhoto: profilePhoto }
      );

      let profileImage: IProfileData[] = response.data.map((el: any) =>
        transformSaveProfileData(el)
      );

      console.log("profileImage", profileImage);
      return profileImage;
    } catch (error) {
      return [];
    }
  }

  async getProfileData() {
    try {
      const response = await axiosInstance.get(
        "/trainee/get_trainee_profile_data"
      );

      let getProfileData: IProfileData = response.data.userData;
      return getProfileData;
    } catch (error) {
      return [];
    }
  }

  async getCountryList(): Promise<ICountry[]> {
    try {
      const response = await axiosInstance.get("/master/get_country_list");
      let countries: ICountry[] = response.data.map((el: any) =>
        transformCountry(el)
      );

      return countries;
    } catch (error) {
      return [];
    }
  }

  async getIndustryList(): Promise<IIndustry[]> {
    try {
      const response = await axiosInstance.get("/master/get_sectors_list");
      let countries: ICountry[] = response.data.map((el: any) =>
        transformIndustry(el)
      );
      return countries;
    } catch (error) {
      return [];
    }
  }

  async getAgeGroupList(): Promise<IAgeGroup[]> {
    try {
      const response = await axiosInstance.get("/trainee/get_age_group_data");
      let ageGroups: IAgeGroup[] = response.data.map((el: any) =>
        transformAgeGroup(el)
      );
      return ageGroups;
    } catch (error) {
      return [];
    }
  }
}
