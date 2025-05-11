export function shuffleArray(arr: any[], type: "short" | "long") {
  const copy = [...arr];

  if (type === "short") return copy.sort(() => Math.random() - 0.5);

  if (type === "long")
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
  return copy;
}
