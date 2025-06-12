import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export function handleDrag(
  setIsDragging: (val: boolean) => void,
  setActiveList: any,
  setActiveTask: any,
  setLists: any,
  lists: any,
  setTasks: any
) {
  function handleDragStart(event: DragStartEvent) {
    setIsDragging(true);
    if (event.active.data.current?.type === "List") {
      setActiveList(event.active.data.current.list);
      return;
    }
    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  }
  function handleDragEnd(event: DragEndEvent) {
    setIsDragging(false);
    setActiveList(null);
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeListId = active.id;
    const overListId = over.id;
    if (activeListId === overListId) return;

    setLists((board: any) => {
      const activeListIndex = board.findIndex(
        (item: any) => item.id === activeListId
      );
      const overListIndex = board.findIndex(
        (item: any) => item.id === overListId
      );
      return arrayMove(lists, activeListIndex, overListIndex);
    });
  }
  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;
    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    if (!isActiveTask) return;

    // I'm dropping a Task over another Task
    if (isActiveTask && isOverTask) {
      setTasks((tasks: any) => {
        const activeIndex = tasks.findIndex((t: any) => t.id === activeId);
        const overIndex = tasks.findIndex((t: any) => t.id === overId);
        tasks[activeIndex].listId = tasks[overIndex].listId;
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAList = over.data.current?.type === "List";

    // I'm dropping a Task over a column
    if (isActiveTask && isOverAList) {
      setTasks((tasks: any) => {
        const activeIndex = tasks.findIndex((t: any) => t.id === activeId);
        tasks[activeIndex].listId = overId;
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  }

  return { handleDragStart, handleDragEnd, handleDragOver };
}
