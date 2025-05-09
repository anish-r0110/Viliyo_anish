import axiosInstance from "@/config/axios";
import IAgeGroup from "@/interfaces/AgeGroup";
import ICountry from "@/interfaces/Country";
import IIndustry from "@/interfaces/Industry";
import { AppPage } from "@/layouts/types";
import { transformUser } from "@/middlewares/transform/transformerLogin";
import ApplicationService from "@/services/Application";
import { RootState } from "@/store";
import { ProfileFormSchema } from "@/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { AiOutlineMail } from "react-icons/ai";
import { VscEdit } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { z } from "zod";
import { uploadImages } from "../services/aws-upload";
import { BackNavigation } from "@/components/shared";
import { Success , Error } from "@/components/alert";

type FormData = z.infer<typeof ProfileFormSchema>;

const ProfilePage: AppPage = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [countries, setCountries] = useState<ICountry[]>([]);
  const [ageGroups, setAgeGroups] = useState<IAgeGroup[]>([]);
  const [industries, setIndustries] = useState<IIndustry[]>([]);
  const [profileImage, setProfileImage] = useState<string | undefined>();
  const [email, setEmail] = useState<string | undefined>();
  const [imageFile, setImageFile] = useState<File>();
  const appService = new ApplicationService();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isErrorAlert, setIsErrorAlert] = useState(false);

  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth.user);

  useEffect(() => {
    appService
      .getCountryList()
      .then((countryList) => setCountries(countryList));

    appService
      .getAgeGroupList()
      .then((ageGroupList) => setAgeGroups(ageGroupList));
    appService
      .getIndustryList()
      .then((industryList) => setIndustries(industryList));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(ProfileFormSchema),
  });

  const updateFormField = () => {
    if (auth != undefined && auth != null && auth) {
      setValue("firstName", auth?.firstName || "");
      setValue("lastName", auth?.lastName || "");
      setValue("website", auth?.website || "");
      setValue("linkedIn", auth?.linkedin || "");
      setValue("organization", auth?.organization || "");
      setValue("profileMessage", auth?.profileMessage || "");
      setValue("aboutMe", auth?.aboutMe || "");
      setValue("designation", auth?.designation || "");
      setValue("industry", auth?.industry || "");
      setValue("ageGroup", auth?.ageGroup || "");
      setValue("country", auth?.country || "");
      setValue("city", auth?.city || "");
      setProfileImage(auth.profileImage);
      setEmail(auth.email);
    }
  };

  useEffect(() => {
    updateFormField();
  }, []);

  const handleUpdateProfileImage = async (image) => {
    const result = await axiosInstance.post(
      "trainee/update_trainee_profile_image",
      {
        profilePhoto: image,
      }
    );
  };

  const onSubmit = async (data: FieldValues) => {
    setLoading(true);

    const requestData: any = {
      query: data.query,
      last_name: data.lastName,
      first_name: data.firstName,
      age_group: data.ageGroup,
      industry: data.industry,
      organization: data.organization,
      role: data.designation,
      town_city: data.city,
      country: data.country,
      website: data.website,
      linkedinLink: data.linkedIn,
      short_bio: data.aboutMe,
      hobbies: data.profileMessage,
    };

    if (profileImage && profileImage.includes("localhost")) {
      if (imageFile) {
        requestData["profile_photo"] = await uploadImages(imageFile);
        setProfileImage(requestData["profile_photo"]);
      }
    }

    try {
      const response: any = await axiosInstance.post(
        "/trainee/save_trainee_profile_data",
        requestData
      );
      console.log(response);
      setLoading(false);
      setIsOpen(true);
      let updateAuth = transformUser(response.data.trainee);
      if (updateAuth.profileImage?.includes("localhost")) {
        updateAuth.profileImage = auth?.profileImage;
      }

      if (response.code === 200) {
        // dispatch(loginSuccess(updateAuth as User));
        localStorage.setItem("userData", JSON.stringify(updateAuth));
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsErrorAlert(true);
    }
  };

  const handleImageChange = (event: any) => {
    const file = event.currentTarget.files[0];
    setImageFile(file);

    const image = URL.createObjectURL(
      new Blob([file], {
        type: "application/json",
      })
    );
    setProfileImage(image);
    handleUpdateProfileImage(image);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsErrorAlert(false);
  };

  return (
    <div className="flex-col">
      <BackNavigation title="Profile"></BackNavigation>
      {isLoading && <span className="w-full text-center"> Loading....</span>}

      {isOpen && (
        <Success
          heading="Profile Updated"
          content=""
          buttonText="Ok"
          onOkClick={() => handleClose()}
          onClose={() => handleClose()}
        />
      )}
      {isErrorAlert && (
        <Error
          heading="Error"
          content=""
          buttonText="Ok"
          onOkClick={() => handleClose()}
          onClose={() => handleClose()}
        />
      )}

      <form
        className="flex mr-6 h-full px-2 mx-2 mobile:flex-col"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="h-full mobile:flex-col mobile:justify-center ">
          <div className="flex flex-col bg-white rounded-xl max-w-[280px] items-center  p-4">
            <div className="flex space-x-2">
              <div className="my-6 border-2 border-app-yellow rounded-full">
                <Avatar
                  src={profileImage}
                  fallback="?"
                  size="9"
                  color="amber"
                ></Avatar>
                <input
                  onChange={handleImageChange}
                  ref={inputRef}
                  type="file"
                  id="image"
                  className="hidden"
                  accept="image/*" // Added accept attribute here
                />
              </div>
              <div
                onClick={() => {
                  if (inputRef.current !== null) inputRef.current.click();
                }}
              >
                <p className="text-white p-1 border-2 border-app-blue rounded-full bg-app-blue my-20 ">
                  <VscEdit />
                </p>
              </div>
            </div>

            <div>
              <h1 className="text-app-blue font-bold pt-2 text-base text-center">
                {getValues("firstName") + "  " + getValues("lastName")}
              </h1>
              <div>
                <div className="flex text-zinc-600  justify-center space-x-2">
                  <div className="py-1">
                    <AiOutlineMail />
                  </div>
                  <p> {email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-full p-2 text-app-gray-medium">
          <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-2 desktop:grid-cols-2 largescreen:grid-cols-2 gap-4 laptop:gap-y-2">
            <div className="flex flex-col max-w-[280] min-w-[240px] mobile:mt-2">
              <label htmlFor="firstName">First Name*</label>
              <input
                {...register("firstName")}
                id="firstName"
                type="text"
                placeholder="Enter your First Name"
                className="rounded-2xl border-1 h-10 p-2"
              />
              {errors.firstName && (
                <p className="text-red-500">{errors.firstName.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="lastName">Last Name*</label>
              <input
                {...register("lastName")}
                id="lastName"
                type="text"
                placeholder="Enter your Last Name"
                className="rounded-2xl border-2 h-10 p-2"
              />
              {errors.lastName && (
                <p className="text-red-500">{errors.lastName.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="ageGroup">Age Group</label>
              <select
                {...register("ageGroup")}
                className="rounded-xl border-2 h-10 px-2 text-zinc-600"
                placeholder="Select Age Group"
                id="ageGroup"
              >
                <option value="">Select Age Group</option>
                {ageGroups.map((opt, index) => (
                  <option
                    selected={
                      Number(getValues("ageGroup")) === opt.id ? true : false
                    }
                    key={index}
                    value={opt.id}
                  >
                    {opt.ageRange}
                  </option>
                ))}
              </select>
              {errors.ageGroup && (
                <p className="text-red-500">{errors.ageGroup.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="industry">Industry / Sector</label>
              <select
                {...register("industry")}
                className="rounded-xl border-2 h-10 px-2 text-zinc-700"
                placeholder="Select Industry"
                id="industry"
              >
                <option value="">Select Industry</option>
                {industries.map((industry, index) => (
                  <option
                    selected={
                      Number(getValues("industry")) === industry.id
                        ? true
                        : false
                    }
                    key={index}
                    value={industry.id}
                  >
                    {industry.name}
                  </option>
                ))}
              </select>
              {errors.industry && (
                <p className="text-red-500">{errors.industry.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="organization">Organization</label>
              <input
                {...register("organization")}
                id="organization"
                type="text"
                placeholder="Enter the Name of your Organization"
                className="rounded-2xl border-2 h-10 p-2"
              />
              {errors.organization && (
                <p className="text-red-500">{errors.organization.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="designation">Designation / Role</label>
              <input
                {...register("designation")}
                id="designation"
                type="text"
                placeholder="Enter your Designation/Role"
                className="rounded-2xl border-2 h-10 p-2"
              />
              {errors.designation && (
                <p className="text-red-500">{errors.designation.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="city">Town / City</label>
              <input
                {...register("city")}
                id="city"
                type="text"
                placeholder="Enter Town/City name "
                className="rounded-2xl border-2 h-10 p-2"
              />
              {errors.city && (
                <p className="text-red-500">{errors.city.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="country">Country</label>
              <select
                {...register("country")}
                className="rounded-xl border-2 h-10 px-2 text-zinc-700"
                placeholder="Select Industry"
                id="country"
              >
                <option value="">Select Country</option>
                {countries.map((country, index) => (
                  <option
                    selected={
                      Number(getValues("country")) === country.id ? true : false
                    }
                    key={country.id}
                    value={country.id}
                  >
                    {country.name}
                  </option>
                ))}
              </select>
              {errors.country && (
                <p className="text-red-500">{errors.country.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <label htmlFor="website">Website</label>
              <input
                {...register("website")}
                id="website"
                type="text"
                placeholder="Enter link ex: https://www.xyx.com"
                className="rounded-2xl border-2 h-10 p-2"
              />
              {errors.website && (
                <p className="text-red-500">{errors.website.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px] mobile:mt-2">
              <label htmlFor="linkedinLink">LinkedIn Profile URL</label>
              <input
                {...register("linkedIn")}
                id="linkedinLink"
                type="text"
                placeholder="Enter URL Eg. http://linkedin.com/xxxx"
                className="rounded-2xl border-1 h-10 p-2"
              />
              {errors.linkedIn && (
                <p className="text-red-500">{errors.linkedIn.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <div className="flex space-x-2">
                <label htmlFor="aboutMe">About Me </label>
                <span className="opacity-50"> (50 words)</span>
              </div>
              <textarea
                {...register("aboutMe")}
                id="aboutMe"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="write here"
              ></textarea>
              {errors.aboutMe && (
                <p className="text-red-500">{errors.aboutMe.message}</p>
              )}
            </div>
            <div className="flex flex-col max-w-[280] min-w-[240px]">
              <div className="flex space-x-2">
                {" "}
                <label htmlFor="profileMessage">
                  Areas of interest & Hobbies
                </label>
                <span className="opacity-50"> (50 words)</span>
              </div>
              <textarea
                {...register("profileMessage")}
                id="profileMessage"
                rows={4}
                className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="write here"
              ></textarea>
              {errors.profileMessage && (
                <p className="text-red-500">{errors.profileMessage.message}</p>
              )}
            </div>
            <div className="py-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-app-blue ${
                  isLoading ? "animate-bounce" : ""
                } text-xl text-white w-64 h-10 rounded-full  outline-1`}
              >
                {isLoading ? "Updating..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfilePage;

ProfilePage.Layout = "Admin";