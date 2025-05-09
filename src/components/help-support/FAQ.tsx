// src/components/help-support/FAQ.tsx

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SearchInput } from "../inputs";
import Accordion from "../shared/Accordion";
import FAQItem from "@/interfaces/FAQ";
import axiosInstance from "@/config/axios"; // Update with correct path
import Image from "next/image";
import faqImage from '@/assets/images/help-center3.png';
import { fetchFAQs } from "@/store/reducers/faqsSlice";
import { AppDispatch, RootState } from "@/store";

const FAQ = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items , isLoading } = useSelector(( state:RootState) => state.faqs);
  const [displayedFaqs, setDisplayedFaqs] = useState<FAQItem[]>([]);

  useEffect(() => {
    dispatch(fetchFAQs());
  }, []);

  useEffect(() => {
    setDisplayedFaqs(items);
  }, [items]);

  const handleSearch = (text: string) => {
    if (text.length === 0) {
      setDisplayedFaqs(items);
      return;
    }
    const filtered = items.filter((faq) =>
      faq.question.toLowerCase().includes(text.toLowerCase())
    );
    setDisplayedFaqs(filtered);
  };

  return (
    <>
      <div className="flex justify-between p-4 items-center rounded-xl bg-app-blue text-white mobile:m-2">
        <div className="text-left">
          <span className="font-bold text-xl bold text-app-yellow">
            You have a question? We have the answer!
          </span>
          <p className="text-white font-light text-sm">
            FAQs will answer your questions about Viliyo and guide
            <br />
            you through various features and configurations.
          </p>
        </div>
        <Image
          alt="Welcome"
          src={faqImage}
          width={75}
          height={50}
        />
      </div>
      <div className="overflow-y-auto h-[calc(100vh-4rem)]">
        <div className="w-full py-4">
          <div className="mobile:mr-4 float-right tablet:mr-4 border-2 rounded-full mr-4 mb-2">
            <SearchInput onChange={handleSearch} placeholder="Search" />
          </div>
        </div>

        <div className="m-2">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            displayedFaqs.map((faq, index) => (
              <Accordion
                key={index}
                index={index + 1}
                title={faq.question}
                content={faq.answer}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default FAQ;
