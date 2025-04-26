import { WordAmountType } from "@/app/(home)/typing/modules/types";

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
