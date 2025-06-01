import React, { useState } from "react";
import Button from "./Button";
import ArrowDownIcon from "../icons/arrow/ArrowDownIcon";
import ArrowRightIcon from "../icons/arrow/ArrowRightIcon";

type ButtonShowAndHiddenDataProps = {
  list: any[];
  title: string;
  children: React.ReactNode;
};

const ButtonShowAndHiddenData = ({
  list,
  title,
  children,
}: ButtonShowAndHiddenDataProps) => {
  const [show, setShow] = useState(true);
  return (
    list.length > 0 && (
      <div className="mb-8">
        <Button
          className="group text-xs !gap-1 !py-[6px] !px-2 !rounded-[4px] mb-[14px] text-primaryText"
          hover="hover:bg-primaryHover"
          onClick={() => setShow((pre) => !pre)}
        >
          <p>{title}</p>
          {show ? <ArrowDownIcon /> : <ArrowRightIcon />}
        </Button>
        {show && list.length > 0 && (
          <>
            {children}
            {list.length > 4 && (
              <Button
                className="w-full hover:bg-primaryHover text-primaryColor"
                disable
              >
                See all
              </Button>
            )}
          </>
        )}
      </div>
    )
  );
};

export default ButtonShowAndHiddenData;
