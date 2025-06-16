export const TypingItem = ({ data }: any) => {
  return (
    <div className="flex flex-col items-center border border-gray-200 border-dotted py-1 px-2 rounded">
      <p className="text-typingTextNormal">{data.word}</p>
      <p className="text-[9px] text-typingTextHover">{data.meaning}</p>
    </div>
  );
};
