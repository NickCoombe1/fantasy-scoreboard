import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import React from "react";
import ScoringPage from "@/app/components/scoring/page";

export default function HeaderTabs() {
  return (
    <TabGroup className={"w-full md:w-auto"}>
      <div className="w-full md:px-1 pt-8 md:pb-1 bg-transparent md:bg-black/5 md:dark:bg-black/20 rounded-lg md:shadow md:backdrop-blur-2xl flex-col justify-start items-center gap-8 inline-flex">
        <div className="text-center dark:text-dark-90 text-light-90 text-[1.625rem] font-semibold leading-normal">
          Hawcey Gang
        </div>
        <TabList className="w-full justify-evenly items-center gap-3.5 md:gap-2 inline-flex h-[41px]">
          <Tab className="md:h-3.5 px-4 py-3.5 data-[selected]:bg-white data-[selected]:bg-button-light-secondary data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay data-[selected]:bg-transparent rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
              scoring
            </div>
          </Tab>
          <Tab className="md:h-3.5 px-4 py-3.5 data-[selected]:bg-white data-[selected]:bg-button-light-secondary data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay data-[selected]:bg-transparent rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
              Matchup
            </div>
          </Tab>
          <Tab className="md:h-3.5 px-4 py-3.5 data-[selected]:bg-white data-[selected]:bg-button-light-secondary data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay data-[selected]:bg-transparent rounded justify-center items-center gap-2.5 inline-flex">
            <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
              League Scoring
            </div>
          </Tab>
        </TabList>{" "}
      </div>
      <TabPanels>
        <TabPanel>
          <ScoringPage />
        </TabPanel>
        <TabPanel>Content 2</TabPanel>
        <TabPanel>Content 3</TabPanel>
      </TabPanels>
    </TabGroup>
  );
}
