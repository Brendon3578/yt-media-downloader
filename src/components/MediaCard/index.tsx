import { MediaInfoData } from "../../interfaces/mediaInfoData";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import thumbnail from "../../assets/thumbnail-placeholder.jpeg";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { formatMediaDuration } from "../../utils/formatMediaDduration";
import { LoadingMedia } from "../LoadingMedia";
import { MediaTable } from "../MediaTable";
import { Badge } from "../ui/badge";

type MediaCardProps = {
  media: MediaInfoData;
};

export function MediaCard({ media }: MediaCardProps) {
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
      <CardContent className="flex gap-8 flex-col md:flex-row">
        <div className="w-full max-w-[340px]">
          <img
            src={thumbnail}
            alt="imagem de thumbnail"
            className=" object-contain rounded-lg border"
          />
        </div>
        <Tabs defaultValue="mp3" className="w-full">
          <div className="flex justify-between items-start">
            <h4 className="text-2xl font-semibold tracking-tight border-b border-primary px-1 pr-4">
              Tipos de mídia
            </h4>
            <TabsList>
              <TabsTrigger value="mp3">MP3</TabsTrigger>
              <TabsTrigger value="audio">Audio</TabsTrigger>
              <TabsTrigger value="video">Video</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="mp3">
            {allMediaFormats.mp3 ? (
              <MediaTable formats={allMediaFormats.mp3} />
            ) : (
              <LoadingMedia />
            )}
          </TabsContent>
          <TabsContent value="audio">
            {allMediaFormats.audio ? (
              <MediaTable formats={allMediaFormats.audio} />
            ) : (
              <LoadingMedia />
            )}
          </TabsContent>
          <TabsContent value="video">
            {allMediaFormats.video ? (
              <MediaTable formats={allMediaFormats.video} />
            ) : (
              <LoadingMedia />
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
