/**
 * format xp bytes to a nice XP format (kB or mB)
 * @param bytes - raw number of bytes 
 * @returns formatted xp string
 */
export const FMT_XP = (bytes: number, degree: number): string => {
  if (bytes === 0) {
    return "0 KB";
  } else if (bytes < 1000) {
    return bytes.toString() + "B";
  }

  const kiloBytes = bytes / 1000;
  if (kiloBytes < 1000) {
    return `${kiloBytes.toFixed(degree)}kB`;
  } else {
    const megaBytes = kiloBytes / 1000;
    return `${megaBytes.toFixed(degree)}mB`;
  }
};
