import { NextResponse } from "next/server";
import { PlayerPick } from "../../models/playerPick";
import { FplTeamPicksResponse } from "../../models/fplTeamPicksResponse";
import {
  fetchBootStrap,
  fetchGameweekFixtureData,
  fetchWeeklyScoringData,
  fetchWeeklyTeam,
} from "@/app/apiHelpers/apiHelpers";
import { Fixtures } from "@/app/models/fplFixtureResponse";
import { calculateAutoSubs } from "@/app/apiHelpers/calculateAutoSubs";
import { FplBootstrapResponse } from "@/app/models/fplBootstrapResponse";
import { PlayerDataResponse } from "@/app/api/fetchWeeklyScoring/route";

export interface ScoringData {
  totalPoints: number;
  picks: PlayerPick[];
  playersPlayed: number;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamID = searchParams.get("teamID");
  const gameweek = searchParams.get("gameweek");

  if (!teamID || !gameweek) {
    return NextResponse.json(
      { error: "Both teamID and gameweek are required" },
      { status: 400 },
    );
  }

  try {
    const teamIDNumber = parseInt(teamID, 10);
    const gameweekNumber = parseInt(gameweek, 10);

    const [bootstrapData, scoringData, teamData, gameweekFixtureData] =
      await Promise.all([
        fetchBootStrap(),
        fetchWeeklyScoringData(gameweekNumber),
        fetchWeeklyTeam(teamIDNumber, gameweekNumber),
        fetchGameweekFixtureData(gameweekNumber),
      ]);
    const processedTeamData = await processTeamData(
      bootstrapData,
      scoringData,
      teamData,
      gameweekFixtureData,
    );

    return NextResponse.json(processedTeamData);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred" },
        { status: 500 },
      );
    } else {
      return NextResponse.json(
        { error: "An unexpected error occurred" },
        { status: 500 },
      );
    }
  }
}

async function processTeamData(
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
  teamData: FplTeamPicksResponse,
  gameweekFixtureData: Fixtures,
): Promise<ScoringData> {
  const picks = mapBootstrapData(
    bootstrapData,
    scoringData,
    teamData,
    gameweekFixtureData,
  );
  const sortedTeam = calculateAutoSubs(picks);
  const totalPoints = sortedTeam.reduce(
    (acc, pick) => acc + (pick.isSub ? 0 : pick.points),
    0,
  );
  const playersPlayed = sortedTeam.reduce(
    (acc, pick) => acc + (pick.hasPlayed && !pick.isSub ? 1 : 0),
    0,
  );
  return { picks: sortedTeam, totalPoints, playersPlayed };
}

function mapBootstrapData(
  bootstrapData: FplBootstrapResponse,
  scoringData: PlayerDataResponse,
  teamData: FplTeamPicksResponse,
  gameweekFixtureData: Fixtures,
): PlayerPick[] {
  return teamData.picks.map((pick) => {
    const playerData = scoringData.elements[pick.element];
    const basePoints = playerData?.stats.total_points || 0;
    const totalPoints = basePoints * pick.multiplier;
    const isSub = pick.position > 11;
    const playerInfo = Object.values(bootstrapData.elements).find(
      (player) => player.id === pick.element,
    );
    const playerName = playerInfo?.web_name || "Unknown";
    const isInjured = playerInfo?.chance_of_playing_this_round == 0;

    const gameStatus = getGameStatus(playerInfo?.team, gameweekFixtureData);
    const hasPlayed = (playerData?.stats.minutes || 0) > 0;
    const fieldPosition = playerInfo?.element_type
      ? playerInfo?.element_type
      : 1;
    const wasSubbedOn =
      gameStatus.isInProgress && playerData?.stats.minutes > 0;
    return {
      ...pick,
      points: totalPoints,
      pointDetails: playerData?.explain,
      name: playerName,
      isSub,
      hasPlayed,
      isInjured,
      wasSubbedOn,
      gameStatus,
      yellowCarded: playerData.stats.yellow_cards > 0,
      redCarded: playerData.stats.red_cards > 0,
      fieldPosition: fieldPosition,
      stats: playerData?.stats,
    };
  });
}

function getGameStatus(
  teamID: number | undefined,
  gameweekFixtureData: Fixtures,
): {
  isFinished: boolean;
  isInProgress: boolean;
} {
  if (teamID) {
    for (const match of gameweekFixtureData) {
      if (match.team_a === teamID || match.team_h === teamID) {
        const isFinished = match.finished;
        const isInProgress = match.started && !match.finished;

        return {
          isFinished,
          isInProgress,
        };
      }
    }
  }
  //This is set to true so the autosub logic subs the players. It's probably not the best idea to re-use isFinished for this. Should refactor in future.
  return {
    isFinished: true,
    isInProgress: false,
  };
}
