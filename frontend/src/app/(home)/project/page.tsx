"use client";
import OriginalBanner from "@/components/banner/OriginalBanner";

export default function ProjectPage() {
  return (
    <div className="w-full px-6 pb-24">
      <OriginalBanner
        src="/banner-project.jpg"
        title="Projects"
        positionTitle="bLeft"
      ></OriginalBanner>
      <p>Project page</p>
    </div>
  );
}
