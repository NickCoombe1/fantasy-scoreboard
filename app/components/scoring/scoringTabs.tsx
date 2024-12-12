import React, { Suspense } from "react";
import { LeagueData } from "@/app/models/league";
import { GameStatusData } from "@/app/models/game";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import { TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import TabHeader from "@/app/components/common/tabHeader";

const Scoring = React.lazy(
  () => import("@/app/components/scoring/pages/scoringPage"),
);
const MatchupPageServer = React.lazy(
  () => import("@/app/components/scoring/pages/matchupPageServer"),
);
const LeaguePageServer = React.lazy(
  () => import("@/app/components/scoring/pages/leaguePageServer"),
);

interface ScoringTabsProps {
  leagueData: LeagueData;
  teamScoringData: ScoringData;
  gameweekInfo: GameStatusData;
  teamID: number;
}

export default function ScoringTabs({
  leagueData,
  teamScoringData,
  gameweekInfo,
  teamID,
}: ScoringTabsProps) {
  const team = leagueData.league_entries.find(
    (entry) => entry.entry_id === Number(teamID),
  );
  return (
    <div className={"relative md:top-[-3.125rem]"}>
      <TabGroup className={"flex flex-col items-center gap-4 "}>
        <TabHeader leagueName={leagueData.league.name} />
        <div className="h-[108px] md:h-[137px] flex-col justify-start items-center gap-4 flex my-8">
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
                <Suspense
                  fallback={
                    <div className={"flex justify-center mt-8"}>
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <Scoring
                    leagueData={leagueData}
                    teamScoringData={teamScoringData}
                  />{" "}
                </Suspense>
              </TabPanel>
              <TabPanel>
                <Suspense
                  fallback={
                    <div className={"flex justify-center mt-8"}>
                      <LoadingSpinner />
                    </div>
                  }
                >
                  {team && (
                    <MatchupPageServer
                      team={team}
                      teamID={Number(teamID)}
                      leagueData={leagueData}
                      teamScoringData={teamScoringData}
                      gameweek={gameweekInfo?.current_event}
                    />
                  )}
                </Suspense>
              </TabPanel>
              <TabPanel>
                {" "}
                <Suspense
                  fallback={
                    <div className={"flex justify-center mt-8"}>
                      <LoadingSpinner />
                    </div>
                  }
                >
                  <LeaguePageServer
                    leagueData={leagueData}
                    gameweek={gameweekInfo?.current_event}
                  />{" "}
                </Suspense>
              </TabPanel>
            </>
          )}
        </TabPanels>
      </TabGroup>
    </div>
  );
}
