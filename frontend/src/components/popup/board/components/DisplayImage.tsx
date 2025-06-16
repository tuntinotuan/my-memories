import { LinearOrUrl } from "@/components/project/types";
import Image from "next/image";

export const DisplayImage = ({
  currentGradient,
}: {
  currentGradient: LinearOrUrl;
}) => {
  return (
    <div
      className={`flex items-center justify-center w-5/6 h-[200px] rounded mx-auto p-4 bg-gradient-to-br bg-cover`}
      style={
        currentGradient?.type === "imageUrl"
          ? { backgroundImage: `url(${currentGradient.url})` }
          : currentGradient?.type === "linearGradient"
          ? {
              backgroundImage: `linear-gradient(to bottom right, ${currentGradient.from}, ${currentGradient.to})`,
            }
          : { background: currentGradient.code }
      }
    >
      <Image
        src={`/14cda5dc635d1f13bc48.svg`}
        alt="at layout"
        width={2000}
        height={200}
        unoptimized
      ></Image>
    </div>
  );
};
