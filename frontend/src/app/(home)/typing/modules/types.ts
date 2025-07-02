import { typingStylesType } from "@/contexts/TypingStates";

export type WordAmountType = 10 | 25 | 50 | 100;
export type WordTimeType = 15 | 30 | 60 | 120;

export type ListBtnTypes = {
  text: string;
  icon: React.ReactNode;
  style: typingStylesType;
  onClick: () => void;
  tooltipText?: string;
}[];
export type TypeOfTypingManyWordProps = "time" | "words";

export type CursorStyles = "line" | "underline" | "box" | "block";
