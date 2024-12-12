"use client";
import React, { useState, useEffect } from "react";
import { Tab, TabList } from "@headlessui/react";

export default function TabHeader() {
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

  // Calculate how much to shrink or fade out the league name based on scroll position
  const shrinkFactor = Math.min(scrollY / 200, 1); // Adjust 200 to control when it starts shrinking
  const opacityFactor = Math.max(1 - scrollY / 200, 0); // Adjust 400 to control when it disappears

  // Set the display to none when the opacity is 0
  const displayStyle = opacityFactor === 0 ? "none" : "flex";

  return (
    <div className="sticky top-0 md:top-[1.5rem] w-full md:w-auto md:px-1 px-1 pb-1 md:py-1 mt-[-2px] bg-black/5 dark:bg-black/20 rounded-b-lg md:rounded-lg shadow-custom-light-header-bottom md:shadow-custom-light-header backdrop-blur-2xl flex-col justify-start items-center gap-8 inline-flex">
      <div
        className="text-center dark:text-dark-90 text-light-90 font-semibold leading-normal transition-all pt-8"
        style={{
          fontSize: `${1.625 - shrinkFactor * 1}rem`, // Shrink the font size
          display: displayStyle,
          opacity: opacityFactor,
          transition: "opacity 0.3s ease-out",
        }}
      >
        Hawcey Gang
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
