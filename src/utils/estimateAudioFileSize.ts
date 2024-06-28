export function estimateAudioFileSize(lengthSeconds: string) {
  // Tamanho estimado baseado em bitrate médio para áudio e vídeo
  const lengthInSeconds = parseInt(lengthSeconds);

  const averageBitrate = 128; // kbps (128 kbps é uma qualidade média de áudio)
  const estimatedSize = ((lengthInSeconds * averageBitrate) / 8) * 1024; // Convertendo para bytes

  return estimatedSize;
}
