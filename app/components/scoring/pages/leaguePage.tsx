"use client";

import React from "react";
import { LeagueData } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import Matchup from "@/app/components/scoring/matchup";

interface LeaguePageProps {
  gameweek: number;
  leagueData: LeagueData;
  teamsScoringData: Record<number, ScoringData>;
}

export default function LeaguePage({
  gameweek,
  leagueData,
  teamsScoringData,
}: LeaguePageProps) {
  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full md:w-2/3 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
        <div className="flex flex-col justify-center gap-8 md:gap-16 w-full">
          {leagueData.matches
            .filter((match) => match.event === gameweek)
            .map((match, index) => {
              const team1 = leagueData.league_entries.find(
                (team) =>
                  team.id === match.league_entry_1 && match.event === gameweek,
              );
              const team2 = leagueData.league_entries.find(
                (team) =>
                  team.id === match.league_entry_2 && match.event === gameweek,
              );

              if (!team1 || !team2) {
                return (
                  <div key={index} className="text-red-500">
                    Error: Team data missing.
                  </div>
                );
              }

              const team1Data = teamsScoringData[match.league_entry_1];
              const team2Data = teamsScoringData[match.league_entry_2];

              if (!team1Data || !team2Data) {
                return (
                  <div key={index} className="text-red-500">
                    Error: Scoring data missing.
                  </div>
                );
              }

              return (
                <div key={index}>
                  <Matchup
                    team={team1}
                    opponent={team2}
                    teamScoring={team1Data}
                    opponentScoring={team2Data}
                  />
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
