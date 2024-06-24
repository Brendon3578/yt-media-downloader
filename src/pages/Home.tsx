import { useEffect, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

import { Progress } from "../components/ui/progress";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import thumbnail from "../assets/thumbnail-placeholder.jpeg";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { mediaDetailsData } from "../utils/data";
import { MediaTable } from "./../components/MediaTable/index";
import { mediaDetailsType } from "../types/mediaTypes";
import { LoadingMedia } from "../components/LoadingMedia";
import { formatMediaDuration } from "../utils/formatMediaDduration";
import { MediaFormatDialog } from "../components/MediaFormatDialog";

export function HomePage() {
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
  );
  const [mediaDetails, setMediaDetails] = useState<mediaDetailsType>();
  console.log("renderizou");

  useEffect(() => {
    setMediaDetails(mediaDetailsData);
  }, []);

  const mp3MediaFormats = mediaDetails?.formats
    .filter(({ mimeType }) => mimeType.includes("audio/mp4;"))
    .map((format) => ({
      ...format,
      container: format.container.replace("mp4", "mp3"),
    }));

  const audioMediaFormats = mediaDetails?.formats.filter((format) =>
    format.mimeType.includes("audio/")
  );
  const videoMediaFormats = mediaDetails?.formats.filter((format) =>
    format.mimeType.includes("video/")
  );

  return (
    <div className="flex flex-col gap-8">
      <h2 className="mx-auto scroll-m-20 border-b pb-2 text-3xl md:text-4xl font-extrabold tracking-tight first:mt-0">
        Baixe músicas ou vídeos do&nbsp;
        <span className="text-primary">YouTube</span>
      </h2>

      <p className="leading-7 ">
        Digite o link do vídeo ou da música, no campo abaixo, e clique no botão
        para baixar a música no formato em que desejar
      </p>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium leading-none">Esperando o download</p>
        <Progress value={20} />
      </div>

      <section className="flex flex-col sm:flex-row gap-3 items-stretch">
        <div className="flex flex-col gap-2 w-full">
          <Label htmlFor="url">Link da música ou vídeo do YouTube</Label>
          <div className="flex w-full items-center">
            <Input
              type="text"
              id="url"
              placeholder="Insira a URL do YouTube"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-r-none border-r-0 z-10"
            />
            <Button
              size="icon"
              variant="outline"
              className="min-w-10 rounded-none"
            >
              <Search className="size-4" />
            </Button>

            <Button className="rounded-l-none">Baixar MP3</Button>
          </div>
        </div>
        <MediaFormatDialog>
          <Button variant="secondary" className="self-end w-full sm:w-auto">
            Baixar personalizado
          </Button>
        </MediaFormatDialog>
      </section>
      {mediaDetails && (
        <Card>
          <CardHeader>
            <CardTitle>{mediaDetails.title}</CardTitle>
            <div className="flex justify-between">
              <CardDescription className="flex justify-between items-start">
                {mediaDetails.author}
              </CardDescription>
              <Badge variant="secondary" className="self-end">
                {formatMediaDuration(parseInt(mediaDetails.duration))}
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
                {mp3MediaFormats ? (
                  <MediaTable formats={mp3MediaFormats} />
                ) : (
                  <LoadingMedia />
                )}
              </TabsContent>
              <TabsContent value="audio">
                {audioMediaFormats ? (
                  <MediaTable formats={audioMediaFormats} />
                ) : (
                  <LoadingMedia />
                )}
              </TabsContent>
              <TabsContent value="video">
                {videoMediaFormats ? (
                  <MediaTable formats={videoMediaFormats} />
                ) : (
                  <LoadingMedia />
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
