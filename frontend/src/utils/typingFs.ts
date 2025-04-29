import { WordAmountType } from "@/app/(home)/typing/modules/types";

type TypingTimeType = 15 | 30 | 60 | 120;

export function typingCaculateResultWithWordAmount(
  timeInSeconds: number,
  wordAmount: WordAmountType,
  quantityCorrect: number,
  quantityWrong: number
) {
  let wpm = 0;
  let acc = 0;
  let totalTypedChars = quantityCorrect + quantityWrong;
  let wordIsTyped = quantityCorrect / 5;

  wpm = Math.round((wordIsTyped / timeInSeconds) * 60);

  acc = (100 / totalTypedChars) * quantityCorrect;

  return { wpm, acc, quantityCorrect, quantityWrong };
}
export function typingCaculateResultWithWordTime(
  timeInSeconds: TypingTimeType,
  quantityCorrect: number,
  quantityWrong: number
) {
  let wpm = 0;
  let acc = 0;
  let totalTypedChars = quantityCorrect + quantityWrong;
  let newWordIsTyped = quantityCorrect / 5;

  wpm = Math.round((newWordIsTyped / timeInSeconds) * 60);
  acc = (100 / totalTypedChars) * quantityCorrect;

  return { wpm, acc, quantityCorrect, quantityWrong };
}
