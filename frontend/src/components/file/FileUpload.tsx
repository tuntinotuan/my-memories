export default function FileUpload({
  handleFileChange,
  title,
}: {
  title: string;
  handleFileChange: any;
}) {
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
        accept=".txt, .xlsx, .xls"
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
}
