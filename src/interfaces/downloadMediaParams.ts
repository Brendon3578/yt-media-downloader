export interface DownloadMediaParams {
  url: string;
  fileSize: number;
  mediaType: string;
  extension: string;
  audioBitrate?: number;
  videoResolution?: string;
  addMetadata?: boolean;
  addThumbnail?: boolean;
}
