import _ from 'lodash';
export const filterParticipantSearch = (data, name) => {
    const normalizedName = name.toLowerCase();
    const matchingParticipants = data.participants.filter(participant =>
      participant.participantName.toLowerCase().includes(normalizedName)
    );
    const matchingTrainer = data.trainer.name.toLowerCase().includes(normalizedName)
      ? [data.trainer]
      : [];
    return [...matchingParticipants, ...matchingTrainer];
  };
  