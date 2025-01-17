type backgroundType = { from: string; to: string } | string;

type BoardType = {
  title: string;
  backgroundColor: backgroundType;
  col: {}[];
  createTime: string;
  updateTime: string;
};

export const board: BoardType = {
  title: "my task",
  backgroundColor: { from: "#7731d8", to: "#01C4CD" },
  col: [
    {
      id: 1,
      reorder: 1,
      title: "START",
      content: [
        { id: 1, reorder: 1, title: "Learn ReactJS", type: "text" },
        { id: 2, reorder: 2, title: "Learn ReactJS", type: "video" },
      ],
    },
    {
      id: 1,
      reorder: 2,
      title: "TODO",
    },
    {
      id: 1,
      reorder: 3,
      title: "DONE",
    },
  ],
  createTime: "1-1-2025",
  updateTime: "1-1-2025",
};
