import ArrowLeftIcon from "@/components/icons/arrow/ArrowLeftIcon";
import CloseIcon from "@/components/icons/CloseIcon";

export const TopControl = ({ onClose, title = "Create board" }: any) => {
  return (
    <div className="flex items-center justify-between w-full text-sm font-bold pb-4">
      <ArrowLeftIcon
        fontSize="inherit"
        onClick={onClose}
        className="opacity-0"
      ></ArrowLeftIcon>
      {title}
      <CloseIcon fontSize="small" onClick={onClose}></CloseIcon>
    </div>
  );
};
