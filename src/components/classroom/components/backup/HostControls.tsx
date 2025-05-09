// HostControls.tsx
import React from "react";

interface HostControlsProps {
  participants: Participant[]; // An array of participant objects with their details
  onMuteToggle: (participantId: string) => void;
  onRemoveParticipant: (participantId: string) => void;
  onLockMeeting: () => void;
}

interface Participant {
  id: string;
  name: string;
  isMuted: boolean;
}

const HostControls: React.FC<HostControlsProps> = ({
  participants,
  onMuteToggle,
  onRemoveParticipant,
  onLockMeeting,
}) => {
  return (
    <div className="host-controls">
      <h2>Host Controls</h2>
      {participants.map((participant) => (
        <div key={participant.id} className="participant-item">
          <span>{participant.name}</span>
          <button onClick={() => onMuteToggle(participant.id)}>
            {participant.isMuted ? "Unmute" : "Mute"}
          </button>
          <button onClick={() => onRemoveParticipant(participant.id)}>
            Remove
          </button>
        </div>
      ))}
      <button onClick={onLockMeeting}>Lock Meeting</button>
    </div>
  );
};

export default HostControls;
