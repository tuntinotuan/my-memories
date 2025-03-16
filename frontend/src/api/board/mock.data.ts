import { LinearOrUrl } from "@/components/project/types";

export const projectList: { img: LinearOrUrl; title: string }[] = [
  {
    img: {
      type: "imageUrl",
      url: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      alt: "anything",
    },
    title: "Online course presentation",
  },
  {
    img: {
      type: "imageUrl",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      alt: "anything",
    },
    title: "Green and Yellow Playful Illustrative Finance Presentation ",
  },
  {
    img: { type: "linearGradient", from: "#7731d8", to: "#01C4CD" },
    title: "Learn basic typescript only 2 hours",
  },
  {
    img: { type: "linearGradient", from: "#09326c", to: "#c7509b" },
    title: "My tasks never forget",
  },
];
