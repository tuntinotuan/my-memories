"use client";
import { usePathname } from "next/navigation";

function generateStaticParams() {}
type ColorCode = { from: string; to: string; url?: string };
type UrlCode = { from?: string; to?: string; url: string; alt: string };
type GradientTypes = ColorCode | UrlCode;
export default function Page() {
  const pathname = usePathname();
  let defaultGradient: GradientTypes = { url: "/moment.png", alt: "moment" };
  // let defaultGradient: GradientTypes = { from: "#6f5dc6", to: "#e374bc" };
  return (
    <div
      className={`w-full h-full px-3 pt-3 text-white bg-gradient-to-br from-[${defaultGradient.from}] to-[${defaultGradient.to}] bg-no-repeat bg-cover`}
      style={
        !defaultGradient.from
          ? { backgroundImage: `url(${defaultGradient.url})` }
          : {
              backgroundImage: `linear-gradient(to bottom right, #${defaultGradient.from}, #${defaultGradient.to})`,
            }
      }
    >
      Hello, Blog Post Page! - {pathname}
    </div>
  );
}
