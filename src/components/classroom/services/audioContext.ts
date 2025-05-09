let audioContext: AudioContext | null = null;
let audioElement: HTMLAudioElement | null = null;
let audioSource: MediaElementAudioSourceNode | null = null;
let gainNode: GainNode | null = null;

export const initializeAudio = (): void => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    audioElement = document.createElement('audio');
    audioElement.loop = true;  // Set the audio to loop
    audioSource = audioContext.createMediaElementSource(audioElement);
    gainNode = audioContext.createGain();
    audioSource.connect(gainNode).connect(audioContext.destination);
    console.log('Audio context and elements initialized');
  }
};

export const toggleSpeaker = (isSpeakerOn: boolean): void => {
  if (gainNode) {
    gainNode.gain.value = isSpeakerOn ? 1 : 0;
    console.log(`Speaker is now ${isSpeakerOn ? 'On' : 'Off'}`);
  }
};

export const setAudioSource = (sourceUrl: string): void => {
  if (audioElement) {
    audioElement.src = sourceUrl;
    audioElement.crossOrigin = "anonymous";  // Ensure cross-origin access is allowed
    console.log('Audio source set:', audioElement.src);
  }
};

export const playAudio = (): void => {
  if (audioElement) {
    audioElement.play().then(() => {
      console.log('Audio is playing:', audioElement.src);
    }).catch(error => {
      console.error('Error playing audio:', error);
    });
  }
};

export const getGainNodeValue = (): number | null => {
  return gainNode ? gainNode.gain.value : null;
};
