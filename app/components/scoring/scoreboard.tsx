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
  gameweekNumber?: number;
};

export default function ScoreBoard({
  picks,
  team,
  totalPoints,
  gameweekNumber,
}: ScoreBoardProps) {
  const [showBench, setShowBench] = useState(false);

  const startingPlayers = picks.filter((pick) => !pick.isSub);
  const benchPlayers = picks.filter((pick) => pick.isSub);

  return (
    <div className="w-full md:w-1/2 flex-col justify-start items-center gap-8 md:gap-20 inline-flex">
      <div className="h-[108px] md:h-[137px] flex-col justify-start items-center gap-4 flex">
        <div className="self-stretch text-center text-light-80 md:text-light-60 dark:text-dark-80 dark:md:text-dark-60 text-xs md:text-sm font-medium font-roobertMono uppercase leading-3 tracking-tight md:tracking-wide">
          GAME WEEK
        </div>
        <div className="self-stretch text-center dark:text-dark-90 text-light-90 text-[5.625rem] md:text-9xl font-medium font-roobert leading-[5rem] md:leading-[6.75rem]">
          {" "}
          {gameweekNumber}
        </div>
      </div>
      <div className="self-stretch flex-col justify-start items-center gap-2 md:gap-6 flex">
        <div className="self-stretch justify-start items-center gap-4 md:gap-6 inline-flex">
          <div className="grow shrink basis-0 h-[3.375rem] md:h-[4.4rem] px-10 py-5 bg-white/70 dark:bg-white/5 rounded-2xl border border-white/50 justify-center items-center flex">
            <div className="text-center  dark:text-dark-90 text-light-90 text-base md:text-[1.625rem] font-semibold font-roobert leading-[.25rem] md:leading-normal">
              {" "}
              {team?.entry_name}
            </div>
          </div>
          <div className="w-[3.375rem] h-[3.375rem] md:h-[4.4rem] px-6 md:px-10 py-6  bg-light-default dark:bg-white  rounded-2xl border border-white/50 justify-center items-center flex">
            <div className="text-center text-[#eae8f0] dark:text-light-90 text-base md:text-[1.625rem] font-semibold font-roobert leading-[.25rem] md:leading-normal">
              {" "}
              {totalPoints}
            </div>
          </div>
        </div>
        <div className="w-full p-6 md:p-8 border-white/50 dark:bg-white/5  rounded-2xl border  flex-col justify-start items-center gap-8 inline-flex">
          <div className="text-center text-light-60 dark:text-dark-60 text-xs md:text-sm font-medium font-roobertMono uppercase leading-[0.675rem] tracking-tight md:leading-3 md:tracking-wide">
            Starting Players
          </div>
          <div className="self-stretch flex-col justify-start items-center flex">
            {startingPlayers &&
              startingPlayers
                .sort((a, b) => a.position - b.position)
                .map((pick) => (
                  <PlayerPickCard key={pick.element} pick={pick} />
                ))}
          </div>
          <div className="h-6 opacity-60 justify-start items-center gap-2 inline-flex">
            <div className="text-center text-light-60 dark:text-dark-60 text-sm font-medium font-roobertMono uppercase leading-3 tracking-wide">
              {`${!showBench ? "SHOW" : "HIDE"} BENCH`}
            </div>
            <button
              onClick={() => setShowBench(!showBench)}
              className="flex items-center justify-center gap-2 text-sm font-medium text-light-default dark:text-dark-default hover:underline"
            >
              <FontAwesomeIcon
                icon={showBench ? faChevronUp : faChevronDown}
                className={"text-light-default dark:text-dark-default"}
              />
            </button>
          </div>{" "}
          {showBench && (
            <div className="self-stretch flex-col justify-start items-center flex">
              {benchPlayers &&
                benchPlayers
                  .sort((a, b) => a.position - b.position)
                  .map((pick) => (
                    <PlayerPickCard key={pick.element} pick={pick} />
                  ))}
            </div>
          )}
        </div>{" "}
      </div>
    </div>
  );
}
