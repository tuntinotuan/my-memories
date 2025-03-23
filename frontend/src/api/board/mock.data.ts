import { ListType, Task } from "@/app/(home)/project/[slug]/modules/types";
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
    img: {
      type: "imageUrl",
      url: "/moment.png",
      alt: "anything",
    },
    title: "Beautiful mountain in the world",
  },
  {
    img: {
      type: "imageUrl",
      url: "/imtung.png",
      alt: "anything",
    },
    title: "Prepare for presentation",
  },
  {
    img: { type: "linearGradient", from: "#09326c", to: "#c7509b" },
    title: "My tasks never forget",
  },
  {
    img: {
      type: "imageUrl",
      url: "/pinksky.jpg",
      alt: "anything",
    },
    title: "My memories is longer than my life",
  },
  {
    img: {
      type: "imageUrl",
      url: "/purple.png",
      alt: "anything",
    },
    title: "I'm Tuan currently a frontend developer",
  },
  {
    img: { type: "linearGradient", from: "#0c66e3", to: "#09336f" },
    title: "My tasks never forget",
  },
  {
    img: {
      type: "imageUrl",
      url: "/sunset.png",
      alt: "anything",
    },
    title: "Before I never love sunset, now, maybe",
  },
];

export const initialLists: ListType[] = [
  { id: 1, title: "Todo" },
  { id: 2, title: "Done" },
];
export const initialTasks: Task[] = [
  { id: 33, boardId: 1, content: "Learn Reactjs" },
  { id: 22, boardId: 1, content: "Exercise" },
  { id: 25, boardId: 1, content: "Go to supermarket" },
  { id: 24, boardId: 2, content: "Play game" },
  { id: 26, boardId: 2, content: "Go out with my friend" },
  { id: 27, boardId: 2, content: "Reading 'Don't make me think'" },
];
