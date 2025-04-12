type MathKey = number;
type Name = string;
export type CardKeyType = {
  type: "cardKey";
  img?: string;
  name: Name;
  pronounce: string;
  matchKey: MathKey;
};
export type CardAnswerType = {
  type: "cardAnswer";
  name: Name;
  matchKey: MathKey;
};
export type CardType = CardKeyType | CardAnswerType;
