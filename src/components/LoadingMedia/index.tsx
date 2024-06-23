import { LoaderCircle } from "lucide-react";

export function LoadingMedia() {
  return (
    <div className="flex gap-2 w-full p-4 items-center justify-center">
      <LoaderCircle className="size-5 animate-spin" />
      <span className="font-medium">Carregando mídia...</span>
    </div>
  );
}
