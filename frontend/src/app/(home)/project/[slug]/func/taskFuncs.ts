import { generateId } from "@/utils/otherFs";
import { Id } from "../modules/types";
import { useEffect } from "react";
import { initialTasks } from "@/api/board/mock.data";

export function useTaskFuncs(setTasks: any, tasks: any) {
  // get tasks from localStorage
  useEffect(() => {
    async function fetchListsFromLocalStorage() {
      let task = null;
      try {
        const stored = localStorage.getItem("tasks");
        if (stored) task = await JSON.parse(stored);
      } catch (error) {
        console.error("Invalid JSON:", error);
      }
      if (task !== null && task.length > 0) {
        setTasks(task);
      }
      if (task === null) setTasks(initialTasks);
    }
    fetchListsFromLocalStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // save tasks to localStorage after update task
  useEffect(() => {
    if (tasks.length <= 0) return;
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  function createNewTask(listId: Id, content: string) {
    const newTask = {
      id: generateId(),
      listId: listId,
      content: content,
    };
    setTasks([...tasks, newTask]);
  }
  function updateTask(id: Id, content: string) {
    console.log("new taskssssss", id, content);
    const newTasks = tasks.map((item: any) => {
      if (item.id !== id) return item;
      return { ...item, content };
    });
    setTasks(newTasks);
  }
  function handleDeleteTask(id: Id) {
    let newTask = tasks.filter((task: any) => task.id !== id);
    setTasks(newTask);
  }
  return { createNewTask, updateTask, handleDeleteTask };
}
