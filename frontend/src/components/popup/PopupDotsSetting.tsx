import { useOnClickOutside } from "usehooks-ts";
import DeleteIcon from "../icons/DeleteIcon";
import { useRef } from "react";
import PortalOverlay from "./portal.overlay";

export const PopupDotsSetting = ({
  onClickDelete,
  pickedItem,
  show,
  onClose,
}: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, onClose);
  return show ? (
    <PortalOverlay>
      <div
        ref={ref}
        className={`fixed w-[300px] h-auto bg-white shadow-popup-rect rounded-xl z-50 border border-gray-200 overflow-hidden`}
        style={{
          top:
            pickedItem.rect.top + window.scrollY + pickedItem.rect.height / 2,
          left: pickedItem.rect.right + window.scrollX,
          transform: "translate(0, -50%)",
        }}
      >
        <div className="flex flex-col border border-transparent border-b-gray-200 p-3">
          <p className="font-bold text-lg">{pickedItem.title}</p>
        </div>
        <div
          className="flex items-center gap-2 w-full text-primaryText hover:bg-gray-100 px-3 py-2 transition-all cursor-pointer"
          onClick={() => {
            onClickDelete(pickedItem.id);
            onClose();
          }}
        >
          <DeleteIcon></DeleteIcon>
          Delete
        </div>
      </div>
    </PortalOverlay>
  ) : (
    <></>
  );
};
