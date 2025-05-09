import { StreamingConstants } from "./StreamingConstants";

interface User {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  batchId: number;
  programId: number;
  role_id: number | null;
  session_id: number | null;
  created_on: string;
  programme_rating: number | null;
  emailSent: boolean;
  regStatus: boolean;
  isAnonymous: boolean;
  profilePhoto: string;
}

export function getProtooUrl({
  roomId,
  peerId,
}: {
  roomId: String;
  peerId: String;
}) {
  return (
    StreamingConstants.STREAMING_SERVER_URL +
    `/protoo/?roomId=${roomId}&peerId=${peerId}`
  );
}

export function getUserByEmail(email: string, users: User[]): User | undefined {
  return users.find((user) => user.email === email);
}

export const findParticipantByEmail = (data: any, email: string) => {
  const participant = data?.batch?.participants.find((participant: any) => {
    return (
      participant.email.toString().toLocaleLowerCase() ==
      email.toLocaleLowerCase()
    );
  });

  return participant || null;
};
