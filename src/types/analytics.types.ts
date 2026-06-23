export interface ThreadAnalytics {
  id: number;
  content: string;
  image?: string | null;
  createdAt: string;

  likesCount: number;
  repliesCount: number;

  engagement: number;
}

export interface ThreadCardProps {
  content: string;
  image?: string | null;
  createdAt: string;
  likesCount: number;
  repliesCount: number;
  engagement: number;
}   

export type DropdownProps = {
  value: string;
  onChange: (value: string) => void;
};