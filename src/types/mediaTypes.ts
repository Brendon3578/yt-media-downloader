export type mediaFormatType = {
  mimeType: string;
  container: string;
  audioBitrate?: number | null;
  quality: string;
  qualityLabel: string | null;
  size: number;
};

export type mediaDetailsType = {
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
  formats: mediaFormatType[];
};
