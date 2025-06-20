import { typingWordsTypes } from "@/api/typing/typing.type";
import FileUpload from "@/components/file/FileUpload";
import { useLayoutStates } from "@/contexts/layoutStates";
import * as XLSX from "xlsx";

export const OtherOptions = ({
  setTypingList,
  fileName,
  setFileName,
  setListName,
}: any) => {
  const { setResetAllInputRequired } = useLayoutStates();
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();

    const fileName = file.name.toLowerCase();
    setListName(fileName.replace(/\.[^/.]+$/, ""));
    const isTxt = fileName.endsWith(".txt");
    const isXlsx = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
    reader.onload = (event) => {
      const result: typingWordsTypes[] = [];
      if (isTxt) {
        const text = reader.result as string;
        const lines = text
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0); // remove blank lines
        for (let i = 0; i < lines.length; i += 2) {
          const word = lines[i];
          const meaning = lines[i + 1];
          if (word && meaning) {
            result.push({ word, meaning });
          }
        }
      }

      const arrayBuffer = event.target?.result as ArrayBuffer;
      // ✅ Use `type: "array"` to fix the ZIP compression method error
      const workbook = XLSX.read(arrayBuffer, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const rows: any[][] = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      if (isXlsx) {
        for (let i = 0; i < rows.length; i++) {
          const [word, meaning] = rows[i];
          if (word !== undefined && meaning !== undefined) {
            result.push({ word: String(word), meaning: String(meaning) });
          }
        }
      }

      setTypingList(result);
    };

    isTxt && reader.readAsText(file);
    isXlsx && reader.readAsArrayBuffer(file);
    setResetAllInputRequired(true);
  };
  return (
    <>
      <label htmlFor="">Other options:</label>
      <FileUpload
        title={fileName || "notepad, excel files"}
        handleFileChange={handleFileChange}
      ></FileUpload>
    </>
  );
};
