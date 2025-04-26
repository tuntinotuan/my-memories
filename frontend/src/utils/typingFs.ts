import { WordAmountType } from "@/app/(home)/typing/modules/types";

type TypingTimeType = 15 | 30 | 60 | 120;

export function typingCaculateResultWithWordAmount(
  timeInSeconds: number,
  wordAmount: WordAmountType,
  quantityCorrect: number,
  quantityWrong: number
) {
  if (!wordAmount) return 0;
  if (timeInSeconds === 0) return 0;

  let wpm = 0;
  let acc = 0;

  wpm = Math.round((wordAmount / timeInSeconds) * 60);
  acc = (100 / (quantityCorrect + quantityWrong)) * quantityCorrect;

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
  let newWordIsTyped =
    Math.round((quantityCorrect / totalTypedChars) * 100) / 5;

  wpm = Math.round((newWordIsTyped / timeInSeconds) * 60);
  acc = (100 / totalTypedChars) * quantityCorrect;

  return { wpm, acc, quantityCorrect, quantityWrong };
}
