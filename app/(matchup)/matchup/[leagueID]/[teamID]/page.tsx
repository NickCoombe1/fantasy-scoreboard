"use client";

import React, { useEffect, useState } from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import { LeagueData, LeagueEntry } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import { GameStatusData } from "@/app/models/game";
import {
  fetchGameWeekDetails,
  fetchLeagueData,
  fetchTeamDetails,
} from "@/app/apiHelpers/apiHelpers";
import ScoreBoardHeader from "@/app/components/scoring/scoreboardHeader";

export default function MatchupPage({
  params,
}: {
  params: { leagueID: number; teamID: number };
}) {
  const leagueID = Number(params.leagueID);
  const teamID = Number(params.teamID);
  const [gameweekInfo, setGameweekInfo] = useState<GameStatusData | null>(null);
  const [team, setTeam] = useState<LeagueEntry | null>(null);
  const [opponent, setOpponent] = useState<LeagueEntry | null>(null);
  const [teamScoring, setTeamScoring] = useState<ScoringData | null>(null);
  const [opponentScoring, setOpponentScoring] = useState<ScoringData | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const leagueData = await fetchLeagueData(leagueID);
        const gameweekInfo = await fetchGameWeekDetails();
        const currentGameweek = gameweekInfo?.current_event;

        if (leagueData && currentGameweek) {
          const foundTeam = leagueData.league_entries.find(
            (team) => team.entry_id == teamID,
          );
          if (foundTeam) {
            setTeam(foundTeam);
          }

          // Get the opponent
          const opponent = findOpponent(leagueData, teamID, currentGameweek);
          setOpponent(opponent);

          // Fetch scores for both teams
          const teamScoringData = await fetchTeamDetails(
            teamID,
            currentGameweek,
          );
          if (opponent) {
            const opponentScoringData = await fetchTeamDetails(
              opponent?.entry_id,
              currentGameweek,
            );
            setOpponentScoring(opponentScoringData);
          }

          setGameweekInfo(gameweekInfo);
          setTeamScoring(teamScoringData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("An unexpected error occurred while loading the matchup.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [leagueID, teamID]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full md:w-2/3 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
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
        {team && opponent && teamScoring && opponentScoring && (
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full">
            {/* Mobile view */}
            <div className="md:hidden w-full flex gap justify-center gap-1">
              <ScoreBoardHeader
                teamName={team?.entry_name}
                totalPoints={teamScoring?.totalPoints}
                alignPoints={"right"}
              />{" "}
              <div
                className={
                  "dark:text-dark-90 text-light-90 font-semibold text-base leading-[.875rem] mt-5 md:hidden"
                }
              >
                V
              </div>
              <ScoreBoardHeader
                teamName={opponent?.entry_name}
                totalPoints={opponentScoring?.totalPoints}
                alignPoints={"left"}
              />{" "}
            </div>
            {/* Desktop view */}
            <div className="flex flex-col items-start gap-6 w-full">
              {" "}
              <div className="hidden md:block w-full">
                <ScoreBoardHeader
                  teamName={team?.entry_name}
                  totalPoints={teamScoring?.totalPoints}
                  alignPoints={"right"}
                />
              </div>
              <ScoreBoard picks={teamScoring?.picks || []} />
            </div>
            <div
              className={
                "dark:text-dark-90 text-light-90 font-semibold text-[1.625rem] leading-normal mt-4 hidden md:block"
              }
            >
              V
            </div>
            <div className="flex flex-col  items-start gap-6 w-full">
              {" "}
              <div className="hidden md:block w-full">
                <ScoreBoardHeader
                  teamName={opponent?.entry_name}
                  totalPoints={opponentScoring?.totalPoints}
                  alignPoints={"left"}
                />{" "}
              </div>
              <ScoreBoard picks={opponentScoring?.picks || []} />{" "}
            </div>
          </div>
        )}
      </div>{" "}
    </div>
  );
}

// Helper to find opponent for the given team in the current gameweek
const findOpponent = (
  leagueData: LeagueData,
  teamID: number,
  gameweek: number,
): LeagueEntry | null => {
  const teamEntry = leagueData.league_entries.find(
    (team) => team.entry_id === teamID,
  );

  if (!teamEntry) return null;

  const matchup = leagueData.matches.find(
    (match) =>
      match.event === gameweek &&
      (match.league_entry_1 === teamEntry.id ||
        match.league_entry_2 === teamEntry.id),
  );

  if (!matchup) return null;

  const opponentID =
    matchup.league_entry_1 === teamEntry.id
      ? matchup.league_entry_2
      : matchup.league_entry_1;

  return (
    leagueData.league_entries.find((team) => team.id === opponentID) || null
  );
};
