export function estimateAudioFileSize(lengthSeconds: string) {
  // Tamanho estimado baseado em bitrate médio para áudio e vídeo
  const lengthInSeconds = parseInt(lengthSeconds, 10);
  let estimatedSize = 0;

  const averageBitrate = 128; // kbps (128 kbps é uma qualidade média de áudio)
  estimatedSize = ((lengthInSeconds * averageBitrate) / 8) * 1024; // Convertendo para bytes

  return estimatedSize;
}
