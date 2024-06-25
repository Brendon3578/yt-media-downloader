import { CircleCheck } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type DownloadAlertProps = {
  url: string;
};

export function DownloadAlert({ url }: DownloadAlertProps) {
  const API_DOWNLOADS_URL = "http://localhost:3000";
  return (
    <Alert>
      <CircleCheck className="size-5 stroke-primary" />
      <AlertTitle>Download feito com sucesso</AlertTitle>
      <AlertDescription>
        Para acessar o download{" "}
        <a
          href={`${API_DOWNLOADS_URL}${url}`}
          className="underline text-primary font-semibold"
          target="_blank"
          referrerPolicy="origin"
        >
          clique aqui
        </a>
      </AlertDescription>
    </Alert>
  );
}
