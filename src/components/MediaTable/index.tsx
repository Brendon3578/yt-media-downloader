import { Download } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  StickTableHeader,
  ScrollableTable,
} from "../ui/table";
import { ScrollArea } from "../ui/scroll-area";
import { mediaFormatType } from "../../interfaces/mediaInfoData";
import { DownloadMediaParams } from "../../interfaces/downloadMediaParams";
import { memo, useCallback } from "react";

type MediaTableProps = {
  formats: mediaFormatType[];
  downloadMediaHandler: (params: Omit<DownloadMediaParams, "url">) => void;
};

function formatFileSize(size: number) {
  const parsedKbSize = size / 1024 || 0;
  if (parsedKbSize === 0) return "? MB";
  return parsedKbSize > 1024
    ? `${(parsedKbSize / 1024).toFixed(2)} MB`
    : `${parsedKbSize.toFixed(2)} KB`;
}

function getCodecLabel(mimeType: string) {
  const codecMatch = mimeType.match(/codecs="([^"]+)"/);
  return codecMatch && codecMatch[1] ? codecMatch[1] : "Codec not found";
}

export const MediaTable = memo(
  ({ formats, downloadMediaHandler }: MediaTableProps) => {
    console.log("MediaTable rendered!");

    const handleDownload = useCallback(
      (params: Omit<DownloadMediaParams, "url">) => {
        downloadMediaHandler(params);
      },
      [downloadMediaHandler]
    );

    return (
      <ScrollArea className="h-[400px] pr-[9px] rounded  border border-border/50 hover:border-border">
        <ScrollableTable>
          <StickTableHeader>
            <TableRow>
              <TableHead>Resolução</TableHead>
              <TableHead>Informações do Arquivo</TableHead>
              <TableHead>Download</TableHead>
            </TableRow>
          </StickTableHeader>
          <TableBody className="overflow-hidden h-40">
            {formats.map(
              ({
                size,
                quality,
                mimeType,
                container,
                audioBitrate,
                qualityLabel,
              }) => {
                const formatKey = `${container}-${quality}-${mimeType.replace(
                  " ",
                  ""
                )}-${size}`;
                const mediaType = mimeType.split("/")[0];
                const isAudio = mediaType == "audio";
                const isVideo = mediaType == "video";
                const videoResolution = isVideo ? qualityLabel : undefined;

                const fileSizeLabel = formatFileSize(size);
                const label = isAudio
                  ? `${container} (${audioBitrate} kbps)`
                  : `${qualityLabel} (${container})`;
                const codecLabel = getCodecLabel(mimeType);

                return (
                  <TableRow key={formatKey}>
                    <TableCell className="font-medium">{label}</TableCell>
                    <TableCell className="">
                      <div className="flex gap-1 flex-wrap">
                        <Badge title="Tamanho do arquivo" variant="default">
                          {fileSizeLabel}
                        </Badge>
                        <Badge variant="secondary" title="Tipo de codificação">
                          {codecLabel}
                        </Badge>
                        <Badge variant="secondary" title="Qualidade do arquivo">
                          {quality}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          handleDownload({
                            extension: container,
                            fileSize: size,
                            mediaType: isAudio ? "audio" : "video",
                            ...(videoResolution && { videoResolution }),
                            addMetadata: false,
                            addThumbnail: false,
                            ...(audioBitrate && { audioBitrate }),
                          });
                        }}
                      >
                        <Download className="mr-2 h-4 w-4" /> Baixar mídia
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              }
            )}
          </TableBody>
        </ScrollableTable>
      </ScrollArea>
    );
  }
);
