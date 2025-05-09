import { User } from "@/models/User";

export const transformUser = (data: any): User => {
  let fullname = "",
    firstName = "",
    lastName = "";

  if (data.trainee_name) {
    fullname = data.trainee_name as string;
    const [first, second] = fullname.split(" ");
    firstName = first;
    lastName = second;
  }

  return {
    id: data.id,
    name: data.first_name
      ? data.first_name + " " + data.last_name
      : data.trainee_name,
    firstName: data.first_name || firstName,
    lastName: data.last_name || lastName,
    email: data.trainee_email || data.social_media_id,
    ageGroup: data.age_group,
    profileImage: data.profile_photo || "http://localhost:3000/img/dummy.jpg",
    organization: data.organization,
    facebook: data.facebookLink,
    instagram: data.instagramLink,
    youtube: data.youtubeLink,
    linkedin: data.linkedinLink,
    profileMessage: data.hobbies,
    aboutMe: data.short_bio,
    website: data.website,
    industry: data.industry,
    designation: data.role,
    city: data.town_city,
    country: data.country,
  } as User;
};
