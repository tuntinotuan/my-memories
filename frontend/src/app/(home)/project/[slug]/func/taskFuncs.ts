import { generateId } from "@/utils/otherFs";
import { Id } from "../modules/types";

export function taskFuncs(setTasks: any, tasks: any) {
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
