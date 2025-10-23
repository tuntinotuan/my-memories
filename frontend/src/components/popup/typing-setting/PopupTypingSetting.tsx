import PopupOverlay from "@/components/overlay/popup.overlay";
import { TopControl } from "../components/TopControl";
import TextAppearance from "@/app/(home)/typing/modules/components/setting/TextAppearance";
import { useTyping } from "@/contexts/TypingStates";
import { useTypingTheme } from "@/contexts/typingThemeStates";

type PopupTypingSettingProps = {
  show: boolean;
  onClose: () => void;
};

const PopupTypingSetting = ({ show, onClose }: PopupTypingSettingProps) => {
  const { fontFamily } = useTyping();
  const { effectHoveredTheme } = useTypingTheme();
  return (
    <PopupOverlay
      show={show}
      selector="myportal"
      width={700}
      onClick={onClose}
      scaleAnimate={false}
      className={`${fontFamily?.code} ${effectHoveredTheme} bg-typingBg text-typingTextCorrect max-h-[600px] !min-w-max`}
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
