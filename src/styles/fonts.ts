import { IBM_Plex_Sans, IBM_Plex_Mono, Montserrat } from "next/font/google";

export const MONO_THIN = IBM_Plex_Mono({
  weight: ["100"],
  subsets: ["latin"],
});

export const MONTS_NORMAL = Montserrat({
  subsets: ["latin"],
});

export const SANS = IBM_Plex_Sans({
  weight: ["400"],
  subsets: ["latin"],
});