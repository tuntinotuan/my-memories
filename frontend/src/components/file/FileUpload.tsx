import ErrorRoundedIcon from "@mui/icons-material/ErrorRounded";
import MyTooltip from "../tooltip/MyTooltip";
import Image from "next/image";

export default function FileUpload({
  handleFileChange,
  title,
}: {
  title: string;
  handleFileChange: any;
}) {
  return (
    <>
      <label
        htmlFor="inputUploadFile"
        className="flex items-center gap-1 w-fit cursor-pointer hover:bg-typingBgControlMenu transition-all p-2 rounded"
      >
        {title}
        <MyTooltip contents={<FormatFollowed></FormatFollowed>}>
          <ErrorRoundedIcon fontSize="small"></ErrorRoundedIcon>
        </MyTooltip>
      </label>
      <input
        id="inputUploadFile"
        type="file"
        accept=".txt, .xlsx, .xls"
        onChange={handleFileChange}
        className="hidden"
      />
    </>
  );
}

const FormatFollowed = () => {
  return (
    <div className="flex flex-col gap-1 text-xs">
      <p className="text-center">Format followed in the example below</p>
      <div className="flex gap-1">
        <div className="flex flex-col items-center">
          <Image
            src={"/notepad-format.png"}
            alt="notepad-format image"
            width={90}
            height={100}
          ></Image>
          <p>Notepad</p>
        </div>
        <div className="flex flex-col items-center">
          <Image
            src={"/excel-format.png"}
            alt="notepad-format image"
            width={170}
            height={150}
          ></Image>
          <p>Excel</p>
        </div>
      </div>
    </div>
  );
};
