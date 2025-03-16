import HomeMenuSidebar from "@/components/layout/home/home.menu.sidebar";
import { DragDropLists } from "./(home)/project/[slug]/page";
import HomeContentCover from "@/components/layout/home/home.content.cover";
import HomeSidebar from "@/components/layout/home/home.sidebar";
import HomeSidebarCover from "@/components/layout/home/home.sidebar.cover";
import OriginalBanner from "@/components/banner/OriginalBanner";
import { Image } from "@nextui-org/react";
import { projectList } from "@/api/board/mock.data";
import ProjectImgOrGradient from "@/components/project/ProjectImgOrGradient";
import Link from "next/link";
export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <div className="flex h-full bg-efColor">
      <HomeMenuSidebar></HomeMenuSidebar>
      <HomeSidebarCover>
        <HomeSidebar />
        <HomeContentCover className="flex-col gap-2 px-6">
          <OriginalBanner
            src="/banner-design-today.jpg"
            title="What will you design to day?"
            positionTitle="center"
          ></OriginalBanner>
          <h1 className="text-2xl font-semibold">Recent designs</h1>
          <div className="list-card grid grid-cols-4 gap-6">
            {projectList.map((item, index) => (
              <div
                className="flex flex-col w-[220px] h-[222px] gap-2"
                key={index}
              >
                <Link
                  href={`/project/${item.title}`}
                  className="flex justify-center items-end w-full h-full bg-efColor rounded-lg px-4 pt-4 cursor-pointer"
                >
                  <ProjectImgOrGradient img={item.img}></ProjectImgOrGradient>
                </Link>
                <p className="text-sm font-bold truncate">{item.title}</p>
                <span className="text-xs text-primaryText cursor-pointer">
                  Edited 4 days ago
                </span>
              </div>
            ))}
          </div>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dicta
            aliquid beatae voluptas accusamus corrupti minima aperiam
            perferendis illo, quia dolor officia quasi saepe, at fugit quibusdam
            aliquam obcaecati maiores, facere iste distinctio similique autem
            recusandae excepturi. Iusto earum quam impedit iste dicta totam,
            quidem qui id nisi quisquam debitis ex aspernatur hic autem quas est
            placeat. Obcaecati, similique provident! Aperiam, architecto atque.
            Ullam quos qui perspiciatis asperiores hic labore vitae iure magnam
            unde voluptatum dolore ipsa accusantium quae odio ab odit possimus
            cumque eius, minus saepe harum fuga. Adipisci, expedita. Atque
            mollitia error totam optio, vitae fugiat. Accusantium, quod dicta
            obcaecati qui quibusdam ipsum ad sit accusamus, repudiandae dolor,
            doloremque quo. Ea quidem rerum saepe nisi necessitatibus facilis
            mollitia, explicabo reiciendis numquam at libero atque vero
            perferendis, quos quibusdam voluptas fugit eos earum? Sint iusto
            voluptatem, error soluta illum ipsa ipsum recusandae fugiat aperiam
            voluptates quod, deleniti nulla nisi tempore ut. Tempore similique
            ad cumque voluptatum maxime ratione necessitatibus vero facilis
            repudiandae officiis. Possimus quisquam qui ducimus nesciunt
            voluptatum consequuntur dolore, iure unde dolor quam eveniet odio,
            deserunt recusandae esse? Sequi nam ipsum sunt facere! Itaque
            consequuntur saepe consectetur, dolore alias sequi eaque repudiandae
            doloremque ad. Unde minus deleniti recusandae nemo voluptate
            repellendus ipsum pariatur eaque. Incidunt rerum, officiis
            laboriosam vitae ex doloribus maiores adipisci reprehenderit. Dicta
            sit necessitatibus, nisi ipsam aperiam aliquid! Porro expedita
            asperiores dicta molestias eos labore? Cupiditate, natus placeat
            distinctio aspernatur sunt recusandae aut architecto consectetur,
            inventore totam quod aliquid quisquam optio ratione harum dicta
            nostrum accusantium voluptas eligendi quo enim quis libero iure
            doloribus. Aliquam quis labore sapiente aspernatur aut ut! Neque
            amet rem nobis deserunt iure blanditiis, dolorum doloribus commodi
            quas quidem optio ratione et, veritatis sapiente, facilis saepe unde
            labore dicta nisi ab! Vel quasi ex, architecto ipsa repellat, dolore
            adipisci enim quae tenetur fugiat dolores sit tempora minima.
            Nesciunt ipsum magnam fugit velit sunt maiores vitae magni assumenda
            impedit quod, facilis perspiciatis totam amet in hic pariatur eos
            aliquam minus, ab porro officia optio quae mollitia. Quas sit
            accusamus aut, quis quisquam dignissimos praesentium consequuntur
            delectus rem repellat facilis? Esse consectetur iure accusamus nobis
            quasi totam. Error, perspiciatis? Hic corrupti ipsam inventore
            obcaecati amet quas? Ipsam, nihil sint commodi praesentium totam
            rerum adipisci saepe consequatur maxime rem, fuga sequi quibusdam,
            vitae suscipit nobis. Blanditiis facere itaque cumque iste,
            temporibus dignissimos laborum autem voluptatem! Hic explicabo culpa
            recusandae doloribus delectus quasi ex iusto mollitia aut optio
            distinctio, praesentium at consequuntur odit id consequatur ipsam
            quod a dolore quisquam suscipit nulla sequi! Totam quod reiciendis
            quas aut libero. Dicta id atque necessitatibus, odit eos aut nobis
            consequatur eius mollitia minus voluptatem tempore rerum modi cumque
            illo nulla sunt est, commodi enim itaque ut tenetur dolor aliquam
            eveniet? Aspernatur nemo rem, adipisci nam obcaecati labore neque
            animi harum consectetur deleniti, officia minus repudiandae amet
            eligendi nisi dolore eos magnam voluptatibus quae! Vel cumque
            temporibus mollitia officia natus, reiciendis officiis impedit alias
            beatae architecto ex voluptatibus? Ipsam corrupti at asperiores
            neque quo? Rem ab officia autem.
          </p>
          <DragDropLists></DragDropLists>
        </HomeContentCover>
      </HomeSidebarCover>
    </div>
  );
}
