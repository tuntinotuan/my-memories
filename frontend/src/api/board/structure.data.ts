type BoardDataTypes = {
  id: number;
  title: string;
  background: {};
  archived: boolean;
  lists: {}[];
}[];
const boardDatas: BoardDataTypes = [
  {
    id: 1,
    title: "Daily",
    background: { url: "/local-images.png", alt: "moment" },
    archived: false,
    lists: [
      {
        id: 1,
        position: 0,
        title: "To do",
        archived: false,
        cards: [
          {
            id: 1,
            position: 0,
            text: "Learn english",
            archived: false,
          },
          {
            id: 2,
            position: 1,
            text: "Go to the supermarket",
            archived: false,
          },
        ],
      },
      {
        id: 2,
        position: 1,
        title: "Done",
        archived: false,
        cards: [
          {
            id: 1,
            position: 0,
            text: "Reading books",
            archived: false,
          },
          {
            id: 2,
            position: 1,
            text: "Do excercise",
            archived: false,
          },
        ],
      },
    ],
  },
];
