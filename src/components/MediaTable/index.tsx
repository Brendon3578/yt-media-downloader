import { Download } from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { mediaFormatType } from "../../types/mediaTypes";

type MediaTableProps = {
  formats: mediaFormatType[];
};

export function MediaTable({ formats }: MediaTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Resolução</TableHead>
          <TableHead>Informações do Arquivo</TableHead>
          <TableHead>Download</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {formats.map(
          ({
            size,
            quality,
            mimeType,
            container,
            audioBitrate,
            qualityLabel,
          }) => {
            const formatKey = `${mimeType.replace(" ", "")}-${quality}`;
            const mediaType = mimeType.split("/")[0];
            const isAudio = mediaType == "audio";
            const parsedKbSize = size / 1024 || 0;

            let fileSizeLabel = "? MB";
            if (parsedKbSize != 0) {
              fileSizeLabel =
                parsedKbSize > 1024
                  ? `${(parsedKbSize / 1024).toFixed(2)} MB`
                  : `${parsedKbSize.toFixed(2)} KB`;
            }

            const label = isAudio
              ? `${container} (${audioBitrate} kbps)`
              : `${qualityLabel} (${container})`;

            const codecMatch = mimeType.match(/codecs="([^"]+)"/);
            const codecLabel =
              codecMatch && codecMatch[1] ? codecMatch[1] : "Codec not found";

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
                      alert("get rick rolled");
                      window.location.href =
                        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
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
    </Table>
  );
}
