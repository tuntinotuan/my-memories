export type typingWordsTypes = {
  word: string;
  meaning: string;
};

// Define branded type for [0,1)
export type FontSizeTypes = number & { readonly _brand: unique symbol };

export function makeFraction(value: number): FontSizeTypes {
  if (value < 0.5 || value > 4) {
    throw new Error("Value must be greater than 0.5 and less than 4");
  }
  return value as FontSizeTypes;
}
// Older
// export type FontSizeTypes = 0.5 | 1 | 2 | 3 | 4 | 5 | 10;
