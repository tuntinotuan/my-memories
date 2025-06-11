import React from "react";

const ListContainer = ({
  children,
  ...rest
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="child flex flex-col shrink-0 w-[266px] gap-2" {...rest}>
      {children}
    </div>
  );
};

export default ListContainer;
