"use client";

import React from "react";
import { LeagueData } from "@/app/models/league";
import { GameStatusData } from "@/app/models/game";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Scoring from "@/app/components/scoring/pages/scoringPage";
import MatchupPage from "@/app/components/scoring/pages/matchupPage";
import LeaguePage from "@/app/components/scoring/pages/leaguePage";

interface ScoringTabsProps {
  leagueData: LeagueData;
  teamScoringData: ScoringData;
  gameweekInfo: GameStatusData;
}

export default function ScoringTabs({
  leagueData,
  teamScoringData,
  gameweekInfo,
}: ScoringTabsProps) {
  return (
    <div className={"min-h-[80vh]"}>
      <TabGroup className={"flex flex-col items-center  gap-4"}>
        <div className="w-full md:w-auto md:px-1 pt-8 md:pb-1 px-1 pb-1 mt-[-2px] bg-black/5 dark:bg-black/20 rounded-b-lg md:rounded-lg shadow-custom-light-header-bottom md:shadow-custom-light-header backdrop-blur-2xl flex-col justify-start items-center gap-8 inline-flex">
          <div className="text-center dark:text-dark-90 text-light-90 text-[1.625rem] font-semibold leading-normal">
            Hawcey Gang
          </div>
          <TabList className="w-full items-center justify-center gap-2 md:gap-2 inline-flex h-[41px] mx-8">
            <Tab className="flex-grow md:h-[2.5rem] px-4 py-3.5 data-[selected]:bg-white data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay  rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
                MY scoring
              </div>
            </Tab>
            <Tab className="flex-grow md:h-[2.5rem] px-4 py-3.5 data-[selected]:bg-white  data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay  rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
                Matchup
              </div>
            </Tab>
            <Tab className="flex-grow md:h-[2.5rem] px-4 py-3.5 data-[selected]:bg-white data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay  rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
                League Scoring
              </div>
            </Tab>
          </TabList>{" "}
        </div>
        <div className="h-[108px] md:h-[137px] flex-col justify-start items-center gap-4 flex mt-4">
          {gameweekInfo && (
            <>
              <div className="self-stretch text-center text-light-80 md:text-light-60 dark:text-dark-80 dark:md:text-dark-60 text-xs md:text-sm font-medium font-roobertMono uppercase leading-3 tracking-tight md:tracking-wide">
                GAME WEEK
              </div>
              <div className="self-stretch text-center dark:text-dark-90 text-light-90 text-[5.625rem] md:text-9xl font-medium font-roobert leading-[5rem] md:leading-[6.75rem]">
                {gameweekInfo?.current_event}
              </div>
            </>
          )}
        </div>
        <TabPanels className={"w-full"}>
          {leagueData && teamScoringData && gameweekInfo && (
            <>
              <TabPanel>
                <Scoring
                  leagueData={leagueData}
                  teamScoringData={teamScoringData}
                />
              </TabPanel>
              <TabPanel>
                <MatchupPage
                  leagueData={leagueData}
                  teamScoringData={teamScoringData}
                  gameweek={gameweekInfo?.current_event}
                />
              </TabPanel>
              <TabPanel>
                <LeaguePage />
              </TabPanel>
            </>
          )}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
