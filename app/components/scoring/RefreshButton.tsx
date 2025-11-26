"use client";

import { useTransition } from "react";
import { refreshScoringData } from "@/app/actions/scoringActions";
import StyledButton from "@/app/components/common/styledButton";

interface Props {
  leagueID: number;
  teamID: number;
}

export default function RefreshButton({ leagueID, teamID }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleRefresh = () => {
    startTransition(async () => {
      refreshScoringData(leagueID, teamID);
    });
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <StyledButton
        label={isPending ? "Updating..." : "Update Scores"}
        type="button"
        onClick={handleRefresh}
      />
    </div>
  );
}
