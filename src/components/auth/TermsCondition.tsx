import { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

const TermsCondition = ({ onClose }: { onClose: () => void; }) => {

  const [termsContent, setTermsContent] = useState(""); // State to hold the fetched HTML content

  // Fetch the content of the terms HTML file from the server
  useEffect(() => {
    const fetchTermsContent = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/terms-services.html"
        );
        if (response.ok) {
          const htmlContent = await response.text();
          setTermsContent(htmlContent);
        } else {
          console.error("Failed to fetch terms content.");
        }
      } catch (error) {
        console.error("Error fetching terms content:", error);
      }
    };

    fetchTermsContent();

  }, []);

  return (<div
    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    onClick={() => onClose()}
  >
    <div className="flex flex-col bg-white">
      <div className="flex justify-end">
        <RxCross2
          size={40}
          className="hover:cursor-pointer"
          onClick={() => onClose()} />
      </div>
      <div
        className="bg-white p-12 overflow-auto max-h-[80vh] max-w-[80vw] rounded-md"
        onClick={(e) => e.stopPropagation()}
        dangerouslySetInnerHTML={{ __html: termsContent }} // Render the fetched HTML content
      />
    </div>
  </div>);
};

export default TermsCondition
