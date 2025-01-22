export type ColorCode = {
  from: string;
  to: string;
  url?: null;
  alt?: null;
};

export type UrlCode = {
  url: string;
  alt: string;
  from?: null;
  to?: null;
};

export type ProjectImgOrGradientProps = { values: ColorCode | UrlCode };
