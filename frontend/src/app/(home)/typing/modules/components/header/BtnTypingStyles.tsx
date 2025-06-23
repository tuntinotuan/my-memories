import { typingStylesType, useTyping } from "@/contexts/TypingStates";
import { Tooltip } from "@nextui-org/tooltip";

type BtnTypingStylesProps = {
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick: () => void;
  style: typingStylesType;
  tooltipText?: string;
  className?: string;
};

export const BtnTypingStyles = ({
  icon,
  children,
  onClick,
  className,
  tooltipText,
  style,
}: BtnTypingStylesProps) => {
  const { typingStyles } = useTyping();
  const Main = () => {
    return (
      <div
        className={`flex items-center gap-1 transition-all cursor-default ${
          typingStyles === style
            ? "text-typingColorActive"
            : "hover:text-typingTextHover cursor-pointer"
        } ${className}`}
        onClick={onClick}
      >
        {icon}
        {children}
      </div>
    );
  };
  if (tooltipText)
    return (
      <Tooltip
        showArrow
        content={tooltipText}
        placement="bottom"
        radius="sm"
        delay={500}
        closeDelay={200}
        className="!px-2 !py-[2px]"
        shadow="sm"
      >
        <div>
          <Main />
        </div>
      </Tooltip>
    );
  return <Main />;
};
