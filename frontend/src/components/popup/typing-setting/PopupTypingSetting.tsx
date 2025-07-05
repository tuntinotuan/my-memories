import PopupOverlay from "@/components/overlay/popup.overlay";
import { TopControl } from "../components/TopControl";
import TextAppearance from "@/app/(home)/typing/modules/components/setting/TextAppearance";

type PopupTypingSettingProps = {
  show: boolean;
  onClose: () => void;
};

const PopupTypingSetting = ({ show, onClose }: PopupTypingSettingProps) => {
  return (
    <PopupOverlay show={show} selector="myportal" width={700} onClick={onClose}>
      <TopControl onClose={onClose} title="Typing setting" />
      <Body onClose={onClose} />
    </PopupOverlay>
  );
};

const Body = ({ onClose }: any) => {
  return (
    <div className="w-full">
      <TextAppearance></TextAppearance>
    </div>
  );
};

export default PopupTypingSetting;
