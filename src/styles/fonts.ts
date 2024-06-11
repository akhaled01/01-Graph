import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

export const MONO_THIN = IBM_Plex_Mono({
  weight: ["200"],
  subsets: ["latin"],
});

export const MONO_NORMAL = IBM_Plex_Mono({
  weight: ["500"],
  subsets: ["latin"],
});

export const SANS = IBM_Plex_Sans({
  weight: ["200"],
  subsets: ["latin"],
});
