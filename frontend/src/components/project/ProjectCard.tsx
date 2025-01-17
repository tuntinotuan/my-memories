import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";
type ProjectCardProps = {
  img: string;
  title: string;
};
const ProjectCard = ({ img, title }: ProjectCardProps) => {
  let controlClass =
    "flex items-center justify-center bg-primaryHover transition-all hover:bg-gray-300 px-2 py-2 rounded-md";
  return (
    <Link
      href={`/project/${title}`}
      className="relative w-full group flex items-center gap-2 truncate hover:bg-primaryHover p-2 rounded-md cursor-pointer shrink-0"
    >
      <img src={img} className="w-6 h-6 rounded-md shrink-0 object-cover" />
      <p className="text-sm text-primaryText truncate text-ellipsis overflow-hidden w-full group-hover:w-3/5">
        {title}
      </p>
      <div className="absolute right-1 flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100">
        <div className={controlClass}>
          <OpenInNewIcon fontSize="inherit"></OpenInNewIcon>
        </div>
        <div className={controlClass}>
          <MoreHorizIcon fontSize="inherit"></MoreHorizIcon>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
