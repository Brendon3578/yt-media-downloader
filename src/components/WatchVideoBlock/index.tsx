import { ImageOff } from "lucide-react";
import { useWatchVideo } from "../../hooks/useWatchVideo";
import { Skeleton } from "../ui/skeleton";
import { VideoWithBackground } from "./VideoWithBackground";

type WatchVideoBlockProps = {
  title: string;
};

export function WatchVideoBlock({ title }: WatchVideoBlockProps) {
  const { data, isLoading, isError, error, refetch } = useWatchVideo(title);

  const videoUrl = `http://localhost:3000${data?.data.videoPath}`;

  return (
    <div className="my-16 ">
      {isLoading && (
        <Skeleton className="w-full aspect-video rounded-lg border border-border/50" />
      )}
      {isError && (
        <Skeleton className="p-8 w-full aspect-video rounded-lg flex items-center justify-center gap-4">
          <ImageOff className="size-12 stroke-destructive-foreground" />
          <p className="text-sm font-semibold  text-destructive-foreground max-w-60">
            É necessário o download de um vídeo para sua visualização
          </p>
        </Skeleton>
      )}
      {data?.data && <VideoWithBackground src={videoUrl} />}
      {/* <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Embedded youtube"
        allowFullScreen
      /> */}
    </div>
  );
}
