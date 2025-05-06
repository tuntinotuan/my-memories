import { useState } from "react";

export default function FileUpload({
  handleFileChange,
  title,
}: {
  title: string;
  handleFileChange: any;
}) {
  const [text, setText] = useState("");
  console.log("texttttt", text);

  return (
    <div>
      <label
        htmlFor="inputUploadFile"
        className="cursor-pointer hover:bg-typingBgControlMenu transition-all p-2 rounded"
      >
        {title}
      </label>
      <input
        id="inputUploadFile"
        type="file"
        accept=".txt"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
