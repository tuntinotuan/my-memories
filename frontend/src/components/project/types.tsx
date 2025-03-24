import { Id } from "@/app/(home)/project/[slug]/modules/types";

type Linear = { type: "linearGradient"; from: string; to: string };
type Url = { type: "imageUrl"; url: string; alt: string };

export type LinearOrUrl = Linear | Url;

export type ProjectImgOrGradientProps = {
  img: LinearOrUrl;
  className?: string;
  width?: number;
  height?: number;
};
export type ProjectCardItemProps = {
  id?: Id;
  title: string;
  img: LinearOrUrl;
};
