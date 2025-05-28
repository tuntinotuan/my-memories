import { useOnClickOutside } from "usehooks-ts";
import { useRef } from "react";
import PortalOverlay from "../../overlay/portal.overlay";
import { SettingChangeThemePage } from "./pages/SettingChangeThemePage";
import SettingRootPage from "./pages/SettingRootPage";

type PopupDotsSettingProps = {
  show: boolean;
  onClose: () => void;
  rect?: DOMRect;
  children: React.ReactNode;
};

export const PopupDotsSetting = ({
  show,
  onClose,
  rect,
  children,
}: PopupDotsSettingProps) => {
  const ref = useRef<HTMLDivElement | null>(null);
  useOnClickOutside(ref, onClose);

  return show ? (
    <PortalOverlay>
      <div
        ref={ref}
        className={`fixed w-[300px] h-auto bg-white shadow-popup-rect rounded-xl z-50 border border-gray-200 overflow-hidden`}
        style={
          rect
            ? {
                top: rect.top + window.scrollY + rect.height / 2,
                left: rect.right + window.scrollX,
                transform: "translate(0, -50%)",
              }
            : {}
        }
      >
        {children}
      </div>
    </PortalOverlay>
  ) : (
    <></>
  );
};
