import axiosInstance from "@/config/axios";
import IProgram from "@/models/Program";
import ProgramService from "@/services/ProgramService";
import { RootState } from "@/store";
import { QueryFormSchema } from "@/zod.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, Flex, Inset, Tooltip } from "@radix-ui/themes";
import { useEffect, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CiCircleInfo } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { useSelector } from "react-redux";
import { z } from "zod";

type FormData = z.infer<typeof QueryFormSchema>;
type QueryType = "private" | "public"

const QueryForm = () => {

    const [selectedOption, setSelectedOption] = useState<QueryType>("private");
    const { auth } = useSelector((state:RootState) => state);
    const [programs, setPrograms] = useState<IProgram[]>([]);
    const programService = new ProgramService()
  
    useEffect(() => {
      programService.getLatestPrograms().then((program) => {
        setPrograms(program);
      });
    }, []);
  
  
   
    const {
      register,
      handleSubmit,
      watch,
      reset,
      formState: { errors },
    } = useForm<FormData>({
      resolver: zodResolver(QueryFormSchema),
    });
  
    const selectvalue = watch("selectProgramme");
    
  
    const onSubmit = async (data: FieldValues) => {
      {
        try {
          const response:any = await axiosInstance.post("/trainee/create_new_query", {
            query: data.query,
            programId: data.selectProgramme,
            sessionId: data.selectSession,
            type: data.queryType,
            email: auth.user?.email ,
            title: data.queryTitle,
            profile_photo:auth.user?.profileImage,
          });
  
          if (response.code === 200) {
             toast.success('Your query is submitted successfully!.');
          } else {
            toast.error('Something wents wrong ! . Please try again');
          }
          // setTabData(null);
          reset();
        } catch (error) {
          throw error;
        }
      }
    };
    
    
    return ( <Inset className="bg-[#f1f3ff]">
      <Dialog.Title className="bg-app-yellow px-5 py-3  flex   rounded-t-xl">
        <span className=""> New Query</span>
        <Dialog.Close className="relative left-[70%] mobile:left-[60%] cursor-pointer">
          <MdClose size="30" className="float-right" />
        </Dialog.Close>
      </Dialog.Title>
      <form
        className={`flex  text-xs font-normal  border-red-500 justify-start px-10 py-10 items-center`}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="-px-4 mobile:w-full ">
          <div className="space-y-4  ">
            <div className="flex flex-col space-y-1">
              <label htmlFor="selectProgramme">
                Your Query pertains to which Programme
              </label>
              <select
                {...register("selectProgramme")}
                // onChange={handleValue}
                className="rounded-xl border-2 h-10 px-2 text-zinc-600"
                placeholder="Select Programme"
                id="programName"
              >
                <option value="">Select Programme</option>
                {programs.map((program, index) => (
                  <option key={index} value={program.id}>
                    {program.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="selectSession">
                Your Query pertains to which Session
              </label>
              <select
                {...register("selectSession")}
                className="rounded-xl border-2 h-10 px-2 text-zinc-600"
                placeholder="Select Session"
                id="sessionName"
              >
                <>
                  <option value="">Select Session</option>
                  {programs.map(
                    (data, index) => data.id === Number(selectvalue) &&
                      data.sessions?.map((session) => (
                        <option key={index} value={session.id}>
                          {session.name}
                        </option>
                      ))
                  )}
                </>
              </select>
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="queryTitle">Query Title</label>
              <input
                {...register("queryTitle")}
                id="queryTitle"
                type="text"
                placeholder="Write in oneline what is your query about"
                className="rounded-2xl border-2 h-10 p-2" />
            </div>
            <div className="flex flex-col space-y-1">
              <label htmlFor="query">Your Query</label>
              <textarea
                {...register("query")}
                id="query"
                rows={4}
                className="block p-2.5 w-full bg-white rounded-2xl border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Add details about your query for the trainer to help respond better"
              ></textarea>
              {errors && errors.query && <p className="text-red-500">{errors.query.message}</p>}
            </div>
  
            <div className="flex ">
              <Flex className="text-normal" align="center" justify="between">
                <span>Query Type</span>
                <Tooltip content="Choose the Query">
                  <CiCircleInfo size="15" className="ml-2 cursor-pointer" />
                </Tooltip>
  
              </Flex>
  
  
  
              <div className="mx-10">
                <input
                  {...register("queryType")}
                  className="text-app-yellow"
                  id="queryType"
                  type="radio"
                  value="private"
                  checked={selectedOption === "private"}
                  onChange={() => setSelectedOption("private")} />
                <span className="mr-4 ml-1">Private</span>
  
                <input
                  {...register("queryType")}
                  id="queryType"
                  type="radio"
                  value="public"
                  checked={selectedOption === "public"}
                  onChange={() => setSelectedOption("public")} />
                <span className="mr-4 ml-1">Public</span>
              </div>
            </div>
            <Dialog.Close>
              <button className="btn-primary" type="submit">Submit Query</button>
            </Dialog.Close>
          </div>
        </div>
      </form>
    </Inset>);
  }

  export default QueryForm
  