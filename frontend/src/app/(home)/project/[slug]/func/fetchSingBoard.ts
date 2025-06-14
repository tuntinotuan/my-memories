import { cutIdFromSlug, replaceAllTrim } from "@/utils/otherFs";
import { useEffect } from "react";
import { projectList } from "@/api/board/mock.data";
import { useCreateBoardStates } from "@/contexts/createBoardStates";

export function useFetchSingleBoard(params: any) {
  const { boards, setSingleBoard } = useCreateBoardStates();
  const newBoard = boards.find(
    (item) => item.id === Number(cutIdFromSlug(params.slug, "-id"))
  );
  const exampleBoard = projectList.find(
    (item) => replaceAllTrim(item.title) === params.slug
  );
  useEffect(() => {
    if (newBoard) {
      setSingleBoard(newBoard);
    } else {
      exampleBoard && setSingleBoard(exampleBoard);
    }
  }, [newBoard, exampleBoard, setSingleBoard]);
}
