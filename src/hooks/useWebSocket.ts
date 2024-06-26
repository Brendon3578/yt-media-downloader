import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ProgressData } from "../interfaces/progressData";

export function useWebSocket(endpoint: string) {
  const [socket, setSocket] = useState<Socket | null>(null);
  const queryClient = useQueryClient();
  useEffect(() => {
    const newSocket = io(endpoint, {
      reconnection: false,
    });

    newSocket.on("connect", () => {
      console.log(`[socket.io] Socket.io conectado! Id: ${newSocket.id}`);
      queryClient.setQueryData(["progress"], {
        progress: 0,
        message: "Esperando o download",
      });
    });

    newSocket.on("progress", (data: ProgressData) => {
      console.log("[socket.io] Recebendo progresso");
      queryClient.setQueryData(["progress"], data);

      if (data.progress === 100) {
        console.log("[socket.io] Download completo");
      }
    });

    newSocket.on("error", (error: Error) => {
      console.error("[socket.io] Erro: ", error);
      queryClient.setQueryData(["progress"], {
        progress: 0,
        message: "Erro na conexão com o servidor",
      });
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, [endpoint, queryClient]);

  return socket;
}
