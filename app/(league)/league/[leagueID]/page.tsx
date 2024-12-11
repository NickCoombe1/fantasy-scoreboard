"use client";

import React, { useCallback, useEffect, useState } from "react";
import { LeagueData } from "@/app/models/league";
import { GameStatusData } from "@/app/models/game";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import {
  fetchGameWeekDetails,
  fetchLeagueData,
  fetchTeamDetails,
} from "@/app/apiHelpers/apiHelpers";

export default function LeaguePage({
  params,
}: {
  params: { leagueID: string };
}) {
  const [gameweekInfo, setGameweekInfo] = useState<GameStatusData | null>(null);
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
  const [teamsScoringData, setTeamsScoringData] = useState<Record<
    number,
    ScoringData
  > | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const gameweekResponse = await fetchGameWeekDetails();
      const leagueResponse = await fetchLeagueData(Number(params.leagueID));

      if (!gameweekResponse || !leagueResponse) {
        setError("Failed to load gameweek or league data");
        return;
      }

      setGameweekInfo(gameweekResponse);
      setLeagueData(leagueResponse);

      const currentGameweek = gameweekResponse.current_event;
      if (!currentGameweek) return;

      for (const team of leagueResponse.league_entries) {
        const teamsResponse = await fetchTeamDetails(
          team.entry_id,
          currentGameweek,
        );
        if (teamsResponse) {
          setTeamsScoringData((prev) => ({
            ...prev,
            [team.id]: teamsResponse,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  }, [params.leagueID]);

  useEffect(() => {
    fetchData();
  }, [fetchData, params.leagueID]);

  const handleRefresh = () => {
    setError("");
    fetchData();
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={"min-h-[80vh] flex flex-col items-center"}>
      <div className="p-6">
        {/* <div className="w-full md:w-1/2 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
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
        {loading && <LoadingSpinner />}
      </div>*/}
      </div>
    </div>
  );
}
