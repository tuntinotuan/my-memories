export function getTextWidth(
  text: string,
  font: string = "16px Arial"
): number {
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    throw new Error("Failed to get canvas context");
  }

  context.font = font;
  return context.measureText(text).width;
}
