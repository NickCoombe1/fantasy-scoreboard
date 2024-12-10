type ScoreBoardProps = {
  teamName: string;
  totalPoints: number;
  alignPoints: "left" | "right";
};

export default function ScoreBoardHeader({
  teamName,
  totalPoints,
  alignPoints,
}: ScoreBoardProps) {
  return (
    <div className="self-stretch justify-start items-center gap-2 md:gap-6 flex flex-col ">
      <div
        className={`self-stretch justify-start items-center gap-4 md:gap-6 flex  md:flex-row ${alignPoints === "left" ? "flex-col" : "flex-col-reverse md:inline-flex"} `}
      >
        {alignPoints === "left" && (
          <div className="w-[3.375rem] h-[3.375rem] md:h-[4.4rem] px-6 md:px-10 py-6  bg-light-default dark:bg-white  rounded-2xl border border-white/50 justify-center items-center flex self-start mx-4 md:mx-0">
            <div className="text-center text-[#eae8f0] dark:text-light-90 text-base md:text-[1.625rem] font-semibold font-roobert leading-[.875rem] md:leading-normal">
              {" "}
              {totalPoints}
            </div>
          </div>
        )}
        <div className="grow shrink basis-0 h-[3.375rem] w-[10.25rem] md:h-[4.4rem] px-6 md:px-10 py-5 bg-white/70 dark:bg-white/5 rounded-2xl border border-white/50 justify-center items-center flex">
          <div className="text-center  dark:text-dark-90 text-light-90 text-base md:text-[1.625rem] font-semibold font-roobert leading-[.875rem] md:leading-normal">
            {" "}
            {teamName}
          </div>
        </div>
        {alignPoints === "right" && (
          <div className="w-[3.375rem] h-[3.375rem] md:h-[4.4rem] px-6 md:px-10 py-6  bg-light-default dark:bg-white  rounded-2xl border border-white/50 justify-center items-center flex self-end mx-4 md:mx-0">
            <div className="text-center text-[#eae8f0] dark:text-light-90 text-base md:text-[1.625rem] font-semibold font-roobert leading-[.875rem] md:leading-normal">
              {" "}
              {totalPoints}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
