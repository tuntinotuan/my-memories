import { cards } from "@/api/card/card.data.structure";
import { shuffleArray } from "@/api/card/utils/f";
import CardAnswer from "@/components/card/CardAnswer";
import CardKeyword from "@/components/card/CardKeyword";

export default async function CardPage() {
  return (
    <div className="flex flex-col gap-2 px-4">
      <div className="flex flex-wrap gap-4 w-full">
        {shuffleArray(cards, "long")?.map((item, index) =>
          item.type === "cardKey" ? (
            <CardKeyword
              key={index}
              name={item.name}
              pronounce={item.pronounce}
            ></CardKeyword>
          ) : (
            <CardAnswer key={index} name={item.name}></CardAnswer>
          )
        )}
      </div>
    </div>
  );
}
