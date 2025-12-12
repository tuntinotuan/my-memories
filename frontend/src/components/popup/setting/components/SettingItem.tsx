import LinkNewTabOverlay from "@/components/overlay/link.newtab.overlay";

export const SettingItem = ({
  onClick,
  title,
  icon,
  href,
}: {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
  href?: string;
}) => {
  const Main = () => {
    return (
      <div
        className="flex items-center gap-2 w-full text-primaryText hover:bg-gray-100 dark:hover:bg-darkMode0A px-3 py-2 transition-all cursor-pointer"
        onClick={onClick}
      >
        {icon}
        {title}
      </div>
    );
  };
  if (href)
    return (
      <LinkNewTabOverlay href={href}>
        <Main></Main>
      </LinkNewTabOverlay>
    );
  return <Main></Main>;
};
