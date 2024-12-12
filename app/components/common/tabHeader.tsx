"use client";
import React, { useState, useEffect } from "react";
import { Tab, TabList } from "@headlessui/react";

interface TabHeaderProps {
  leagueName: string;
}

export default function TabHeader({ leagueName }: TabHeaderProps) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const shrinkFactor = Math.min(scrollY / 200, 1.625);
  const opacityFactor = Math.max(1 - scrollY / 250, 0);
  return (
    <div className="sticky top-0 md:top-[1.5rem] w-full md:w-auto md:px-1 px-1 pb-1 md:py-1 mt-[-2px] bg-black/5 dark:bg-black/20 rounded-b-lg md:rounded-lg shadow-custom-light-header-bottom md:shadow-custom-light-header backdrop-blur-2xl flex-col justify-start items-center gap-8 md:gap-0 inline-flex">
      <div
        className="text-center dark:text-dark-90 text-light-90 font-semibold leading-normal transition-all"
        style={{
          fontSize: `${1.625 - shrinkFactor}rem`, // Shrink the font size
          opacity: opacityFactor,
          transition: "opacity 0.4s ease-out",
          lineHeight: `${1.625 - shrinkFactor}rem`, // Shrink the font size
          height: `${1.625 - shrinkFactor}rem`, // Shrink the font size
          margin: `${1.625 - shrinkFactor}rem`,
        }}
      >
        {leagueName}
      </div>
      <TabList className="w-full items-center justify-center gap-2 md:gap-2 inline-flex h-[41px] mx-8">
        <Tab className="flex-grow md:h-[2.5rem] px-4 py-3.5 data-[selected]:bg-white data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay rounded justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
            MY scoring
          </div>
        </Tab>
        <Tab className="flex-grow md:h-[2.5rem] px-4 py-3.5 data-[selected]:bg-white data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay rounded justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
            Matchup
          </div>
        </Tab>
        <Tab className="flex-grow md:h-[2.5rem] px-4 py-3.5 data-[selected]:bg-white data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay rounded justify-center items-center gap-2.5 inline-flex">
          <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
            League Scoring
          </div>
        </Tab>
      </TabList>
    </div>
  );
}
