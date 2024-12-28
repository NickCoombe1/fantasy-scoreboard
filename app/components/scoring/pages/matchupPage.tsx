"use client";

import React from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import { LeagueEntry } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import ScoreboardHeaderVersus from "@/app/components/scoring/scoreboardHeaderVersus";

interface MatchupPageProps {
  team: LeagueEntry;
  opponent: LeagueEntry;
  teamScoringData: ScoringData;
  opponentScoringData: ScoringData;
}

export default function MatchupPage({
  team,
  opponent,
  teamScoringData,
  opponentScoringData,
}: MatchupPageProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full md:w-2/3 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full">
          {/* Mobile view */}
          <div className="md:hidden w-full flex gap justify-center gap-1">
            <ScoreboardHeaderVersus
              teamName={team.entry_name}
              totalPoints={teamScoringData.totalPoints}
              playersPlayed={teamScoringData.playersPlayed}
              alignPoints={"right"}
            />
            <div
              className={
                "dark:text-dark-90 text-light-90 font-semibold text-base leading-[.875rem] mt-5 md:hidden"
              }
            >
              V
            </div>
            <ScoreboardHeaderVersus
              teamName={opponent.entry_name}
              totalPoints={opponentScoringData.totalPoints}
              playersPlayed={opponentScoringData.playersPlayed}
              alignPoints={"left"}
            />
          </div>
          {/* Desktop view */}
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="hidden md:block w-full">
              <ScoreboardHeaderVersus
                teamName={team.entry_name}
                totalPoints={teamScoringData.totalPoints}
                playersPlayed={teamScoringData.playersPlayed}
                alignPoints={"right"}
              />
            </div>
            <ScoreBoard picks={teamScoringData.picks || []} />
          </div>
          <div
            className={
              "dark:text-dark-90 text-light-90 font-semibold text-[1.625rem] leading-normal mt-4 hidden md:block"
            }
          >
            V
          </div>
          <div className="flex flex-col items-start gap-6 w-full">
            <div className="hidden md:block w-full">
              <ScoreboardHeaderVersus
                teamName={opponent.entry_name}
                totalPoints={opponentScoringData.totalPoints}
                playersPlayed={opponentScoringData.playersPlayed}
                alignPoints={"left"}
              />
            </div>
            <ScoreBoard picks={opponentScoringData.picks || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
