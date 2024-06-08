export const FMT_XP = (bytes: number): string => {
  if (bytes === 0) {
    return "0 KB";
  }

  const kiloBytes = bytes / 1000;
  if (kiloBytes < 1000) {
    return `${kiloBytes.toFixed(1)} KB`;
  } else {
    const megaBytes = kiloBytes / 1000;
    return `${megaBytes.toFixed(1)} MB`;
  }
};
