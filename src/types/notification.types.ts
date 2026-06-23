export type NotificationCardProps = {
  type: "follow" | "LIKE" | "REPLY";
  username: string;
  photoProfile?: string;
  isRead: boolean;
  content?: string;
  createdAt: string;
  onPress?: () => void;
};


export interface Notification {
  id: number;
  receiverId: number;
  senderId: number;
  type: "LIKE" | "follow" | "REPLY";
  threadId: number | null;
  isRead: boolean;
  createdAt: string;

  sender: {
    id: number;
    username: string;
    full_Name: string;
    photo_profile: string;
  };
}