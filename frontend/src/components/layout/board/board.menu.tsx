import Button from "@/components/button/Button";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";
import { useLayoutStates } from "@/contexts/layoutStates";
import { Tooltip } from "@nextui-org/tooltip";
import { usePathname } from "next/navigation";

const BoardMenu = () => {
  const pathname = usePathname();
  const { showMenuboard, handleShowMenuboard } = useLayoutStates();
  return (
    <div className="flex items-center justify-between bg-black bg-opacity-20 p-2">
      <Button className="hover:bg-opacity-20 !rounded">
        {pathname.slice(-12)}
      </Button>
      {!showMenuboard && (
        <Tooltip
          showArrow
          content="Open board settings"
          placement="bottom-end"
          radius="sm"
          delay={200}
          closeDelay={200}
          className="!px-2 !py-[2px]"
          shadow="sm"
        >
          <div>
            <Button
              className="w-8 h-8 hover:bg-opacity-20 !rounded !p-0"
              onClick={handleShowMenuboard}
            >
              <ThreeDotsIcon fontSize="medium" />
            </Button>
          </div>
        </Tooltip>
      )}
    </div>
  );
};

export default BoardMenu;
