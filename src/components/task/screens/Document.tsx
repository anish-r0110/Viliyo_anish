import React from "react";


// const FileViewer = dynamic(() => import("react-file-viewer"), {
//   ssr: false,
// });
interface DocumentProps {
  documentUrl: string;
}

const DocumentScreen: React.FC<DocumentProps> = ({ documentUrl }) => {
  // const docs = [{ uri: documentUrl, fileType: "PDF" }];

  // Add the appropriate plugins for XLS, PPT, and PDF

  return (
    // <FileViewer
    //   fileType={"pdf"}
    //   filePath={"https://www.clickdimensions.com/links/TestPDFfile.pdf"}
    //   // errorComponent={CustomErrorComponent}
    //   // onError={this.onError}/>
    // />
    <>
      <iframe className="w-full h-96" src={documentUrl} ></iframe>
    </>
  );
};

export default DocumentScreen;
