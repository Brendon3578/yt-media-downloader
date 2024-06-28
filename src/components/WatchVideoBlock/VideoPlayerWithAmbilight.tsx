import { VideoHTMLAttributes } from "react";

import { useVideoAmbilight } from "../../hooks/useVideoAmbilight";

export const VideoPlayerWithAmbilight = ({
  ...props
}: VideoHTMLAttributes<HTMLElement>) => {
  const { videoRef, canvasRef } = useVideoAmbilight();

  return (
    <section className="relative w-full aspect-video rounded-lg border border-border/50">
      <video
        ref={videoRef}
        controls
        className="absolute w-full z-40 top-0 left-0 rounded-lg"
        {...props}
      />
      <canvas
        aria-hidden="true"
        className="w-full h-full absolute top-0 left-0 blur-2xl scale-110 opacity-85 z-30 pointer-events-none"
        ref={canvasRef}
      />
    </section>
  );
};
