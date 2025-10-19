import { FontSizeTypes } from "@/api/typing/typing.type";

export type WordAmountType = 10 | 25 | 50 | 100;
export type WordTimeType = 15 | 30 | 60 | 120;

export type ListBtnTypes = {
  text: string;
  icon: React.ReactNode;
  style: typingStylesType;
  tooltipText?: string;
}[];

export type TypeOfTypingManyWordProps = "time" | "words";
export type typingStylesType = "time" | "combine" | "words";

export type CursorStyles = "line" | "underline" | "box" | "block";

export type CssPosition = "fixed" | "absolute";

export type SettingLocal = {
  cursorShape: CursorStyles;
  typingStyles: typingStylesType;
  wordAmount: WordAmountType;
  wordTime: WordTimeType;
  textIsLowercase: boolean;
  fontsize: FontSizeTypes;
  fontFamily: { name: string; code: string };
};
