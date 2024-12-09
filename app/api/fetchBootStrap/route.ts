import { FplBootstrapResponse } from "@/app/models/fplBootstrapResponse";
import { NextResponse } from "next/server";

export async function GET() {
  const url = "https://draft.premierleague.com/api/bootstrap-static";

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch bootstrap data: ${response.statusText}`);
    }

    const data: FplBootstrapResponse = await response.json();
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
