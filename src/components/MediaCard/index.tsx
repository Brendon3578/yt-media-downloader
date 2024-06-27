import { MediaInfoData } from "../../interfaces/mediaInfoData";
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
import { useState } from "react";
import { cn } from "../../lib/utils";

type MediaCardProps = {
  media: MediaInfoData;
  downloadMediaHandler: (params: Omit<DownloadMediaParams, "url">) => void;
};

export function MediaCard({ media, downloadMediaHandler }: MediaCardProps) {
  const [tab, setTab] = useState("mp3");

  const onTabChange = (value: string) => {
    setTab(value);
  };
  const allMediaFormats = {
    mp3: media.formats
      .filter(({ mimeType }) => mimeType.includes("audio/mp4;"))
      .map((format) => ({
        ...format,
        container: format.container.replace("mp4", "mp3"),
      })),
    audio: media.formats.filter((format) => format.mimeType.includes("audio/")),
    video: media.formats.filter((format) => format.mimeType.includes("video/")),
  };

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
            <h4 className="text-2xl font-semibold tracking-tight translate-y-2 border-b border-foreground/10 px-1 pr-4">
              Formatos de música
            </h4>
            <TabsList>
              <TabsTrigger value="mp3">MP3</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
              <TabsTrigger value="watch" className="group">
                <Play
                  className="w-4 group-aria-selected:stroke-primary"
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
