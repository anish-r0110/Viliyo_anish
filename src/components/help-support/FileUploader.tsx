import React, { useState, useRef } from "react";

interface FileUploaderProps {
  title: string;
  onFileChange: (file: File | null) => void; // Callback prop for updating parent's value with file
}

const FileUploader = ({ title, onFileChange }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileInputOpened, setFileInputOpened] = useState(false);

  const handleAttachScreenshot = () => {
    setFileInputOpened(!fileInputOpened);
    if (!fileInputOpened) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFileInputOpened(false);

    const file = event.target.files?.[0];
    onFileChange(file || null); // Call the callback function to update parent's value
  };

  return (
    <div>
      <div className="flex justify-end items-baseline">
        <button
          type="button"
          className="cursor-pointer px-12 py-2 text-app-blue bg-white rounded-full border border-app-blue mt-2 hover:scale-105"
          onClick={handleAttachScreenshot}
        >
          {title}
        </button>
      </div>
      <input
        type="file"
        id="screenshotInput"
        accept={title === "Attach a file" ? "file/*" : "image/*"}
        onChange={handleFileChange}
        className="hidden"
        ref={fileInputRef}
      />
    </div>
  );
};

export default FileUploader;
