"use client";

import React, { useEffect, useState } from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import { LeagueData } from "@/app/models/league";
import { GameStatusData } from "@/app/models/game";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import {
  fetchGameWeekDetails,
  fetchLeagueData,
  fetchTeamDetails,
} from "@/app/apiHelpers/apiHelpers";
import ScoreBoardHeader from "@/app/components/scoring/scoreboardHeader";

interface ScoringPageProps {
  leagueID: number;
  teamID: number;
}
export default function Scoring({ leagueID, teamID }: ScoringPageProps) {
  const [gameweekInfo, setGameweekInfo] = useState<GameStatusData | null>(null);
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
  const [teamScoringData, setTeamScoringData] = useState<ScoringData | null>(
    null,
  );
  const [loadingTeamData, setLoadingTeamData] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGameWeekAndLeague = async () => {
      try {
        const gameweekResponse = await fetchGameWeekDetails();
        if (!gameweekResponse) {
          new Error("Failed to load gameweek data");
        }
        setGameweekInfo(gameweekResponse);

        const leagueResponse = await fetchLeagueData(leagueID);
        if (!leagueResponse) {
          new Error("Failed to load league data");
        }
        setLeagueData(leagueResponse);
      } catch (error) {
        console.error("Error fetching gameweek or league data:", error);
        setError("An unexpected error occurred while fetching data.");
      } finally {
      }
    };

    fetchGameWeekAndLeague();
  }, [leagueID]);

  useEffect(() => {
    const fetchTeamScoring = async () => {
      if (!gameweekInfo?.current_event) return;

      try {
        setLoadingTeamData(true);
        const teamResponse = await fetchTeamDetails(
          teamID,
          gameweekInfo.current_event,
        );
        if (!teamResponse) {
          new Error("Failed to load team scoring data");
        }
        setTeamScoringData(teamResponse);
      } catch (error) {
        console.error("Error fetching team scoring data:", error);
        setError(
          "An unexpected error occurred while fetching team scoring data.",
        );
      } finally {
        setLoadingTeamData(false);
      }
    };

    fetchTeamScoring();
  }, [teamID, gameweekInfo]);

  const team = leagueData?.league_entries.find(
    (team) => team.entry_id === teamID,
  );
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full md:w-1/2 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
        <div className="h-[108px] md:h-[137px] flex-col justify-start items-center gap-4 flex">
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
        {teamScoringData && team ? (
          <div className="self-stretch flex-col justify-start items-center gap-2 md:gap-6 flex">
            <ScoreBoardHeader
              totalPoints={teamScoringData?.totalPoints || 0}
              teamName={team?.entry_name}
              alignPoints={"right"}
            />
            <ScoreBoard picks={teamScoringData.picks} />
          </div>
        ) : (
          loadingTeamData && <LoadingSpinner />
        )}
      </div>
    </div>
  );
}
