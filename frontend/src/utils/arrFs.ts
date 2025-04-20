export function creationNewArrWithQuantityBigger(
  currentArr: any,
  wordAmount: number
) {
  return Array.from({ length: wordAmount }, () => {
    const randomIndex = Math.floor(Math.random() * currentArr.length);
    return currentArr[randomIndex];
  });
}
