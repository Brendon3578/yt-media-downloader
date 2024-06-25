import { useQuery } from "@tanstack/react-query";
import { Progress } from "../ui/progress";

export function DownloadProgressBar() {
  const { data } = useQuery({
    queryKey: ["progress"],
    initialData: { progress: 0, message: "Esperando o download" },
    retry: 1,
  });

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium leading-none">{data.message}</p>
      <Progress value={data.progress} />
    </div>
  );
}
