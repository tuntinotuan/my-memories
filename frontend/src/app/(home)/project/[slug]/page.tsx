import { Metadata } from "next";
import BoardMainPage from "./modules/board.main.page";
import { capitalizeFirstLetter, convertSlug } from "@/utils/otherFs";

// Simulate fetching blog data based on slug
async function getBoard(slug: string) {
  return {
    title: `Board: ${convertSlug(slug)}`,
    description: "This is a dynamic board title.",
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const board = await getBoard(params.slug);

  return {
    title: board.title,
    description: board.description,
  };
}

export default function Page({ params }: any) {
  return <BoardMainPage params={params}></BoardMainPage>;
}
