import Image from "next/image";
import Link from "next/link";
import Button from "../button/Button";
import HeaderLogo from "../logo/header.logo";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";

const CreateHeader = () => {
  return (
    <section className="sticky top-0 flex items-center justify-between bg-white p-3">
      <div className="flex items-center text-gray-500">
        <HeaderLogo></HeaderLogo>
        <KeyboardArrowRightOutlinedIcon fontSize="small"></KeyboardArrowRightOutlinedIcon>
        <p className="text-sm font-bold">Untitled</p>
      </div>
      <div className="flex gap-4">
        <Button>Sign up</Button>
        <Button>Preview</Button>
        <Button>Publish</Button>
      </div>
    </section>
  );
};
export default CreateHeader;
