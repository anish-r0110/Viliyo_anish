import React, { createContext, useContext, useState } from 'react';

// Define the context type
interface MediaStreamTrackContextType {
  mediaStreamTracks: Map<string, MediaStreamTrack>; // Map to store MediaStreamTrack objects with IDs
  addMediaStreamTrack: (id: string, track: MediaStreamTrack) => void; // Function to add a track with ID
}

// Create the context
const MediaStreamTrackContext = createContext<MediaStreamTrackContextType>({
  mediaStreamTracks: new Map(),
  addMediaStreamTrack: () => {} // Empty function as default value
});

// Custom hook to access the context
export const useMediaStreamTrackContext = () => useContext(MediaStreamTrackContext);

// Provider component to wrap your application
export const MediaStreamTrackProvider: React.FC = ({ children }) => {
  const [mediaStreamTracks, setMediaStreamTracks] = useState<Map<string, MediaStreamTrack>>(new Map());

  // Function to add a track with ID to the context
  const addMediaStreamTrack = (id: string, track: MediaStreamTrack) => {
    setMediaStreamTracks(prevTracks => new Map(prevTracks).set(id, track));
  };

  return (
    <MediaStreamTrackContext.Provider value={{ mediaStreamTracks, addMediaStreamTrack }}>
      {children}
    </MediaStreamTrackContext.Provider>
  );
};
