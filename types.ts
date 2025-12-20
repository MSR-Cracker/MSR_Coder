export interface SocialLink {
  platform: string;
  url: string;
  icon: React.ReactNode;
}

export interface AudioTrack {
  title: string;
  url: string;
  duration?: string;
  cover?: string;
}
