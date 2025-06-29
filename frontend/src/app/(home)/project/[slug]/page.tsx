import { Metadata } from "next";
import BoardMainPage from "./modules/board.main.page";
import { capitalizeFirstLetter } from "@/utils/otherFs";

// Simulate fetching blog data based on slug
async function getBlogPost(slug: string) {
  const textId = slug.slice(slug.lastIndexOf("id"));
  const newSlug = slug.replace("-", " ").replace(textId, "");
  return {
    title: `Board: ${capitalizeFirstLetter(newSlug)}`,
    description: "This is a dynamic blog post.",
  };
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  return {
    title: post.title,
    description: post.description,
  };
}

export default function Page({ params }: any) {
  // useFetchSingleBoard(params);
  return (
    // <div className="flex w-full overflow-hidden">
    //   <LocalBody></LocalBody>
    //   <BoardSidebar />
    // </div>
    <BoardMainPage params={params}></BoardMainPage>
  );
}

// function LocalBody() {
//   const { singleBoard } = useCreateBoardStates();
//   return (
//     <div
//       className={`overflow-hidden w-full h-full text-white bg-no-repeat bg-cover bg-center`}
//       style={
//         singleBoard.img.type === "imageUrl"
//           ? { backgroundImage: `url(${singleBoard.img.url})` }
//           : singleBoard.img.type === "linearGradient"
//           ? {
//               backgroundImage: `linear-gradient(to bottom right, ${singleBoard.img.from}, ${singleBoard.img.to})`,
//             }
//           : { background: singleBoard.img.code }
//       }
//     >
//       <BoardMenu />
//       <BoardContainList />
//     </div>
//   );
// }
