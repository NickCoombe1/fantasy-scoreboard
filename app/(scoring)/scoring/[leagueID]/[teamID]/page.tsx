import {
  fetchGameWeekDetails,
  fetchLeagueData,
  fetchTeamDetails,
} from "@/app/apiHelpers/apiHelpers";
import ScoringTabs from "@/app/components/scoring/scoringTabs";

export default async function ScoringPage({
  params,
}: {
  params: { leagueID: string; teamID: string };
}) {
  const leagueID = Number(params.leagueID);
  const teamID = Number(params.teamID);

  try {
    // Fetch data server-side
    const gameweekInfo = await fetchGameWeekDetails();
    if (!gameweekInfo) {
      throw new Error("Failed to load gameweek data");
    }

    const leagueData = await fetchLeagueData(leagueID);
    if (!leagueData) {
      throw new Error("Failed to load league data");
    }

    const teamScoringData = await fetchTeamDetails(
      teamID,
      gameweekInfo.current_event,
    );
    if (!teamScoringData) {
      throw new Error("Failed to load team scoring data");
    }

    return (
      <ScoringTabs
        leagueData={leagueData}
        teamScoringData={teamScoringData}
        gameweekInfo={gameweekInfo}
        teamID={teamID}
      />
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          An unexpected error occurred while loading the page.
        </p>
      </div>
    );
  }
}
