import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "../ui/alert";

type MediaErrorProps = {
  error: Error;
};

export function MediaError({ error }: MediaErrorProps) {
  console.log(error);
  return (
    <Alert>
      <AlertCircle className="h-5 w-5" />
      <AlertTitle>Erro de rede</AlertTitle>
      <AlertDescription>
        Não foi possível trazer as informações da mídia. Tente novamente ou
        contate o administrador.
      </AlertDescription>
    </Alert>
  );
}
