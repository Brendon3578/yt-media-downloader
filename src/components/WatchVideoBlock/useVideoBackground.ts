import { useRef, useEffect } from "react";

interface UseVideoBackgroundProps {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  videoRef: React.RefObject<HTMLVideoElement>;
}

export const useVideoBackground = (): UseVideoBackgroundProps => {
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const init = () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      let step: number | undefined;

      if (!video || !canvas || mediaQuery.matches) {
        return;
      }

      const ctx = canvas.getContext("2d");

      if (!ctx) {
        return;
      }

      ctx.filter = "blur(1px)";

      const draw = () => {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      };

      const drawLoop = () => {
        draw();
        step = window.requestAnimationFrame(drawLoop);
      };

      const drawPause = () => {
        if (step) {
          window.cancelAnimationFrame(step);
          step = undefined;
        }
      };

      // Initialize
      video.addEventListener("loadeddata", draw);
      video.addEventListener("seeked", draw);
      video.addEventListener("play", drawLoop);
      video.addEventListener("pause", drawPause);
      video.addEventListener("ended", drawPause);

      // Clean up
      return () => {
        video.removeEventListener("loadeddata", draw);
        video.removeEventListener("seeked", draw);
        video.removeEventListener("play", drawLoop);
        video.removeEventListener("pause", drawPause);
        video.removeEventListener("ended", drawPause);
      };
    };

    init();
  }, [mediaQuery.matches]);

  return {
    canvasRef,
    videoRef,
  };
};
