import { useState } from "react";
import {
  BsEmojiDizzy,
  BsEmojiExpressionless,
  BsEmojiFrown,
  BsEmojiLaughing,
  BsEmojiSmile,
} from "react-icons/bs";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import UnderLineTitle from "../shared/UnderlineTitle";
import axiosInstance from "@/config/axios";
import Emoji from "./Emoji";
import IEmoji from "@/interfaces/Emoji";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

// Zod schema for form validation
const FeedbackFormSchema = z.object({
  experience: z.number().min(1, "Experience is required"),
  willRecommend: z.enum(["yes", "no"]),
  feedback: z.string().min(1, "Feedback should not be empty"),
});

type FeedBackFormData = z.infer<typeof FeedbackFormSchema>;

const ShareFeedBack = () => {
  const auth = useSelector((state: RootState) => state.auth.user);
  const [emojis, setEmojis] = useState([
    { id: 1, smiley: <BsEmojiDizzy />, isActive: false },
    { id: 2, smiley: <BsEmojiFrown />, isActive: false },
    { id: 3, smiley: <BsEmojiExpressionless />, isActive: false },
    { id: 4, smiley: <BsEmojiSmile />, isActive: false },
    { id: 5, smiley: <BsEmojiLaughing />, isActive: false },
  ]);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedBackFormData>({ resolver: zodResolver(FeedbackFormSchema) });

  const [submitting, setSubmitting] = useState(false);

  const handleSelectEmoji = (data: IEmoji) => {
    const newData = emojis.map((el) => {
      el.isActive = el.id === data.id;
      return el;
    });
    setEmojis(newData);
  };

  const onSubmit = async (data: FeedBackFormData) => {
    try {
      setSubmitting(true);

      const payload = {
        viliyo_experience: data.experience,
        will_recommend: data.willRecommend,
        feedback: data.feedback,
        anonymously: false,
        email: auth?.email,
        username: auth?.name,
      };

      const response = await axiosInstance.post(
        "/support/send_feedback",
        payload
      );
      console.log("Response:", response.data);
      toast.success("Feedback sent successfully");
      reset();
    } catch (error) {
      console.error("Error submitting feedback:", error);
      toast.error("An error occurred while submitting the feedback.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <UnderLineTitle title="Share Feedback" />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-4 my-4 col-span-4 rounded-xl font-bold text-zinc-500 gap-6 m-2">
          <div className="col-span-2 flex mobile:flex-col mobile:col-span-4 tablet:col-span-4 bg-white h-[100px] items-center space-x-3 mobile:space-y-3 rounded-xl p-4 shadow-lg">
            <div className="text-sm">
              How has your Viliyo experience been so far?
            </div>
            <div className="mobile:m-0">
              <Controller
                name="experience"
                control={control}
                render={({ field }) => (
                  <div className="flex flex-wrap gap-y-2 space-x-2">
                    {emojis.map((emoji) => (
                      <Emoji
                        key={emoji.id}
                        data={emoji}
                        onSelect={() => {
                          field.onChange(emoji.id);
                          handleSelectEmoji(emoji);
                        }}
                      />
                    ))}
                  </div>
                )}
              />
            </div>
          </div>

          <div className="bg-white col-span-2 mobile:flex-col mobile:col-span-4 tablet:col-span-4 flex h-[100px] items-center rounded-xl p-4 shadow-lg">
            <div className="flex text-[14px]">
              Will you recommend Viliyo to others?
            </div>
            <div className="flex px-6">
              <div>
                <Controller
                  name="willRecommend"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        id="feedbackradiobutton-yes"
                        type="radio"
                        value="yes"
                        checked={field.value === "yes"}
                      />
                      <span className="mr-4 ml-1">Yes</span>
                    </>
                  )}
                />
              </div>
              <div>
                <Controller
                  name="willRecommend"
                  control={control}
                  render={({ field }) => (
                    <>
                      <input
                        {...field}
                        id="feedbackradiobutton-no"
                        type="radio"
                        value="no"
                        checked={field.value === "no"}
                      />
                      <span className="mr-4 ml-1">No</span>
                    </>
                  )}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 mobile:flex-col gap-8 text-left rounded-xl bg-white text-app-blue mobile:m-2  shadow-lg p-4">
          <div className="mobile:col-span-2 text-[12px] text-app-blue">
            <h1 className="w-full text-zinc-500 my-2">Share Your Feedback</h1>
            <textarea
              {...register("feedback")}
              id="feedback"
              rows={4}
              className="block p-2.5 w-full italic text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Type your feedback here"
            ></textarea>
            {errors.feedback && (
              <p className="text-red-500">{errors.feedback.message}</p>
            )}
          </div>
          <div className="w-full mobile:col-span-2 text-[14px] flex items-center">
            <button
              disabled={submitting}
              className="outline-1 h-8 w-56 rounded-3xl text-white bg-gradient-to-br from-40% from-app-blue to-app-purple shadow-lg hover:animate-pulse"
            >
              {submitting ? "Submitting..." : "Submit Feedback"}
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default ShareFeedBack;
