import React from "react";
import SearchIcon from "../icons/SearchIcon";

const SearchMenuHeader = () => {
  return (
    <label
      htmlFor="searchInputId"
      className={`flex items-center gap-2 border border-gray-200 rounded-lg px-2 py-1 text-sm hover:border-gray-500 transition-all cursor-text w-[350px]`}
    >
      <SearchIcon
        fontSize="medium"
        className="text-gray-500 hover:border-gray-500"
      ></SearchIcon>
      <input
        type="search"
        id="searchInputId"
        placeholder="Search your content and Canvas's"
        className="w-full placeholder:font-light placeholder:text-gray-500"
      ></input>
    </label>
  );
};

export default SearchMenuHeader;
