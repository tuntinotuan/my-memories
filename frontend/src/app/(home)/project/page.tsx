"use client";
import { useRef, useState } from "react";
import TodayDesignBanner from "./modules/TodayDesignBanner";

export default function ProjectPage() {
  return (
    <div className="w-full">
      <TodayDesignBanner></TodayDesignBanner>
      <p>Project page</p>
    </div>
  );
}
