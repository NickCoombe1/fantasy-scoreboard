import {
  fetchGameWeekDetails,
  fetchLeagueData,
  fetchTeamDetails,
} from "@/app/apiHelpers/apiHelpers";
import ScoringTabs from "@/app/components/scoring/scoringTabs";

export default async function ScoringPage({
  params,
}: {
  params: Promise<{ leagueID: string; teamID: string }>;
}) {
  const leagueID = (await params).leagueID;
  const teamID = (await params).teamID;
  try {
    // Fetch data server-side
    const gameweekInfo = await fetchGameWeekDetails();
    if (!gameweekInfo) {
      throw new Error("Failed to load gameweek data");
    }

    const leagueData = await fetchLeagueData(Number(leagueID));
    if (!leagueData) {
      throw new Error("Failed to load league data");
    }

    const teamScoringData = await fetchTeamDetails(
      Number(teamID),
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
        teamID={Number(teamID)}
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
