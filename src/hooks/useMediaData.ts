import { useQuery } from "@tanstack/react-query";
import axios, { AxiosPromise } from "axios";
import { MediaInfoResponse } from "../interfaces/mediaInfoData";

const API_URL = "http://localhost:3000";

const fetchData = async (url: string): AxiosPromise<MediaInfoResponse> => {
  const response = await axios.get<MediaInfoResponse>(
    `${API_URL}/api/media-info?url=${url}`
  );
  return response;
};

export function useMediaData(url: string) {
  const query = useQuery({
    queryFn: () => fetchData(url),
    queryKey: ["media-info", url],
    enabled: !!url,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    retry: false,
  });

  return {
    ...query,
    data: query.data?.data,
  };
}
