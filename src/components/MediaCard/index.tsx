import { mediaFormatType, MediaInfoData } from "../../interfaces/mediaInfoData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { formatMediaDuration } from "../../utils/formatMediaDduration";
import { LoadingMedia } from "../LoadingMedia";
import { MediaTable } from "../MediaTable";
import { Badge } from "../ui/badge";
import { DownloadMediaParams } from "../../interfaces/downloadMediaParams";
import { Play } from "lucide-react";
import { WatchVideoBlock } from "../WatchVideoBlock";
import { useCallback, useMemo, useState } from "react";
import { cn } from "../../lib/utils";
import { estimateAudioFileSize } from "../../utils/estimateAudioFileSize";

type MediaCardProps = {
  media: MediaInfoData;
  downloadMediaHandler: (params: Omit<DownloadMediaParams, "url">) => void;
};

const filterAndMapAudioFormatsForMp3 = (
  formats: mediaFormatType[],
  containerReplacement: string
): mediaFormatType[] => {
  return formats
    .filter(
      ({ mimeType, audioBitrate }) =>
        mimeType.includes(containerReplacement || "") && audioBitrate
    )
    .map((format) => ({
      ...format,
      container: containerReplacement
        ? format.container.replace("mp4", "mp3")
        : format.container,
    }));
};

const filterAudioFormats = (formats: mediaFormatType[]): mediaFormatType[] =>
  formats.filter(
    (format) => format.mimeType.includes("audio/") && format.audioBitrate
  );

const filterAndAdjustVideoFormats = (
  formats: mediaFormatType[],
  mediaDuration: string
): mediaFormatType[] =>
  formats
    .filter((format) => format.mimeType.includes("video/"))
    .map((format) => ({
      ...format,
      size: estimateAudioFileSize(mediaDuration) + format.size,
    }));

export function MediaCard({ media, downloadMediaHandler }: MediaCardProps) {
  const [tab, setTab] = useState("mp3");

  const onTabChange = useCallback((value: string) => {
    setTab(value);
  }, []);

  const allMediaFormats = useMemo(
    () => ({
      mp3: filterAndMapAudioFormatsForMp3(media.formats, "audio/mp4;"),
      audio: filterAudioFormats(media.formats),
      video: filterAndAdjustVideoFormats(media.formats, media.duration),
    }),
    [media]
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{media.title}</CardTitle>
        <div className="flex justify-between">
          <CardDescription className="flex justify-between items-start">
            {media.author}
          </CardDescription>
          <Badge variant="secondary" className="self-end">
            {formatMediaDuration(parseInt(media.duration))}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-8">
        <div className={cn("w-full basis-1/3", tab == "watch" && "hidden")}>
          <img
            src={media.thumbnail}
            alt="imagem de thumbnail"
            className="object-contain rounded-lg border"
          />
        </div>
        <Tabs
          defaultValue="mp3"
          className={cn("basis-2/3 w-full", tab == "watch" && "basis-full")}
          value={tab}
          onValueChange={onTabChange}
        >
          <div className="flex justify-between items-start">
            <h4 className="text-2xl font-semibold tracking-tight translate-y-2 border-b border-foreground/10 pr-2 pl-0.5">
              {tab == "watch"
                ? "Assistir vídeo"
                : `Formatos de ${tab == "video" ? "videos" : "áudios"}`}
            </h4>
            <TabsList>
              <TabsTrigger value="mp3">MP3</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="watch" className="group max-h-8">
                <Play
                  className="w-4 group-aria-selected:stroke-primary group-hover:stroke-primary"
                  strokeWidth={3}
                />
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="mp3">
            {allMediaFormats.mp3 ? (
              <MediaTable
                formats={allMediaFormats.mp3}
                downloadMediaHandler={downloadMediaHandler}
              />
            ) : (
              <LoadingMedia />
            )}
          </TabsContent>
          <TabsContent value="audio">
            {allMediaFormats.audio ? (
              <MediaTable
                formats={allMediaFormats.audio}
                downloadMediaHandler={downloadMediaHandler}
              />
            ) : (
              <LoadingMedia />
            )}
          </TabsContent>
          <TabsContent value="video">
            {allMediaFormats.video ? (
              <MediaTable
                formats={allMediaFormats.video}
                downloadMediaHandler={downloadMediaHandler}
              />
            ) : (
              <LoadingMedia />
            )}
          </TabsContent>
          <TabsContent value="watch">
            <WatchVideoBlock title={media.title} />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
