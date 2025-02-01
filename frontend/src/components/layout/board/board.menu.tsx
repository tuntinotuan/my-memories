import Button from "@/components/button/Button";
import ThreeDotsIcon from "@/components/icons/ThreeDotsIcon";
import { useCreateBoardStates } from "@/contexts/createBoardStates";
import { useLayoutStates } from "@/contexts/layoutStates";
import { Tooltip } from "@nextui-org/tooltip";
import { usePathname } from "next/navigation";
import { useRef } from "react";

const BoardMenu = () => {
  const pathname = usePathname();
  const { showMenuboard, handleShowMenuboard } = useLayoutStates();
  const { boardName, handleSetBoardName } = useCreateBoardStates();
  const ref = useRef<HTMLInputElement>(null!);
  return (
    <div className="flex items-center justify-between bg-black bg-opacity-20 p-2">
      <input
        type={boardName ? "text" : "button"}
        defaultValue={pathname}
        className={`w-[${
          pathname.length
        }] p-2 rounded border-2 border-transparent focus:border-2 focus:border-secondaryColor focus:bg-white focus:text-primaryText ${
          boardName ? "" : ""
        }`}
        ref={ref}
        onClick={async () => {
          handleSetBoardName(true);
          if (boardName) {
            ref.current.focus();
            ref.current.select();
          }
        }}
      />
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
