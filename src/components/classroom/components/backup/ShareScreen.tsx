import React, { useState, useEffect } from "react";

const ScreenSharingComponent = () => {
  const [stream, setStream] = useState(null);

  const startSharing = async () => {
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });
      setStream(stream);
    } catch (error) {
      console.error("Error accessing screen:", error);
    }
  };

  const stopSharing = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  useEffect(() => {
    return () => {
      stopSharing();
    };
  }, []);

  return (
    <div>
      {stream ? (
        <div>
          <video
            srcObject={stream}
            autoPlay={true}
            controls={true}
            style={{ width: "100%", height: "auto" }}
          />
          <button onClick={stopSharing} className="text-white">
            Stop Sharing
          </button>
        </div>
      ) : (
        <button onClick={startSharing} className="text-white">
          Start Sharing
        </button>
      )}
    </div>
  );
};

export default ScreenSharingComponent;
