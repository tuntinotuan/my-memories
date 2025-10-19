import { useTyping } from "@/contexts/TypingStates";
import { Tooltip } from "@nextui-org/tooltip";
import { typingStylesType } from "../../types";

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
          <MainLocal
            icon={icon}
            onClick={onClick}
            className={className}
            tooltipText={tooltipText}
            style={style}
          >
            {children}
          </MainLocal>
        </div>
      </Tooltip>
    );
  return (
    <MainLocal
      icon={icon}
      onClick={onClick}
      className={className}
      tooltipText={tooltipText}
      style={style}
    >
      {children}
    </MainLocal>
  );
};
const MainLocal = ({
  icon,
  children,
  onClick,
  className,
  style,
}: BtnTypingStylesProps) => {
  const { typingSettingLocal } = useTyping();
  return (
    <div
      className={`flex items-center gap-1 transition-all cursor-default ${
        typingSettingLocal?.typingStyles === style
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
