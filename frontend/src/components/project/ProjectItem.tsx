import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import ThreeDotsIcon from "../icons/ThreeDotsIcon";
import ProjectImgOrGradient from "./ProjectImgOrGradient";
import { LinearOrUrl } from "./types";
import { cutIdFromSlug, replaceAllTrim } from "@/utils/otherFs";
import { Id } from "@/app/(home)/project/[slug]/modules/types";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { usePathname } from "next/navigation";

const ProjectItem = ({
  img,
  title,
  id,
}: {
  img?: LinearOrUrl;
  title: string;
  id?: Id;
}) => {
  let controlClass =
    "flex items-center justify-center bg-primaryHover transition-all hover:bg-gray-300 px-2 py-2 rounded-md";
  const newTitle = replaceAllTrim(title);
  const path = usePathname();
  const titleInPath = path.replace("/project/", "");
  return (
    <div
      className={`relative w-full group flex items-center gap-2 truncate p-2 rounded-md cursor-pointer shrink-0 transition-all ${
        id === Number(cutIdFromSlug(path, "-id")) ||
        replaceAllTrim(title) + "/" === titleInPath
          ? "bg-primaryColor bg-opacity-10 hover:none"
          : "hover:bg-primaryHover"
      }`}
    >
      <Link
        href={`/project/${id ? newTitle + "-id" + id : newTitle}`}
        className="absolute inset-0"
      ></Link>
      {img && (
        <ProjectImgOrGradient
          img={img}
          width={24}
          height={24}
        ></ProjectImgOrGradient>
      )}
      <p
        className={`text-sm truncate text-ellipsis overflow-hidden w-full group-hover:w-3/5 ${
          id === Number(cutIdFromSlug(path, "-id")) ||
          replaceAllTrim(title) + "/" === titleInPath
            ? "text-primaryColor"
            : "text-primaryText"
        }`}
      >
        {title}
      </p>
      <div className="absolute right-1 flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100">
        <Tooltip
          showArrow
          content="Open in new tab"
          placement="bottom"
          radius="sm"
          delay={200}
          closeDelay={200}
          className="!px-2 !py-[2px]"
          shadow="sm"
        >
          <Link
            href={`/project/${id ? newTitle + "-id" + id : newTitle}`}
            rel="noopener noreferrer"
            target="_blank"
            className={controlClass}
          >
            <OpenInNewIcon fontSize="inherit"></OpenInNewIcon>{" "}
          </Link>
        </Tooltip>
        <ThreeDotsIcon
          fontSize="inherit"
          className={`${controlClass} cursor-wait`}
        ></ThreeDotsIcon>
      </div>
    </div>
  );
};

export default ProjectItem;
