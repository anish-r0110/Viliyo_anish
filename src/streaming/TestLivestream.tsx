import { useEffect, useRef } from "react"
import MediaRoomClient from "./MediaStream"

export const TestLiveStream = ({ roomId, peerId, participantList, traineeData }: { roomId: String, peerId: String, participantList: [], traineeData: {} }) => {
    let strUserId = participant_id

    const mediaService = new MediaRoomClient(
        {
            roomId,
            peerId,
            displayName: traineeData?.name || '',
            strUserId,
            device,
            handlerName : handler,
            useSimulcast,
            useSharingSimulcast,
            forceTcp,

            produce,
            consume,
            forceH264,
            forceVP9,
            svc,
            datachannel,
            externalVideo,
            e2eKey,
            socketList,
            displayImage : traineeData.profileImage,
            bgImage : traineeData.profileImage,
            traineeEmail : traineeData.email
        }
    )
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
  
    useEffect(() => {
        const getCameraStream = async () => {
          mediaService.getLocalStream((stream: MediaStream | null) => {
            setStream(stream);
          });
        };
    
        getCameraStream();
    
        return () => {
          if (stream) {
            stream.getTracks().forEach(track => track.stop());
          }
        };
      }, [mediaService]);
    return(
    <div className='flex flex-col w-full text-white'>
    <div className='flex flex-col'>
        <div className='flex flex-col'>
            {/* <video className='flex w-full' ref={videoRef} autoPlay playsInline  muted /> */}
            <video className='flex w-60 h-60 border-4' ref={videoRef} autoPlay playsInline muted />
            <label className='text-app-blue'>Local Stream</label>
        </div>
        <div className='flex w-full border '>
            <button onClick={() => {} } className='flex border rounded-lg bg-app-blue p-3'>Connect To LocalStream </button>
        </div>
    </div>


</div>

)
}