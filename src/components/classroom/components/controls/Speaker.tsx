import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";
import CLASSNAME from "./classname";
import SIZE from "./size";
import { useDispatch, useSelector } from "react-redux";
import {
  initializeAudio,
  toggleSpeaker,
  setAudioSource,
} from "../../services/audioContext";
import { RootState } from "@/store";
import { useEffect } from "react";
import { toggleSpeaker as toggleSpeakerAction } from "@/store/reducers/livestreamSettings";

interface SpeakerControlProps {
  audioSourceUrl: string;
}

const SpeakerControl = ({ audioSourceUrl }: SpeakerControlProps) => {
  const dispatch = useDispatch();
  const speakerState = useSelector(
    (state: RootState) => state.live.settings.onSpeaker
  );

  useEffect(() => {
    initializeAudio();
    setAudioSource(audioSourceUrl);
  }, [audioSourceUrl]);

  const handleClick = () => {
    const newSpeakerState = !speakerState;
    dispatch(toggleSpeakerAction());
    toggleSpeaker(newSpeakerState);
  };

  return (
    <div className="relative group">
      <div
        className={`${CLASSNAME} ${!speakerState && "bg-red-600"} `}
        onClick={handleClick}
      >
        {speakerState ? (
          <HiOutlineSpeakerWave color="black" size={SIZE} />
        ) : (
          <HiOutlineSpeakerXMark color="black" size={SIZE} />
        )}
      </div>
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 max-w-full bg-black text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        Sound
      </div>
    </div>
  );
};

export default SpeakerControl;
