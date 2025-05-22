import { projectList } from "@/api/board/mock.data";
import Button from "@/components/button/Button";
import ArrowDownIcon from "@/components/icons/ArrowDownIcon";
import ArrowRightIcon from "@/components/icons/ArrowRightIcon";
import ProjectItem from "@/components/project/ProjectItem";
import { replaceAllTrim } from "@/utils/otherFs";
import React, { useState } from "react";

const HomeSidebarExampleDesign = () => {
  const [showExampleDesign, setShowExampleDesign] = useState(true);
  const handleExample = () => {
    setShowExampleDesign((pre) => !pre);
  };

  return (
    <>
      <Button
        className="group text-xs !gap-1 !py-[6px] !px-2 !rounded-[4px] mb-[14px] text-primaryText"
        hover="hover:bg-primaryHover"
        onClick={handleExample}
      >
        <p>Example designs</p>
        {showExampleDesign ? <ArrowDownIcon /> : <ArrowRightIcon />}
      </Button>
      {showExampleDesign && (
        <>
          <div className="flex flex-col items-center gap-1 ">
            {projectList.map((item, index) => (
              <ProjectItem
                key={index}
                img={item.img}
                title={item.title}
                href={`/project/${replaceAllTrim(item.title)}`}
              ></ProjectItem>
            ))}
          </div>
          {projectList.length <= 6 && (
            <Button
              className="w-full hover:bg-primaryHover text-primaryColor"
              disable
            >
              See all
            </Button>
          )}
        </>
      )}
    </>
  );
};

export default HomeSidebarExampleDesign;
