import { ConsumersState } from "@/store/reducers/LiveSessionReducers/consumer";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

export const VideoComponent = ({ peerId }) => {
  const consumers = useSelector(
    (state: { consumers: ConsumersState }) => state.consumers
  );
  const videoRef = useRef();
  useEffect(() => {
    Object.values(consumers).map((item) => {
      if (item.peerId == "trainer@vtt" && item.track.kind == "video") {
        const mediaStream = new MediaStream();
        mediaStream.addTrack(item.track);

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      }
    });
  }, [consumers]);
  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute object-cover w-full max-h-full"
      />
    </>
  );
};
