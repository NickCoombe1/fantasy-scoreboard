import { NextResponse } from "next/server";
import { PlayerData } from "@/app/models/playerData";

type PlayerElements = Record<string, PlayerData>;

export interface PlayerDataResponse {
  elements: PlayerElements;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const gameweek = searchParams.get("gameweek");

  if (!gameweek) {
    return NextResponse.json(
      { error: "Gameweek parameter is required" },
      { status: 400 },
    );
  }

  try {
    const gameweekNumber = parseInt(gameweek, 10);
    if (isNaN(gameweekNumber)) {
      throw new Error("Invalid gameweek parameter");
    }

    const url = `https://draft.premierleague.com/api/event/${gameweekNumber}/live`;

    const response = await fetch(url, {
      cache: "no-store",
    });
    if (!response.ok) {
      throw new Error(
        `Failed to fetch scoring data for gameweek ${gameweekNumber}: ${response.statusText}`,
      );
    }

    const data: PlayerDataResponse = await response.json();
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
