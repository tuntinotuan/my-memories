import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { LinearOrUrl } from "@/components/project/types";

export type Board = {
  id: Id;
  title: string;
  img: LinearOrUrl;
};
