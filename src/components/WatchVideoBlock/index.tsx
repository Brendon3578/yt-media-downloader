import { VideoWithBackground } from "./VideoWithBackground";

type WatchVideoBlockProps = {
  url: string;
};

export function WatchVideoBlock({ url }: WatchVideoBlockProps) {
  return (
    <div className="my-8 mt-12 ">
      <VideoWithBackground src="http://localhost:3000/downloads/video/Vierre%20Cloud%20-%20moment%20(Official%20Audio)_1080p.mp4" />
      {/* <iframe
        className="absolute top-0 left-0 w-full h-full"
        src={url}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        title="Embedded youtube"
        allowFullScreen
      /> */}
    </div>
  );
}
