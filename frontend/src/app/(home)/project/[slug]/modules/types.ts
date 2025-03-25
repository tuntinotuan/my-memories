export type Id = string | number;

export type ListType = {
  id: Id;
  title: string;
};

export type Task = {
  id: Id;
  listId: Id;
  content: string;
};
