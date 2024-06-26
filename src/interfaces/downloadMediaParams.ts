export interface DownloadMediaParams {
  url: string;
  fileSize: number;
  mediaType: "audio" | "video";
  extension: string;
  audioBitrate?: number;
  videoResolution?: string;
  addMetadata?: boolean;
  addThumbnail?: boolean;
}
