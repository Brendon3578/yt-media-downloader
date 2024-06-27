export type mediaFormatType = {
  mimeType: string;
  container: string;
  audioBitrate?: number | null;
  quality: string;
  qualityLabel: string | null;
  size: number;
};

type watchEmbedType = {
  iframeUrl: string;
};

export interface MediaInfoData {
  embed: watchEmbedType;
  url: string;
  title: string;
  author: string;
  thumbnail: string;
  duration: string;
  formats: mediaFormatType[];
}

export interface MediaInfoResponse {
  data: MediaInfoData;
}
