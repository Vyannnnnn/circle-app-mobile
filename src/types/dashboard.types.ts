export type DashboardStats = {
  followers: number;
  likes: number;
  threads: number;
  replies: number;

  growth: {
    followers: GrowthItem;
    likes: GrowthItem;
    threads: GrowthItem;
    replies: GrowthItem;
  };
};

export type GrowthItem = {
  current: number;
  previous: number;
};
