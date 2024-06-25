import { useMutation } from "@tanstack/react-query";
import { useWebSocket } from "./useWebSocket";
import { DownloadMediaParams } from "../interfaces/downloadMediaParams";
import axios from "axios";
import { DownloadResult } from "../interfaces/downloadData";

const API_WEBSOCKET_ENDPOINT = "ws://localhost:3000";
const API_ENDPOINT = "http://localhost:3000/api/download";

function useDownloadMedia() {
  const socket = useWebSocket(API_WEBSOCKET_ENDPOINT);

  return useMutation({
    mutationFn: async (params: DownloadMediaParams) => {
      if (!socket) {
        throw new Error("Socket not initialized!");
      }

      if (!socket.connected && socket.disconnected) {
        console.log("Trying to reconnect socket.");
        socket.connect();
        await new Promise((res) => setTimeout(res, 1000));
      }

      if (!params.url) throw new Error("URL is required!");

      console.log("[download] Download started!");

      return await axios.post<DownloadResult>(API_ENDPOINT, params, {
        headers: {
          "socket-id": socket.id,
        },
      });
    },
  });
}

export { useDownloadMedia };
