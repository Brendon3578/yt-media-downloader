import { useState, VideoHTMLAttributes } from "react";

import { useVideoAmbilight } from "../../hooks/useVideoAmbilight";
import { Switch } from "../ui/switch";
import { cn } from "../../lib/utils";

export const VideoPlayerWithAmbilight = ({
  ...props
}: VideoHTMLAttributes<HTMLElement>) => {
  const [toggleAmblight, setToggleAmblight] = useState(true);
  const { videoRef, canvasRef } = useVideoAmbilight();

  return (
    <>
      <section className="relative w-full aspect-video rounded-lg border border-border/50">
        <video
          ref={videoRef}
          controls
          className="absolute w-full bg-background/80 backdrop-blur-sm aspect-video z-40 top-0 left-0 rounded-lg"
          {...props}
        />
        <canvas
          aria-hidden="true"
          className={cn(
            "w-full h-full absolute top-0 aspect-video left-0 blur-2xl saturate-200 scale-110 opacity-85 z-30 pointer-events-none",
            !toggleAmblight && "hidden"
          )}
          ref={canvasRef}
        />
      </section>
      <div className="mt-4 flex items-center space-x-2">
        <Switch
          checked={toggleAmblight}
          onCheckedChange={setToggleAmblight}
          id="toggle-amblight"
        />
        <label htmlFor="toggle-amblight" className="text-muted-foreground">
          {toggleAmblight ? "Desativar " : "Ativar "}
          amblight
        </label>
      </div>
    </>
  );
};
