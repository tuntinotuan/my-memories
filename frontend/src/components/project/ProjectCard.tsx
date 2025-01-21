import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { usePathname } from "next/navigation";
type ProjectCardProps = {
  img: string;
  title: string;
};
const ProjectCard = ({ img, title }: ProjectCardProps) => {
  let controlClass =
    "flex items-center justify-center bg-primaryHover transition-all hover:bg-gray-300 px-2 py-2 rounded-md";
  const pathName = usePathname();
  return (
    <div
      className={`relative w-full group flex items-center gap-2 truncate hover:bg-primaryHover p-2 rounded-md cursor-pointer shrink-0`}
    >
      <Link href={`/project/${title}`} className="absolute inset-0"></Link>
      <img src={img} className="w-6 h-6 rounded-md shrink-0 object-cover" />
      <p className="text-sm text-primaryText truncate text-ellipsis overflow-hidden w-full group-hover:w-3/5">
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
            href={`/project/${title}`}
            rel="noopener noreferrer"
            target="_blank"
            className={controlClass}
          >
            <OpenInNewIcon fontSize="inherit"></OpenInNewIcon>{" "}
          </Link>
        </Tooltip>
        <div className={controlClass}>
          <MoreHorizIcon fontSize="inherit"></MoreHorizIcon>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
