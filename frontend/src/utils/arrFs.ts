import { typingWordsTypes } from "@/api/typing/typing.type";

export function creationNewArrWithQuantityBigger(
  currentArr: any,
  wordAmount: number
) {
  return Array.from({ length: wordAmount }, () => {
    const randomIndex = Math.floor(Math.random() * currentArr.length);
    return currentArr[randomIndex];
  });
}

export function getAllKey(arr: typingWordsTypes[]) {
  let result = 0;
  arr.map((item) => {
    result = result + item.word.length;
  });
  return result;
}
