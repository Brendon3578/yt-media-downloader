import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { WatchVideoResponse } from "../interfaces/watchVideoData";

const API_URL = "http://localhost:3000/api";

const fetchData = async (title: string): AxiosPromise<WatchVideoResponse> => {
  const response = await axios.get<WatchVideoResponse>(
    `${API_URL}/watch-video?title=${title}`
  );
  return response;
};

export function useWatchVideo(title: string) {
  const query = useQuery({
    queryFn: () => fetchData(title),
    queryKey: ["watch-video", title],
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
