import useMediaStream from "@/hooks/useMediaStream";
import { RootState } from "@/store";
import { toggleAudio, toggleVideo } from "@/store/reducers/livestreamSettings";
import { useRef, useState } from "react";
import Draggable from "react-draggable";
import { AiOutlineExpandAlt } from "react-icons/ai";
import { HiOutlineVideoCamera, HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { IoMicOffOutline, IoMicOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { FiMinimize2 } from "react-icons/fi";


const TraineeDraggableCard = () => {


  const settings = useSelector((state:RootState) =>  state.live.settings)
  const auth = useSelector((state:RootState) =>  state.auth.user)
  const dispatch = useDispatch();
  const [videoRef] = useMediaStream();
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMaximized , setIsMaximized ] = useState( false )
  const originalStyles = useRef<{ [key: string]: string }>({});

  const handleMaximize = () => {
    setIsMaximized((value) => !value);

    if (containerRef.current) {
      if (!isMaximized) {
        // Store original styles
        originalStyles.current = {
          position: containerRef.current.style.position,
          top: containerRef.current.style.top,
          left: containerRef.current.style.left,
          transform: containerRef.current.style.transform,
          width: containerRef.current.style.width,
          height: containerRef.current.style.height,
          zIndex: containerRef.current.style.zIndex,
          backgroundColor: containerRef.current.style.backgroundColor,
        };

        // Apply maximized styles
        containerRef.current.style.position = 'fixed';
        containerRef.current.style.top = '0';
        containerRef.current.style.left = '50%';
        containerRef.current.style.transform = 'translateX(-50%)';
        containerRef.current.style.width = '100vw';
        containerRef.current.style.height = '100vh';
        containerRef.current.style.zIndex = '9999';
        containerRef.current.style.backgroundColor = 'black';
      } else {
        // Restore original styles
        Object.assign(containerRef.current.style, originalStyles.current);
      }
    }
  };


  return (
    <Draggable>
        <div ref={containerRef} className="fixed flex flex-col h-32 w-56 bottom-12 right-2">
          <div onClick={handleMaximize} className="absolute z-20 left-2 top-2 text-white flex  bg-gray-800 opacity-75 rounded-lg hover:cursor-move border-white h-6 w-6 p-1">
            { !isMaximized ? <AiOutlineExpandAlt />:<FiMinimize2 />}
          </div>
          <div className="absolute w-full h-full">
           { settings.video && <video
              ref={videoRef}
              autoPlay
              playsInline
              muted
              className="absolute object-cover w-full max-h-full"
            />}

            {
              ( !settings.video && auth )&& 
               <div className="w-full flex h-full bg-black justify-center items-center rounded-lg">
                  <span className="w-20 flex justify-center items-center h-20 rounded-full bg-white text-lg font-bold text-app-blue">
                      { auth?.firstName.charAt(0) + auth?.lastName.charAt(0)}
                  </span>
               </div>
            }
          </div>
          <div className="flex justify-between absolute bottom-0 bg-gray-800 opacity-75 w-full">
            <div className="text-white px-2 py-1">
              {settings.video ? (
                <HiOutlineVideoCamera
                  onClick={() => dispatch(toggleVideo())}
                  color="white"
                />
              ) : (
                <HiOutlineVideoCameraSlash
                  onClick={() => dispatch(toggleVideo())}
                  color="white"
                />
              )}
            </div>
            <span className="text-white ">{auth && auth?.firstName + ' ' +auth?.lastName}</span>
            <div className="text-white  cursor-pointer  px-2 py-1">
              {settings.audio ? (
                <IoMicOutline onClick={() => dispatch(toggleAudio())} color="white" />
              ) : (
                <IoMicOffOutline
                  onClick={() => dispatch(toggleAudio())}
                  color="white"
                />
              )}
            </div>
          </div>
        </div>
    </Draggable>
  );
};
export default TraineeDraggableCard;
