import { useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Search } from "lucide-react";

import { MediaFormatDialog } from "../components/MediaFormatDialog";
import { useMediaData } from "../hooks/useMediaData";
import { MediaCard } from "../components/MediaCard";
import { MediaCardSkeleton } from "../components/MediaCard/MediaCardSkeleton";
import { MediaErrorAlert } from "../components/MediaCard/MediaErrorAlert";
import { DownloadProgressBar } from "../components/DownloadProgressBar";
import { useDownloadMedia } from "../hooks/useDownloadMedia";
import { DownloadAlert } from "../components/DownloadAlert";

export function HomePage() {
  const [url, setUrl] = useState(
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley"
  );
  const {
    mutate: downloadMedia,
    data: downloadData,
    isPending,
  } = useDownloadMedia();
  const {
    data: mediaData,
    isLoading,
    isError,
    error,
    refetch,
  } = useMediaData(url);
  console.log("renderizou");

  function handleSearchMedia() {
    refetch();
  }

  function handleDownload() {
    downloadMedia({
      url,
      fileSize: 10 * 1024 * 1024, // Exemplo
      mediaType: "audio",
      extension: "mp3",
      audioBitrate: 128,
      addMetadata: false,
      addThumbnail: false,
    });
  }

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

      <DownloadProgressBar />

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
              onClick={handleSearchMedia}
            >
              <Search className="size-4" />
            </Button>

            <Button
              className="rounded-l-none"
              onClick={handleDownload}
              disabled={isPending}
            >
              {isPending ? "Baixano..." : "Baixar MP3"}
            </Button>
          </div>
        </div>
        <MediaFormatDialog>
          <Button variant="secondary" className="self-end w-full sm:w-auto">
            Baixar personalizado
          </Button>
        </MediaFormatDialog>
      </section>
      {downloadData && <DownloadAlert url={downloadData.data.downloadUrl} />}
      {isError && <MediaErrorAlert error={error} />}
      {isLoading && <MediaCardSkeleton />}
      {mediaData?.data && !isLoading && <MediaCard media={mediaData?.data} />}
    </div>
  );
}
