import { useCallback, useEffect, useMemo, useState } from "react";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { Check, Search } from "lucide-react";

import { MediaFormatDialog } from "../components/MediaFormatDialog";
import { useMediaData } from "../hooks/useMediaData";
import { MediaCard } from "../components/MediaCard";
import { MediaCardSkeleton } from "../components/MediaCard/MediaCardSkeleton";
import { MediaErrorAlert } from "../components/MediaCard/MediaErrorAlert";
import { DownloadProgressBar } from "../components/DownloadProgressBar";
import { useDownloadMedia } from "../hooks/useDownloadMedia";
import { DownloadAlert } from "../components/DownloadAlert";
import { DownloadMediaParams } from "../interfaces/downloadMediaParams";
import { useToast } from "../components/ui/use-toast";
import { AxiosError } from "axios";
import { getRandomMusic } from "../utils/data";

export function HomePage() {
  // console.log("HomePage rendered!");
  const [url, setUrl] = useState(getRandomMusic());
  const [previousUrl, setPreviousUrl] = useState("");

  const {
    mutate: downloadMedia,
    data: downloadData,
    isError: isDownloadError,
    isSuccess: isDownloadSuccess,
    error: downloadError,
    isPending,
  } = useDownloadMedia();
  const {
    data: mediaData,
    isLoading: isMediaLoading,
    isError: isMediaError,
    error: mediaError,

    refetch,
  } = useMediaData(url);

  const { toast } = useToast();

  const hasError = useMemo(
    () => isDownloadError || isMediaError,
    [isDownloadError, isMediaError]
  );

  useEffect(() => {
    if (isDownloadSuccess) {
      toast({
        description: (
          <div className="flex gap-2 items-center">
            <Check className="size-6 stroke-primary" />
            <span>Download feito com sucesso</span>
          </div>
        ),
      });
    }
  }, [isDownloadSuccess, toast]);

  useEffect(() => {
    if (hasError) {
      toast({
        title: "Oops...",
        description:
          "Não foi possível realizar o download ou a procura da mídia.",
      });
    }
  }, [hasError, toast]);

  const handleSearchMedia = useCallback(() => {
    if (url !== previousUrl) {
      setPreviousUrl(url);
      refetch();
    }
  }, [url, previousUrl, refetch]);

  const handleDownload = useCallback(
    (params: Omit<DownloadMediaParams, "url">) => {
      console.log(url, params);
      if (isPending) {
        toast({
          title: "Uma mídia já está sendo baixada.",
          description: "Espere ela terminar para baixar outra novamente.",
        });
        return;
      }

      downloadMedia({
        url,
        ...params,
      });
    },
    [url, isPending, downloadMedia, toast]
  );

  const handleMp3Download = useCallback(() => {
    handleDownload({
      fileSize: 10 * 1024 * 1024, // Exemplo
      mediaType: "audio",
      extension: "mp3",
      audioBitrate: 128,
      addMetadata: false,
      addThumbnail: false,
    });
  }, [handleDownload]);

  return (
    <div className="flex flex-col gap-8 mt-8 p-2">
      <h2 className="mx-auto scroll-m-20 border-b pb-2 text-3xl md:text-4xl font-extrabold tracking-tight first:mt-0">
        Baixe músicas ou vídeos do <span className="text-primary">YouTube</span>
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
              onClick={handleMp3Download}
              disabled={isPending}
            >
              {isPending ? "Baixando..." : "Baixar MP3"}
            </Button>
          </div>
        </div>
        <MediaFormatDialog downloadMediaHandler={handleDownload}>
          <Button variant="secondary" className="self-end w-full sm:w-auto">
            Baixar personalizado
          </Button>
        </MediaFormatDialog>
      </section>
      {downloadData && <DownloadAlert url={downloadData.data.downloadUrl} />}
      {hasError && (
        <MediaErrorAlert
          error={(downloadError as AxiosError) || (mediaError as AxiosError)}
        />
      )}
      {isMediaLoading && <MediaCardSkeleton />}
      {mediaData?.data && !isMediaLoading && (
        <MediaCard
          media={mediaData?.data}
          downloadMediaHandler={handleDownload}
        />
      )}
    </div>
  );
}
