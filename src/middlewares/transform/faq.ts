import FAQItem from "@/interfaces/FAQ";


const transformFAQ = ( data:any):FAQItem => {
   return {
      id: data.id,
      question:data.topic,
      answer:data.description,
   }
}


export default transformFAQ;