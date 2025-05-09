import { Flex } from "@radix-ui/themes";
import { useState } from "react";

const SubjectiveQuestion = ({ question  , item , defaultAnswer = '',  onAnswer , index }: { question: string , item:any , index:number , defaultAnswer?:string ,   onAnswer:(answer:string , item:any) => void }) => {
  
  const [ answer , setAnswer ]  =  useState<string>(defaultAnswer)
 
  return (
    <Flex direction="column" gap="3" style={{ maxWidth: 700 }}>
      <label className="block mb-2 text-normal font-bold text-app-gray-medium">
        {question}
        {item.Mandatory && <span className="text-red-600">*</span>}
      </label>
      <textarea
        id="message"
        className="block p-2.5 h-56 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none"
        placeholder="Type your response here"
        onChange={(event) => { 
           setAnswer( event.target.value)
           onAnswer( event.target.value , index)
        }}
        value={answer}
      ></textarea>
    </Flex>
  );
};

export default SubjectiveQuestion;