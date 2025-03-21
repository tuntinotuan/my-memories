export type Id = string | number;

export type Board = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  boardId: Id;
  content: string;
};
