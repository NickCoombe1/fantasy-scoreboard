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
  const factor = 1.6;
  const shrinkFactor = Math.min(scrollY / 100, factor);
  const opacityFactor = Math.max(1 - scrollY / 250, 0);
  return (
    <div className="sticky top-0 md:z-[1000] md:top-[1.5rem] w-full md:w-auto md:px-1 px-1 pb-1 md:py-1 mt-[-2px] bg-black/5 dark:bg-black/20 rounded-b-lg md:rounded-lg shadow-custom-light-header-bottom md:shadow-custom-light-header backdrop-blur-2xl flex-col justify-start items-center inline-flex">
      <div
        className="text-center dark:text-dark-90 text-light-90 font-semibold leading-normal transition-all"
        style={{
          fontSize: `${factor - shrinkFactor}rem`,
          opacity: opacityFactor,
          transition:
            "opacity 0.3s ease, font-size 0.3s ease, line-height 0.3s ease, height 0.3s ease",
          lineHeight: `${factor - shrinkFactor}rem`,
          height: `${factor - shrinkFactor}rem`,
          margin: `${factor - shrinkFactor}rem`,
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
