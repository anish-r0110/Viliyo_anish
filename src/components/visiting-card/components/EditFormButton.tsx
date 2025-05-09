import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Dialog, Flex, Inset, RadioGroup , Text } from "@radix-ui/themes";
import { FieldValues, useForm } from "react-hook-form";
import { ProfileFormSchema } from "@/zod.schema";
import { useState } from "react";
import axiosInstance from "@/config/axios";
import { z } from "zod";
import { IoClose } from "react-icons/io5";


type FormData = z.infer<typeof ProfileFormSchema>;
const updateData = async ( request : any ) => {
    let response = await axiosInstance.post("trainee/update_visiting_card", request );
    return response;
}







const EditFormButton = () => {



    const { register, handleSubmit , reset, formState: { errors } } = useForm<FormData>({
      resolver: zodResolver(ProfileFormSchema),
    });
  
    const [needCallBack, setNeedCallBack] = useState(false);
  
  
    const handleOptionChange = (option: "yes" | "no") => {
      setNeedCallBack(option === "yes");
    };
  
    const onSubmit = async ( formData : FieldValues) => {
  
      try {
  
        let request = formData
        const result = await updateData( request);
  
        if (result.status === 200) {
           reset()
        }
        
      } catch (error) {
           throw new Error('Unable to update the card details')
      }
       
    };
  
    return(
    <Dialog.Root>
    <Dialog.Trigger>
      <button className="border-2 border-app-blue rounded-full font-bold text-app-blue   px-2 w-full  h-8 hover:scale-105 text-xs mobile:w-full ">
        Edit/Customize Card
      </button>
    </Dialog.Trigger>
    <Dialog.Content>
        <Inset className="bg-violet-100">
      <Flex>
        <div className="bg-app-yellow w-full rounded-t-lg px-4 py-3 flex justify-between text-black font-medium">
          <>
            <p>Edit Visiting Card</p>
            <Dialog.Close>
              <Flex>
                <button className="text-xl"><IoClose /></button>
              </Flex>
            </Dialog.Close>
          </>
        </div>
      </Flex>
      {/* onSubmit={handleSubmit(onSubmit)} */}
      <Box className="m-5  bg-violet-100">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full p-2 grid grid-cols-2 gap-4 bg-violet-100">
          <div className="flex flex-col max-w-[280] min-w-[240px] mobile:mt-2">
            <label htmlFor="firstName" className="text-sm">
              First Name*
            </label>
            <input
              {...register("firstName")}
              id="firstName"
              type="text"
              placeholder="Enter your First Name"
              className="rounded-2xl border-2 h-10 p-2 text-xs"
            />
            {errors.firstName && (
              <p className="text-red-500">{errors.firstName.message}</p>
            )}
          </div>
          <div className="flex flex-col max-w-[280] min-w-[240px]">
            <label htmlFor="lastName" className="text-sm">
              Last Name*
            </label>
            <input
              {...register("lastName")}
              id="lastName"
              type="text"
              placeholder="Enter your Last Name"
              className="rounded-2xl border-2 h-10 p-2 text-xs"
            />
            {errors.lastName && (
              <p className="text-red-500">{errors.lastName.message}</p>
            )}
          </div>
          <div className="flex flex-col max-w-[280] min-w-[240px] mobile:mt-2">
            <label htmlFor="designation" className="text-sm">
              Designation / Role
            </label>
            <input
              {...register("designation")}
              id="designation"
              type="text"
              placeholder="Enter your designation/role"
              className="rounded-2xl border-2 h-10 p-2 text-xs"
            />
          </div>
          <div className="flex flex-col max-w-[280] min-w-[240px]">
            <label htmlFor="phone" className="text-sm">
              Contact Number
            </label>
            <input
              {...register("phone")}
              id="phone"
              type="text"
              placeholder="Enter your Contact Number"
              className="rounded-2xl border-2 h-10 p-2 text-xs"
            />
          </div>
          <div className="flex flex-col max-w-[280] min-w-[240px] mobile:mt-2">
            <label htmlFor="website" className="text-sm">
              Website
            </label>
            <input
              {...register("website")}
              id="website"
              type="text"
              placeholder="Enter your link Eg:http://www.xyz.com"
              className="rounded-2xl border-2 h-10 p-2 text-xs"
            />
          </div>
          <div className="flex flex-col max-w-[280] min-w-[240px]">
            <label htmlFor="linkedIn" className="text-sm">
              Linkedin Profile URL
            </label>
            <input
              {...register("linkedIn")}
              id="linkedIn"
              type="text"
              placeholder="Enter URL Eg:http://linkedIn.com/xxxx"
              className="rounded-2xl border-2 h-10 p-2 text-xs"
            />
          </div>
          <div>
            <label htmlFor="about" className="text-sm">
              About Me
            </label>
            <textarea
              {...register("aboutMe")}
              // type="text"
              className="w-full h-32 border-2 rounded-2xl text-sm p-2"
              placeholder="write here..."
              id="about"
            />
          </div>
          <div>
            <label htmlFor="interest" className="text-sm">
              Area of Interest & Hobbies
            </label>
            <textarea
              {...register("areasOfInterest")}
              // type="text"
              className="w-full h-32 border-2 rounded-2xl text-sm p-2"
              placeholder="write here..."
              id="interest"
            />
          </div>
          <Box className="flex w-full">
            <label htmlFor="approval" className="text-sm w-[70%]">
              When requested, whould you like to share your visiting card
              without approval?
            </label>

            <RadioGroup.Root size="2" defaultValue="1">
                <Text as="label" size="3">
                    <Flex gap="2">
                        <RadioGroup.Item value="1" /> Yes
                    </Flex>
                </Text>

                    <Text as="label" size="3">
                    <Flex gap="2">
                        <RadioGroup.Item value="2" /> No
                    </Flex>
                    </Text>
            </RadioGroup.Root>
  
          
          </Box>
        </div>
        <div className="w-full bg-violet-100">
          <button className="px-4 py-2 bg-app-blue rounded-3xl text-white ">
            Save
          </button>
        </div>
      </form>
      </Box>
      </Inset>
    </Dialog.Content>
  </Dialog.Root>)
  }
  

  export default EditFormButton