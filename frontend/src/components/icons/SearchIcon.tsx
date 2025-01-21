import React from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

const SearchIcon = ({ ...rest }) => {
  return (
    <SearchRoundedIcon
      fontSize="inherit"
      className="opacity-0 group-hover:opacity-100"
      {...rest}
    />
  );
};

export default SearchIcon;
