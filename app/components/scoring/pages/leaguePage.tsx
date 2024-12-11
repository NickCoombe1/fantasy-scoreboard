"use client";

import React, { useCallback, useEffect, useState } from "react";

import LoadingSpinner from "@/app/components/common/loadingSpinner";
import { LeagueData } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import { GameStatusData } from "@/app/models/game";
import {
  fetchGameWeekDetails,
  fetchLeagueData,
  fetchTeamDetails,
} from "@/app/apiHelpers/apiHelpers";
import { useParams } from "next/navigation";
import Matchup from "@/app/components/scoring/matchup";

export default function LeaguePage() {
  const { leagueID, teamID } = useParams() as {
    leagueID: string;
    teamID: string;
  };
  const leagueIDNumber = Number(leagueID);
  const teamIDNumber = Number(teamID);
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
      const leagueResponse = await fetchLeagueData(leagueIDNumber);

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
  }, [leagueIDNumber]);

  useEffect(() => {
    fetchData();
  }, [fetchData, leagueIDNumber]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full md:w-2/3 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
        {loading && <LoadingSpinner />}
        <div className="flex flex-col  justify-center gap-4 md:gap-8 w-full">
          {leagueData &&
            !loading &&
            teamsScoringData &&
            leagueData.matches
              .filter((x) => x.event == gameweekInfo?.current_event)
              .map((match, index) => {
                const team1 = leagueData?.league_entries.find(
                  (team) =>
                    team.id == match.league_entry_1 &&
                    match.event == gameweekInfo?.current_event,
                );
                const team2 = leagueData?.league_entries.find(
                  (team) =>
                    team.id == match.league_entry_2 &&
                    match.event == gameweekInfo?.current_event,
                );
                if (!team1 || !team2) {
                  setError("An unexpected error occurred.");
                  return;
                }
                const team1Data = Object.entries(teamsScoringData).find(
                  ([key]) => Number(key) == match.league_entry_1,
                )?.[1];
                const team2Data = Object.entries(teamsScoringData).find(
                  ([key]) => Number(key) == match.league_entry_2,
                )?.[1];
                if (!team1Data || !team2Data) {
                  setError("An unexpected error occurred.");
                  return;
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
      </div>{" "}
    </div>
  );
}
