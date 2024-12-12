"use client";

import ScoreBoard from "@/app/components/scoring/scoreboard";
import { LeagueData } from "@/app/models/league";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import ScoreBoardHeader from "@/app/components/scoring/scoreboardHeader";
import { useParams } from "next/navigation";

interface ScoringPageProps {
  leagueData: LeagueData;
  teamScoringData: ScoringData;
}
export default function ScoringPage({
  leagueData,
  teamScoringData,
}: ScoringPageProps) {
  const { teamID } = useParams() as { teamID: string };
  const team = leagueData?.league_entries.find(
    (team) => team.entry_id === Number(teamID),
  );

  return (
    <div className="min-h-[80vh] flex flex-col items-center p-6">
      <div className="w-full md:w-1/2 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
        <div className="self-stretch flex-col justify-start items-center gap-2 md:gap-6 flex">
          {team && (
            <ScoreBoardHeader
              totalPoints={teamScoringData?.totalPoints || 0}
              teamName={team?.entry_name}
            />
          )}
          <ScoreBoard picks={teamScoringData.picks} />
        </div>
      </div>
    </div>
  );
}
