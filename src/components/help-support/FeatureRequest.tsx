import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import Image from "next/image";
import { Button } from "../buttons";
import { toast } from "react-hot-toast";
import featureRequestImage from "@/assets/images/help-center5.png";
import axiosInstance from "@/config/axios";

const FeatureRequest = () => {
  const schema = z.object({
    featureRequest: z
      .string()
      .nonempty({ message: "Please enter a feature request" }),
  });

  type FormData = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    try {
      setSubmitting(true);
      if (data.featureRequest) {
        const formData = {
          feature_request: data.featureRequest
        }
  
        const response = await axiosInstance.post("/support/create_feature_request",formData)
        console.log("Response:", response);

        toast.success("Feature Request submitted successfully");
        reset(); // Clear the textarea on successful submission
      }
    } catch (error) {
      console.error("Error submitting feature request:", error);
      toast.error("Error submitting feature request: " + error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <div className=" flex mobile:flex-col rounded-xl p-4 justify-between items-center bg-app-blue text-white w-full">
        <div className="text-left">
          <span className=" font-bold text-xl  text-app-yellow  text-left mobile:text-sm ">
            Thinking of a feature that can help you learn better? Let Viliyo
            know!
          </span>
          <p className="text-white text-left font-light">
            Have an idea of a feature that can make Viliyo Smarter?
          </p>
        </div>
        <div className="block  col-span-1 text-right justify-end">
          <div className="flex justify-end">
            <Image
              alt="Welcome"
              src={featureRequestImage}
              width={75}
              height={50}
            />
          </div>
        </div>
      </div>
      <div className="mt-4 p-4 rounded-xl bg-white text-app-blue ">
        <div className="text-app-blue w-full mt-4 font-bold  my-2 mobile:text-sm">
          Tell us, in detail, a feature you'd like to see on Viliyo. How will
          this help you & others?
        </div>
        <form
          className=" w-full flex flex-col"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="font-bold w-full  text-sm  text-app-blue text-left">
            <textarea
              id="message"
              rows={10}
              className={`block p-2.5 w-full italic text-sm text-gray-900 bg-white rounded-xl border ${
                errors.featureRequest ? "border-red-500" : "border-gray-300"
              } focus:ring-blue-500 focus:border-blue-500`}
              placeholder="Describe the feature request here..."
              {...register("featureRequest")}
            ></textarea>
            {errors && errors.featureRequest && (
              <span className="block text-red-500">
                {errors.featureRequest.message}
              </span>
            )}
          </div>

          <div className="w-full p-3">
            <Button
              type="submit"
              styles="outline-1 text-white bg-gradient-to-br from-40% from-app-blue to-app-purple"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "Submit Request"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default FeatureRequest;
