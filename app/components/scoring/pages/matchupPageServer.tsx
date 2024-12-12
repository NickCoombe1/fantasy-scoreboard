import MatchupPage from "@/app/components/scoring/pages/matchupPage";
import { LeagueData, LeagueEntry } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import { fetchTeamDetails } from "@/app/apiHelpers/apiHelpers";

interface MatchupPageServerProps {
  team: LeagueEntry;
  teamID: number;
  leagueData: LeagueData;
  teamScoringData: ScoringData;
  gameweek: number;
}

export default async function MatchupServerPage({
  team,
  teamID,
  leagueData,
  teamScoringData,
  gameweek,
}: MatchupPageServerProps) {
  const opponent = findOpponent(leagueData, Number(teamID), gameweek);
  if (!opponent) {
    return <div>Error: Team or opponent data is missing.</div>;
  }
  const opponentScoringData = await fetchTeamDetails(
    opponent.entry_id,
    gameweek,
  );

  return (
    <MatchupPage
      team={team}
      opponent={opponent}
      teamScoringData={teamScoringData}
      opponentScoringData={opponentScoringData}
    />
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
