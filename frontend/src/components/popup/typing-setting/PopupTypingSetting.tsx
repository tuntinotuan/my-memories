import PopupOverlay from "@/components/overlay/popup.overlay";
import { TopControl } from "../components/TopControl";
import TextAppearance from "@/app/(home)/typing/modules/components/setting/TextAppearance";
import { useTyping } from "@/contexts/TypingStates";

type PopupTypingSettingProps = {
  show: boolean;
  onClose: () => void;
};

const PopupTypingSetting = ({ show, onClose }: PopupTypingSettingProps) => {
  const { fontFamily } = useTyping();
  return (
    <PopupOverlay
      show={show}
      selector="myportal"
      width={700}
      onClick={onClose}
      scaleAnimate={false}
      className={`${fontFamily.code} bg-typingBg text-typingTextCorrect max-h-[600px]`}
    >
      <TopControl onClose={onClose} title="Typing setting" />
      <Body onClose={onClose} show={show} />
    </PopupOverlay>
  );
};

const Body = ({ onClose, show }: any) => {
  return (
    <>
      <TextAppearance show={show}></TextAppearance>
    </>
  );
};

export default PopupTypingSetting;
