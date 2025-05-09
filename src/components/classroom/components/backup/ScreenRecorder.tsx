import React, { useState, useRef } from "react";

const ScreenRecorder: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const recordedChunksRef = useRef<Blob[]>([]);

  const startRecording = () => {
    recordedChunksRef.current = [];
    setRecording(true);
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.ondataavailable = handleDataAvailable;
        mediaRecorder.start();
      })
      .catch((error) => {
        console.error("Error accessing screen capture:", error);
        setRecording(false);
      });
  };

  const stopRecording = () => {
    setRecording(false);
    recordedChunksRef.current = [];
  };

  const handleDataAvailable = (event: BlobEvent) => {
    if (event.data.size > 0) {
      recordedChunksRef.current.push(event.data);
    }
  };

  const downloadRecording = () => {
    const blob = new Blob(recordedChunksRef.current, {
      type: recordedChunksRef.current[0]?.type || "video/webm",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screen-recording.webm";
    a.click();
  };

  return (
    <div>
      <h2>Screen Recording</h2>
      <div>
        {recording ? (
          <button onClick={stopRecording}>Stop Recording</button>
        ) : (
          <button onClick={startRecording}>Start Recording</button>
        )}
      </div>
      {recordedChunksRef.current.length > 0 && (
        <div>
          <button onClick={downloadRecording}>Download Recording</button>
        </div>
      )}
    </div>
  );
};

export default ScreenRecorder;
