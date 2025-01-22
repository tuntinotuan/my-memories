"use client";
import BoardMenu from "@/components/layout/board/board.menu";
import BoardSidebar from "@/components/layout/board/board.sidebar";

function generateStaticParams() {}
type ColorCode = { from: string; to: string; url?: string };
type UrlCode = { from?: string; to?: string; url: string; alt: string };
type GradientTypes = ColorCode | UrlCode;
export default function Page() {
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
        <BoardMenu />
        <div className="child p-2">
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
