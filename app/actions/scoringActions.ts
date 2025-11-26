"use server";

import { revalidatePath } from "next/cache";

export async function refreshScoringData(leagueID: number, teamID: number) {
  try {
    // Revalidate the current page to trigger a re-render with fresh data
    revalidatePath(`/scoring/${leagueID}/${teamID}`);

    return { success: true };
  } catch (error) {
    console.error("Error refreshing scoring data:", error);
    return { success: false, error: "Failed to refresh data" };
  }
}
