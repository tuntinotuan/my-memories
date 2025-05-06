import { useState } from "react";

export default function FileUpload({
  handleFileChange,
}: {
  handleFileChange: any;
}) {
  const [text, setText] = useState("");
  console.log("texttttt", text);

  return (
    <div>
      <input type="file" accept=".txt" onChange={handleFileChange} />
      <pre>{text}</pre>
    </div>
  );
}
