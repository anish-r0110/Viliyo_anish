import IProfileData from "../../interfaces/ProfileData";

const transformSaveProfileData = (data: any): IProfileData => {
  return {
    id: data.id,
    firstName: data.firstName,
    lastName: data.lastName,
    age: data.ageGroup,
    industry: data.industry,
    organization: data.organization,
    role: data.role,
    city: data.city,
    country: data.country,
    website: data.website,
    interest: data.interest,
}}

export default transformSaveProfileData;
