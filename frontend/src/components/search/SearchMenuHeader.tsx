import React from "react";
import SearchIcon from "../icons/SearchIcon";

const SearchMenuHeader = ({
  disable,
  placeholder,
  width,
  className,
}: {
  disable?: boolean;
  placeholder: string;
  width: number | string;
  className?: string;
}) => {
  return (
    <label
      htmlFor="searchInputId"
      className={`flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 text-sm hover:border-gray-500 transition-all cursor-text w-[350px] ${
        disable ? "cursor-wait" : ""
      } ${className}`}
      style={{ width: width }}
    >
      <SearchIcon
        fontSize="medium"
        className="text-gray-500 hover:border-gray-500"
      ></SearchIcon>
      <input
        type="search"
        id="searchInputId"
        placeholder={placeholder}
        className={`w-full placeholder:font-light placeholder:text-gray-500 ${
          disable ? "cursor-wait" : ""
        }`}
      ></input>
    </label>
  );
};

export default SearchMenuHeader;
