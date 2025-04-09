export type Id = string | number;

export type ListType = {
  id: Id;
  title: string;
  boardId: Id;
};

export type Task = {
  id: Id;
  listId: Id;
  content: string;
};
