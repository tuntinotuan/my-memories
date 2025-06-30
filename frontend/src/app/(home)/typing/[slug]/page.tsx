import { Metadata } from "next";
import { convertSlug } from "@/utils/otherFs";
import TypingMainPage from "../modules/layout/typing.main.page";

// Simulate fetching blog data based on slug
async function getTyping(slug: string) {
  return {
    title: `List: ${convertSlug(slug)}`,
    description: "This is a dynamic list title.",
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const list = await getTyping(params.slug);

  return {
    title: list.title,
    description: list.description,
  };
}

export default function Page({ params }: any) {
  return <TypingMainPage params={params}></TypingMainPage>;
}
