export interface Message {
    id?: number;
    message: string;
    message_by: string;
    message_by_id: number;
    message_by_name: string;
    message_reply_to: string;
    message_time: string;
    message_to: string;
    message_to_id: string;
    message_type: string;
    user_message_data: string;
  }
  
  export interface ChatScreenProps {
    sessionId: string;
  }
  