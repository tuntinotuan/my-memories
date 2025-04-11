import CardAnswer from "@/components/card/CardAnswer";
import CardKeyword from "@/components/card/CardKeyword";
import Image from "next/image";

export default async function CardPage() {
  return (
    <div className="flex flex-col gap-2 px-4">
      Card page
      <div className="grid grid-cols-6 gap-4 w-full">
        {Array(9)
          .fill(null)
          .map((item, index) => (
            <CardKeyword key={index}></CardKeyword>
          ))}
        <CardAnswer></CardAnswer>
      </div>
    </div>
  );
}
