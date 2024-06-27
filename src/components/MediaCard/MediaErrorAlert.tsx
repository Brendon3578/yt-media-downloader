import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";
import { AxiosError } from "axios";

type MediaErrorAlertProps = {
  error: AxiosError | null;
};

export function MediaErrorAlert({ error }: MediaErrorAlertProps) {
  console.error(error);
  console.log(error?.response?.status);
  const errorStatus = error?.response?.status;
  const alertMessage = {
    title: errorStatus == 404 ? "O vídeo procurado não existe" : "Erro de rede",
    message:
      "Não foi possível trazer as informações da mídia. Tente novamente ou contate o administrador.",
  };

  return (
    <Alert>
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>{alertMessage.title}</AlertTitle>
      <AlertDescription>{alertMessage.message}</AlertDescription>
    </Alert>
  );
}
