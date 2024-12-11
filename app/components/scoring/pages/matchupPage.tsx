"use client";

import React, { useEffect, useState } from "react";
import ScoreBoard from "@/app/components/scoring/scoreboard";
import LoadingSpinner from "@/app/components/common/loadingSpinner";
import { LeagueData, LeagueEntry } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import { fetchTeamDetails } from "@/app/apiHelpers/apiHelpers";
import { useParams } from "next/navigation";
import ScoreboardHeaderVersus from "@/app/components/scoring/scoreboardHeaderVersus";

interface MatchupPageProps {
  leagueData: LeagueData;
  teamScoringData: ScoringData;
  gameweek: number;
  loading: boolean;
  error: string;
}

export default function MatchupPage({
  leagueData,
  teamScoringData,
  gameweek,
  loading,
  error,
}: MatchupPageProps) {
  const { leagueID, teamID } = useParams() as {
    leagueID: string;
    teamID: string;
  };
  const leagueIDNumber = Number(leagueID);
  const teamIDNumber = Number(teamID);
  const [team, setTeam] = useState<LeagueEntry | null>(null);
  const [opponent, setOpponent] = useState<LeagueEntry | null>(null);
  const [opponentScoring, setOpponentScoring] = useState<ScoringData | null>(
    null,
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const foundTeam = leagueData.league_entries.find(
          (team) => team.entry_id == teamIDNumber,
        );
        if (foundTeam) {
          setTeam(foundTeam);
        }

        // Get the opponent
        const opponent = findOpponent(leagueData, teamIDNumber, gameweek);
        setOpponent(opponent);

        // Fetch scores for both teams
        if (opponent) {
          const opponentScoringData = await fetchTeamDetails(
            opponent?.entry_id,
            gameweek,
          );
          setOpponentScoring(opponentScoringData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        // setError("An unexpected error occurred while loading the matchup.");
      } finally {
        //setLoading(false);
      }
    };

    fetchData();
  }, [leagueIDNumber, teamIDNumber]);

  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full md:w-2/3 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
        {loading && <LoadingSpinner />}
        {team && opponent && teamScoringData && opponentScoring && (
          <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full">
            {/* Mobile view */}
            <div className="md:hidden w-full flex gap justify-center gap-1">
              <ScoreboardHeaderVersus
                teamName={team?.entry_name}
                totalPoints={teamScoringData?.totalPoints}
                alignPoints={"right"}
              />{" "}
              <div
                className={
                  "dark:text-dark-90 text-light-90 font-semibold text-base leading-[.875rem] mt-5 md:hidden"
                }
              >
                V
              </div>
              <ScoreboardHeaderVersus
                teamName={opponent?.entry_name}
                totalPoints={opponentScoring?.totalPoints}
                alignPoints={"left"}
              />{" "}
            </div>
            {/* Desktop view */}
            <div className="flex flex-col items-start gap-6 w-full">
              {" "}
              <div className="hidden md:block w-full">
                <ScoreboardHeaderVersus
                  teamName={team?.entry_name}
                  totalPoints={teamScoringData?.totalPoints}
                  alignPoints={"right"}
                />
              </div>
              <ScoreBoard picks={teamScoringData?.picks || []} />
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
                <ScoreboardHeaderVersus
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
