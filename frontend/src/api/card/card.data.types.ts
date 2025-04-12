type MathKey = number;
type Name = string;
export type CardKeyType = {
  img?: string;
  name: Name;
  pronounce: string;
  matchKey: MathKey;
};
export type CardAnswerType = {
  name: Name;
  matchKey: MathKey;
};
export type CardType = CardKeyType | CardAnswerType;
