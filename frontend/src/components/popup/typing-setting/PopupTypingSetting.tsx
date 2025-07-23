import PopupOverlay from "@/components/overlay/popup.overlay";
import { TopControl } from "../components/TopControl";
import TextAppearance from "@/app/(home)/typing/modules/components/setting/TextAppearance";

type PopupTypingSettingProps = {
  show: boolean;
  onClose: () => void;
};

const PopupTypingSetting = ({ show, onClose }: PopupTypingSettingProps) => {
  return (
    <PopupOverlay
      show={show}
      selector="myportal"
      width={700}
      onClick={onClose}
      scaleAnimate={false}
      className="bg-typingBg text-typingTextCorrect"
    >
      <TopControl onClose={onClose} title="Typing setting" />
      <Body onClose={onClose} />
    </PopupOverlay>
  );
};

const Body = ({ onClose }: any) => {
  return (
    <>
      <TextAppearance></TextAppearance>
    </>
  );
};

export default PopupTypingSetting;
