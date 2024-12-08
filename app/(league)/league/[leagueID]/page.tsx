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
import MatchUpCard from "@/app/components/scoring/matchup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSyncAlt } from "@fortawesome/free-solid-svg-icons";

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-900 dark:text-gray-100 flex flex-col gap-6">
      {teamsScoringData && (
        <>
          <div className="flex items-center justify-center gap-4 w-full">
            <h1 className="text-3xl font-bold">
              Gameweek {gameweekInfo?.current_event}
            </h1>
            <button
              onClick={handleRefresh}
              className="top-4 right-4 p-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-500 transition"
              aria-label="Refresh"
            >
              <FontAwesomeIcon icon={faSyncAlt} />
            </button>
          </div>

          <div className="w-full ">
            {leagueData &&
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
                    <div key={index} className={"mb-2"}>
                      <MatchUpCard
                        key={index}
                        team1={{
                          picks: team1Data.picks,
                          team: team1,
                          totalPoints: team1Data.totalPoints,
                        }}
                        team2={{
                          picks: team2Data.picks,
                          team: team2,
                          totalPoints: team2Data.totalPoints,
                        }}
                      />
                    </div>
                  );
                })}
          </div>
        </>
      )}
    </div>
  );
}
