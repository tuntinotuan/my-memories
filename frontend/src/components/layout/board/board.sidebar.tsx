import CloseIcon from "@/components/icons/CloseIcon";
import React from "react";
import { useLayoutStates } from "@/contexts/layoutStates";
import ProjectImgOrGradient from "@/components/project/ProjectImgOrGradient";
import SettingIcon from "@/components/icons/SettingIcon";
import NotificationIcon from "@/components/icons/NotificationIcon";
import { BoardSidebarProps } from "./type";
import DoDisturbOnRoundedIcon from "@mui/icons-material/DoDisturbOnRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";
const BoardSidebar = () => {
  const { showMenuboard, handleShowMenuboard } = useLayoutStates();
  const lists = [
    {
      icon: (
        <LocalIconOverlay>
          <SettingIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Settings",
      disable: true,
    },
    {
      icon: (
        <ProjectImgOrGradient
          img={{ type: "linearGradient", from: "#e34935", to: "#f9a13d" }}
          width={24}
          height={24}
        />
      ),
      title: "Change background",
      disable: true,
    },
    {
      icon: (
        <LocalIconOverlay>
          <NotificationIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Notification",
      disable: true,
    },
  ];
  const list2 = [
    {
      icon: (
        <LocalIconOverlay>
          <ContentCopyOutlinedIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Copy board",
      disable: true,
    },
    {
      icon: (
        <LocalIconOverlay>
          <ReplyRoundedIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Share",
      disable: true,
    },
    {
      icon: (
        <LocalIconOverlay>
          <DoDisturbOnRoundedIcon fontSize="small" />
        </LocalIconOverlay>
      ),
      title: "Turn off the board",
      disable: true,
    },
  ];
  return (
    <div
      className={`relative shadow-md text-sm transition-all shrink-0 ${
        showMenuboard
          ? "h-full w-[300px] border border-gray-200 opacity-100 px-2 py-3 "
          : "w-0 h-0 overflow-hidden translate-x-[300px]"
      }`}
    >
      <div className="flex items-center justify-center pb-3 border border-transparent border-b-gray-200">
        <p className="font-bold">Menu</p>
        <CloseIcon
          className="absolute right-2"
          onClick={handleShowMenuboard}
        ></CloseIcon>
      </div>
      <div className="h-full overflow-auto pb-24">
        <BoardList values={lists}></BoardList>
        <BoardList values={list2}></BoardList>
        {/* <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni
          adipisci accusantium iste. Dolores obcaecati alias a dicta vel
          reprehenderit voluptates ratione laborum minus, esse laudantium
          voluptatum cumque culpa vitae optio id? Totam alias ut ullam quis
          minus voluptate? Animi iure porro nemo repellendus sapiente aperiam
          reiciendis! Repudiandae, doloremque. Sit, molestias. Qui modi labore
          ipsa consequatur nulla? Veniam voluptatem unde aperiam possimus odio
          autem officia illo sunt iste! Ex eveniet nesciunt reiciendis aperiam
          ea excepturi illo fugit, sapiente ullam consequuntur voluptate
          expedita. Dolor vitae accusantium voluptates odio dolores error autem
          tenetur accusamus. Modi esse incidunt libero temporibus aliquid nisi
          earum consequuntur nihil possimus totam cumque expedita fuga
          recusandae adipisci molestiae assumenda molestias eligendi eum,
          perferendis hic dolorem distinctio. Beatae, sequi ex aspernatur dolore
          sapiente sed rem perspiciatis molestiae repellendus aperiam esse
          aliquid aut expedita commodi, laborum distinctio ea vitae cupiditate
          voluptatem modi id. Corporis molestias eligendi inventore quod
          provident. Repellat ab aperiam corporis numquam eaque unde neque,
          earum quas soluta! Dicta repellendus optio fugit velit dignissimos
          explicabo, dolores ex aliquam magni quia eaque harum et assumenda?
          Unde culpa, optio nemo reprehenderit numquam provident quod tempore
          iusto minus excepturi est eligendi corrupti dignissimos aperiam
          pariatur dicta necessitatibus suscipit rerum quae deleniti molestias
          vitae! Nisi, asperiores officiis placeat, dolore aspernatur debitis
          adipisci similique at voluptatum quia doloremque magnam tenetur vitae
          facilis tempore voluptates quis! Temporibus, asperiores corrupti est
          doloremque a impedit quaerat atque sapiente quis dicta consequatur
          dolorum pariatur reprehenderit sint quibusdam repellendus animi
          incidunt et. Amet numquam nemo, ullam, quae nam obcaecati eos
          doloremque harum quasi ut tempora, laborum incidunt sapiente
          blanditiis voluptates aperiam odio assumenda! Mollitia tenetur
          asperiores magnam voluptate recusandae labore ad saepe? Architecto
          adipisci quo sint laboriosam delectus blanditiis, corporis libero
          natus vero atque quibusdam animi veniam. Debitis eligendi eaque, iusto
          necessitatibus laudantium excepturi suscipit quidem libero cumque
          maxime, reiciendis, eos iure quae hic nostrum quia enim rerum
          nesciunt. Esse soluta autem laborum maxime nostrum quaerat non
          necessitatibus atque, rerum sint minus saepe dolorem eum
          exercitationem unde veritatis vero amet natus. Sit nesciunt et iusto
          voluptas maiores explicabo sequi, aliquam quidem tempora debitis
          dolores incidunt consequatur quasi ex ipsa ipsam atque vel! Veniam sed
          voluptate aliquam nihil atque ut iure voluptatibus earum, eum, saepe
          nostrum vitae labore eligendi omnis tempora exercitationem veritatis
          porro consequuntur rerum beatae sunt deleniti. Expedita in commodi id
          corrupti consectetur possimus quam deleniti similique maiores libero
          assumenda accusantium officiis, atque sint odit autem officia natus
          sit dolore. Aperiam repudiandae minima, corrupti dolor inventore
          neque, voluptatum dolorem ipsum assumenda dicta libero tempore est
          fugiat quis omnis dolorum nisi ducimus harum. Dolorem labore nostrum
          repellat ipsam nihil! Sed totam laudantium impedit, facere quidem
          beatae aspernatur dolores ad autem ducimus libero asperiores, eius
          voluptatem quas quod omnis reiciendis. Reiciendis ipsa sunt odit non
          inventore voluptas quasi enim nesciunt facere praesentium. Nesciunt
          similique, reprehenderit velit ab natus eum et cumque dolores mollitia
          quas, nulla illum suscipit non ex unde rem fugiat distinctio
          voluptatum corporis pariatur dolorum! Nostrum cupiditate minima
          inventore enim asperiores cumque ipsum aliquid delectus officia, error
          id?
        </p> */}
      </div>
    </div>
  );
};

const BoardList = ({ values }: { values: BoardSidebarProps[] }) => {
  return (
    <div className="flex flex-col gap-1 border border-transparent border-b-gray-200 py-2">
      {values.map((value, index) => (
        <BoardItem
          icon={value.icon}
          title={value.title}
          disable={value.disable}
          key={index}
        ></BoardItem>
      ))}
    </div>
  );
};

const BoardItem = ({ icon, title, disable }: BoardSidebarProps) => {
  return (
    <div
      className={`flex items-center gap-2 p-2 rounded-lg hover:bg-primaryHover transition-all cursor-pointer ${
        disable ? "cursor-wait" : ""
      }`}
    >
      {icon}
      <p>{title}</p>
    </div>
  );
};

const LocalIconOverlay = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center justify-center w-6 h-6 shrink-0">
      {children}
    </div>
  );
};

export default BoardSidebar;
