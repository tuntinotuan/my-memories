import React from "react";
import ButtonCreate from "../button/ButtonCreate";
import PlusIcon from "../icons/PlusIcon";
import { useCreateBoardStates } from "@/contexts/createBoardStates";

const ProjectHaveAny = () => {
  const { handleOpenAndClosePopupCreateboard } = useCreateBoardStates();
  return (
    <div className="w-full p-2 mx-auto flex flex-col items-center justify-center">
      <p>You do not have any projects yet!</p>
      <ButtonCreate
        className="w-[200px] my-2"
        styles="primary"
        onClick={handleOpenAndClosePopupCreateboard}
      >
        <PlusIcon />
        Create a project
      </ButtonCreate>
    </div>
  );
};

export default ProjectHaveAny;
