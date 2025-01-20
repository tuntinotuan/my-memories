"use client";
import { useRef, useState } from "react";
import TodayDesignBanner from "./modules/TodayDesignBanner";

export default function ProjectPage() {
  return (
    <div className="w-full px-4">
      <TodayDesignBanner></TodayDesignBanner>
      <p>Project page</p>
    </div>
  );
}
