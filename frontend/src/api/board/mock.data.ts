import { Id, ListType, Task } from "@/app/(home)/project/[slug]/modules/types";
import { LinearOrUrl } from "@/components/project/types";

export const projectList: { id: Id; img: LinearOrUrl; title: string }[] = [
  {
    id: 999,
    img: { type: "linearGradient", from: "#7731d8", to: "#01C4CD" },
    title: "Learn basic typescript only 2 hours",
  },
  {
    id: 999,
    img: {
      type: "imageUrl",
      url: "/moment.png",
      alt: "anything",
    },
    title: "Beautiful mountain in the world",
  },
  {
    id: 999,
    img: {
      type: "imageUrl",
      url: "/imtung.png",
      alt: "anything",
    },
    title: "Prepare for presentation",
  },
  {
    id: 999,
    img: { type: "linearGradient", from: "#09326c", to: "#c7509b" },
    title: "My tasks never forget",
  },
  {
    id: 999,
    img: {
      type: "imageUrl",
      url: "/pinksky.jpg",
      alt: "anything",
    },
    title: "My memories is longer than my life",
  },
  {
    id: 999,
    img: {
      type: "imageUrl",
      url: "/purple.png",
      alt: "anything",
    },
    title: "I'm Tuan currently a frontend developer",
  },
  {
    id: 999,
    img: { type: "linearGradient", from: "#0c66e3", to: "#09336f" },
    title: "My tasks never forget old",
  },
  {
    id: 999,
    img: {
      type: "imageUrl",
      url: "/sunset.png",
      alt: "anything",
    },
    title: "Before I never love sunset now maybe",
  },
  {
    id: 999,
    img: {
      type: "imageUrl",
      url: "https://cdn.prod.website-files.com/62c67bbf65af22785775fee3/66f6ace0028aed08e2ce0d46_Software%20Design%20DocumentationTemplate.png",
      alt: "anything",
    },
    title: "Online course presentation",
  },
  {
    id: 999,
    img: {
      type: "imageUrl",
      url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM0xlqNtKvvqUSlyfDKQQJmzQHDWPEedSV1g&s",
      alt: "anything",
    },
    title: "Green and Yellow Playful Illustrative Finance Presentation ",
  },
];

export const initialLists: ListType[] = [
  { id: 1, title: "Todo", boardId: 999 },
  { id: 2, title: "Done", boardId: 999 },
];
export const initialTasks: Task[] = [
  { id: 33, listId: 1, content: "Learn Reactjs" },
  { id: 22, listId: 1, content: "Exercise" },
  { id: 25, listId: 1, content: "Go to supermarket" },
  { id: 24, listId: 2, content: "Play game" },
  { id: 26, listId: 2, content: "Go out with my friend" },
  { id: 27, listId: 2, content: "Reading 'Don't make me think'" },
];
