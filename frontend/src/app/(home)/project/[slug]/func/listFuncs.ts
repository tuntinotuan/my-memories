import { generateId } from "@/utils/otherFs";
import { Id, ListType } from "../modules/types";

export function listFuncs(setLists: any, lists: any) {
  function createNewList(boardId: Id, title: string) {
    const listToAdd: ListType = {
      id: generateId(),
      title: title,
      boardId: boardId,
    };
    setLists([...lists, listToAdd]);
  }
  function updateList(id: Id, title: string) {
    const newLists = lists.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, title };
    });
    setLists(newLists);
  }
  function handleDeleteList(id: Id) {
    let newList = lists.filter((lists: any) => lists.id !== id);
    setLists(newList);
  }
  return { createNewList, updateList, handleDeleteList };
}
