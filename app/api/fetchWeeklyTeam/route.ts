import { NextResponse } from "next/server";
import { FplTeamPicksResponse } from "@/app/models/fplTeamPicksResponse";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const teamID = searchParams.get("teamID");
  const gameweek = searchParams.get("gameweek");

  if (!teamID || !gameweek) {
    return NextResponse.json(
      { error: "Both teamID and gameweek parameters are required" },
      { status: 400 },
    );
  }

  try {
    const teamIDNumber = parseInt(teamID, 10);
    const gameweekNumber = parseInt(gameweek, 10);

    if (isNaN(teamIDNumber) || isNaN(gameweekNumber)) {
      throw new Error("Invalid teamID or gameweek parameters");
    }

    const url = `https://draft.premierleague.com/api/entry/${teamIDNumber}/event/${gameweekNumber}`;

    const response = await fetch(url, { next: { revalidate: 60 } });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch team data for team ${teamIDNumber}, gameweek ${gameweekNumber}: ${response.statusText}`,
      );
    }

    const data: FplTeamPicksResponse = await response.json();
    return NextResponse.json(data);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message || "An error occurred while fetching data" },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { error: "An unexpected error occurred" },
      { status: 500 },
    );
  }
}
