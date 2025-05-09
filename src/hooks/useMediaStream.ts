import { RootState } from '@/store';
import { updateLiveStreamSettings } from '@/store/reducers/livestreamSettings';
import { useEffect, useRef, MutableRefObject, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const useMediaStream = (): [MutableRefObject<HTMLVideoElement | null>, MediaStream | null] => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const dispatch = useDispatch();
  const settings = useSelector((state: RootState) => state.live.settings);

  useEffect(() => {
    let videoTrack: MediaStreamTrack | null = null;
    let audioTrack: MediaStreamTrack | null = null;

    const getLocalMedia = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        videoTrack = stream.getVideoTracks()[0];
        audioTrack = stream.getAudioTracks()[0];

        if( settings.video  ){
          if (videoRef.current) {
            const mediaStream = new MediaStream([videoTrack]);
            videoRef.current.srcObject = mediaStream;
          }
        }

        if( !settings.video ){
          console.log('Stopping Video Feed');
          stream.getVideoTracks().forEach( track => track.stop())
        }


        // setStream(stream);
        dispatch(updateLiveStreamSettings({ isCameraAccessGranted: true, isMicAccessGranted: true }));
      } catch (error) {
        console.error('Error accessing media devices.', error);
      }
    };

    getLocalMedia();

    return () => {
      if (videoTrack) videoTrack.stop();
      if (audioTrack) audioTrack.stop();
    };
  }, [settings.video, settings.audio, dispatch]);

  return [videoRef, stream];
};

export default useMediaStream;
