import { generateId } from "@/utils/otherFs";
import { Id, ListType } from "../modules/types";
import { useEffect } from "react";
import { initialLists } from "@/api/board/mock.data";

export function useListFuncs(
  setLists: any,
  lists: any,
  setLoadingFetchLists: any
) {
  // get lists from localStorage
  useEffect(() => {
    async function fetchListsFromLocalStorage() {
      setLoadingFetchLists(true);
      let list = null;
      try {
        const stored = localStorage.getItem("lists");
        if (stored) list = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
        setLoadingFetchLists(false);
      }
      if (list !== null && list.length > 0) {
        setLists(list);
      }
      if (list === null) setLists(initialLists);
      setLoadingFetchLists(false);
    }
    fetchListsFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // save lists to localStorage after update list
  useEffect(() => {
    if (lists.length <= 0) return;
    localStorage.setItem("lists", JSON.stringify(lists));
  }, [lists]);
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
