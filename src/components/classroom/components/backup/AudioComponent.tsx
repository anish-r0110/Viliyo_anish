import { ConsumersState } from "@/store/reducers/LiveSessionReducers/consumer";
import { useEffect, useRef, useState } from "react";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { useSelector } from "react-redux";

export const AudioComponent = ({ peerId }: { peerId: string }) => {
  const consumers = useSelector(
    (state: { consumers: ConsumersState }) => state.consumers
  );
  const audioRef = useRef(null);
  const [isPeerMute, setIsPeerMute] = useState(true);

  useEffect(() => {
    Object.values(consumers).map((item) => {
      if (
        item.peerId == "trainer@vtt" &&
        item.track.kind == "audio" &&
        !item.track.muted &&
        item.track.readyState == "live"
      ) {
        const audioElement = audioRef.current;

        const mediaStream = new MediaStream();
        mediaStream.addTrack(item.track);
        // set the media stream object
        audioElement.srcObject = mediaStream;
        audioElement.play().catch((error) => {
          console.error("Failed to play audio:", error);
        });
        console.log(
          "🚀 ~ Object.values ~ item.remotelyPaused:",
          item.remotelyPaused
        );

        setIsPeerMute(item.remotelyPaused);
      }
    });
  }, [consumers]);

  return (
    <div className="text-white my-auto">
      {isPeerMute ? <IoMicOffOutline /> : <IoMicOutline />}
      <audio ref={audioRef} controls autoPlay className="hidden" />
    </div>
  );
};
