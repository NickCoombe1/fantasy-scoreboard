import { fetchTeamDetails } from "@/app/apiHelpers/apiHelpers";
import LeaguePage from "@/app/components/scoring/pages/leaguePage";
import { LeagueData } from "@/app/models/league";

interface LeaguePageServerProps {
  leagueData: LeagueData;
  gameweek: number;
}

export default async function ScoringTabs({
  leagueData,
  gameweek,
}: LeaguePageServerProps) {
  // Fetch scoring data for all teams in the league
  const teamsScoringData: Record<
    number,
    Awaited<ReturnType<typeof fetchTeamDetails>>
  > = {};
  for (const team of leagueData.league_entries) {
    const teamScoring = await fetchTeamDetails(team.entry_id, gameweek);
    if (teamScoring) {
      teamsScoringData[team.id] = teamScoring;
    }
  }

  return (
    <LeaguePage
      gameweek={gameweek}
      leagueData={leagueData}
      teamsScoringData={teamsScoringData}
    />
  );
}
