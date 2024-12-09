import React, { useState } from "react";
import { PlayerPick } from "@/app/models/playerPick";
import { LeagueEntry } from "@/app/models/league";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PlayerPickCard from "@/app/components/scoring/playerRow";

type ScoreBoardProps = {
  picks: PlayerPick[];
  team: LeagueEntry | undefined;
  totalPoints: number;
};

export default function ScoreBoard({
  picks,
  team,
  totalPoints,
}: ScoreBoardProps) {
  const [showBench, setShowBench] = useState(false);

  const startingPlayers = picks.filter((pick) => !pick.isSub);
  const benchPlayers = picks.filter((pick) => pick.isSub);

  return (
    <>
      <div className="h-[71px] justify-start items-center gap-6 inline-flex">
        <div className="grow shrink basis-0 h-[71px] px-10 py-6 bg-white/5 rounded-2xl border border-white/50 justify-center items-center flex">
          <div className="text-center text-[#f8f8f8]/90 text-[26px] font-semibold font-['Roobert TRIAL'] leading-normal">
            {" "}
            {team?.entry_name}
          </div>
        </div>
        <div className="h-[71px] px-10 py-6 bg-white rounded-2xl border border-white/50 justify-center items-center flex">
          <div className="text-center text-[#0e0e0e]/90 text-[26px] font-semibold font-['Roobert TRIAL'] leading-normal">
            {" "}
            {totalPoints}
          </div>
        </div>
      </div>
      <div className="bg-gray-50 dark:bg-gray-800 rounded-lg shadow-inner p-3">
        <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
          Starting Players
        </h3>

        <div className="space-y-3">
          {startingPlayers &&
            startingPlayers
              .sort((a, b) => a.position - b.position)
              .map((pick) => <PlayerPickCard key={pick.element} pick={pick} />)}
        </div>

        <div className="mt-4">
          <button
            onClick={() => setShowBench(!showBench)}
            className="flex items-center justify-center gap-2 text-sm font-medium text-gray-600 dark:text-gray-300 hover:underline"
          >
            <FontAwesomeIcon icon={showBench ? faChevronUp : faChevronDown} />
          </button>
          {showBench && (
            <div className="mt-2 space-y-2">
              {benchPlayers &&
                benchPlayers
                  .sort((a, b) => a.position - b.position)
                  .map((pick) => (
                    <PlayerPickCard key={pick.element} pick={pick} />
                  ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
