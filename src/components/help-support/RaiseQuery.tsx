import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/buttons";
import { toast } from "react-hot-toast";
import FileUploader from "./FileUploader";
import axiosInstance from "@/config/axios";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { uploadImages } from "@/services/aws-upload";
import UnderLineTitle from "../shared/UnderlineTitle";
import { RaiseQueryFormSchema } from "@/zod.schema";

type QueryFormData = z.infer<typeof RaiseQueryFormSchema>;

const RaiseQuery = () => {
  const auth = useSelector((state: RootState) => state.auth.user);
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [parentValue, setParentValue] = useState("");

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<QueryFormData>({
    resolver: zodResolver(RaiseQueryFormSchema),
  });

  const needCallBack = watch("needCallBack");

  const handleFileChangeInChild = (file: File | null) => {
    setScreenshot(file);
    setParentValue(file ? file.name : "No file selected");
  };

  const onSubmit = async (data: QueryFormData) => {
    const { message, needCallBack, phoneNumber } = data;

    try {
      let mediaFile = "";
      if (screenshot) {
        mediaFile = await uploadImages(screenshot);
      }

      const payLoad = {
        query: message,
        description: message,
        callbackRequired: needCallBack,
        contact_number: phoneNumber,
        phone: phoneNumber,
        media_file: mediaFile,
        file: mediaFile,
        need_call_back: needCallBack,
        email: auth?.email,
        username: auth?.name,
      };

      const response = await axiosInstance.post(
        "support/raise_support_query",
        payLoad
      );

      if (!response.data.error) {
        toast.success("Query submitted successfully!");
        // Reset form fields
        setValue("message", "");
        setScreenshot(null);
        setValue("phoneNumber", "");
        setValue("needCallBack", false);
        setParentValue("No File Selected");
      } else {
        toast.error("Error submitting query");
      }
    } catch (error: any) {
      toast.error(error.toString());
    }
  };

  return (
    <>
      <UnderLineTitle title="Raise Query" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 p-2 items-baseline">
          <div className="col-span-1 mobile:col-span-2 tablet:col-span-2">
            <Controller
              name="message"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="message"
                  rows={8}
                  className="block p-2.5 w-full italic text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Type your query here"
                />
              )}
            />
            {errors.message && (
              <p className="text-red-500">{errors.message.message}</p>
            )}
          </div>

          <div className="text-right col-span-1 items-baseline mobile:text-center tablet:text-start tablet:text-sm mobile:space-y-4 mobile:col-span-2 tablet:col-span-2 text-[16px] m-4">
            <div className="w-full flex mobile:flex-col items-center space-y-4 tablet:text-sm">
              <div className="flex flex-row gap-4 mb-4">
                <div className="flex mx-2 text-lg">
                  I need a call back from Viliyo
                </div>
                <div className="flex mx-2">
                  <label className="cursor-pointer">
                    <Controller
                      name="needCallBack"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          value="yes"
                          checked={field.value === true}
                          onChange={() => field.onChange(true)}
                        />
                      )}
                    />
                    &nbsp;<span className="text-xl">Yes</span>
                  </label>
                  <label className="cursor-pointer ml-4">
                    <Controller
                      name="needCallBack"
                      control={control}
                      render={({ field }) => (
                        <input
                          {...field}
                          type="radio"
                          value="no"
                          checked={field.value === false}
                          onChange={() => field.onChange(false)}
                        />
                      )}
                    />
                    &nbsp;<span className="text-xl">No</span>
                  </label>
                </div>
              </div>
            </div>
            {needCallBack && (
              <div className="flex col-span-2 items-baseline gap-2">
                <label className="text-lg whitespace-nowrap mt-2 flex col-span-1 font-bold ml-1">
                  Phone
                </label>
                <Controller
                  name="phoneNumber"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      maxLength={10}
                      placeholder="Enter contact number"
                      className="w-[300px] rounded-3xl border border-gray-300 focus:border-app-purple text-lg mr-14 ml-0 py-1 px-4 items-baseline mobile:mr-2"
                    />
                  )}
                />
                {errors.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber.message}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-row col-span-1 mobile:col-span-2 mobile:flex mobile:justify-center tablet:col-span-2 items-end gap-4 mb-2">
            <p className="flex flex-grow w-[240px] py-2 justify-center border-2 text-xs">
              {parentValue || "No file selected"}
            </p>
            <FileUploader
              title="Attach a File"
              key={screenshot?.name}
              onFileChange={handleFileChangeInChild}
            />
          </div>
          <div className="col-span-2 mobile:mt-4 mobile:flex mobile:justify-center text-[14px] text-left">
            <Button
              type="submit"
              styles="bg-gradient-to-br px-12 from-40% from-app-blue to-app-purple text-white hover:scale-105"
            >
              Submit Query
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

export default RaiseQuery;
