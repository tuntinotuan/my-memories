"use client";
import Button from "@/components/button/Button";
import CloseIcon from "@/components/icons/CloseIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";
// export async function generateStaticParams() {
//   return [{ slug: 'post-1' }, { slug: 'post-2' }];
// }
// function generateStaticParams() {
//   return [{ slug: "post-1" }, { slug: "post-2" }];
// }

// export async function generateStaticParams() {
//   // Fetch all possible slugs (e.g., from an API or CMS)
//   // const res = await fetch("https://example.com/api/posts");
//   // const posts = await res.json();

//   // // Map slugs to params
//   // return posts.map((post: any) => ({
//   //   slug: post.slug,
//   // }));
//   return [{ slug: "post-1" }, { slug: "post-2" }];
// }

type ColorCode = { from: string; to: string; url?: string };
type UrlCode = { from?: string; to?: string; url: string; alt: string };
type GradientTypes = ColorCode | UrlCode;
export default function Page({ params }: any) {
  // let defaultGradient: GradientTypes = { url: "/moment.png", alt: "moment" };
  let defaultGradient: GradientTypes = { from: "#6f5dc6", to: "#e374bc" };
  return (
    <>
      <div
        className={`w-full h-full text-white bg-gradient-to-br from-[${defaultGradient.from}] to-[${defaultGradient.to}] bg-no-repeat bg-cover`}
        style={
          !defaultGradient.from
            ? { backgroundImage: `url(${defaultGradient.url})` }
            : {
                backgroundImage: `linear-gradient(to bottom right, ${defaultGradient.from}, ${defaultGradient.to})`,
              }
        }
      >
        <BoardMenu slug={params.slug} />
        <div className="child p-2 flex flex-col gap-2">
          <Button className="!justify-start w-[250px] hover:bg-opacity-15 bg-white bg-opacity-30">
            <PlusIcon></PlusIcon>Add a list
          </Button>
          <div className="flex flex-col gap-2 w-[250px] bg-white text-primaryText rounded p-2">
            <input
              type="text"
              placeholder="Enter list name..."
              className="border-2 border-transparent focus:border-2 focus:border-secondaryColor rounded transition-all p-2"
            />
            <div className="flex items-center gap-2">
              <Button className="bg-primaryColor text-white hover:bg-primaryColor hover:brightness-110">
                Add list
              </Button>
              <CloseIcon></CloseIcon>
            </div>
          </div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Velit
            expedita, quia harum nobis reiciendis a aliquam esse itaque
            asperiores? Nemo atque temporibus perferendis non placeat voluptates
            pariatur maiores, modi ipsum possimus magnam sapiente qui corporis
            hic, impedit voluptas labore? Deleniti dolor cumque autem tempore
            soluta aut reiciendis nisi consectetur accusamus est explicabo
            debitis qui minima dicta similique earum quaerat nemo reprehenderit
            maxime facere ab, dolorum omnis quisquam? Laudantium, distinctio.
            Deserunt officiis facere soluta minima quas debitis doloribus fuga
            repellat cupiditate quisquam tempore laboriosam dicta sequi,
            assumenda, necessitatibus corrupti molestias optio. Tempora corrupti
            id ut pariatur cupiditate hic eligendi reiciendis doloremque.
          </p>
        </div>
      </div>
      <BoardSidebar />
    </>
  );
}
