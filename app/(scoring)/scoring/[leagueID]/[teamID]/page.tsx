"use client";

import React, { useEffect, useState } from "react";
import { LeagueData } from "@/app/models/league";
import { GameStatusData } from "@/app/models/game";
import { ScoringData } from "@/app/api/fetchScoringData/route";
import {
  fetchGameWeekDetails,
  fetchLeagueData,
  fetchTeamDetails,
} from "@/app/apiHelpers/apiHelpers";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import Scoring from "@/app/components/scoring/page";

export default function ScoringPage({
  params,
}: {
  params: { leagueID: string; teamID: string };
}) {
  const leagueID = Number(params.leagueID);
  const teamID = Number(params.teamID);
  const [gameweekInfo, setGameweekInfo] = useState<GameStatusData | null>(null);
  const [leagueData, setLeagueData] = useState<LeagueData | null>(null);
  const [teamScoringData, setTeamScoringData] = useState<ScoringData | null>(
    null,
  );
  const [loadingTeamData, setLoadingTeamData] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchGameWeekAndLeague = async () => {
      try {
        const gameweekResponse = await fetchGameWeekDetails();
        if (!gameweekResponse) {
          new Error("Failed to load gameweek data");
        }
        setGameweekInfo(gameweekResponse);

        const leagueResponse = await fetchLeagueData(leagueID);
        if (!leagueResponse) {
          new Error("Failed to load league data");
        }
        setLeagueData(leagueResponse);
      } catch (error) {
        console.error("Error fetching gameweek or league data:", error);
        setError("An unexpected error occurred while fetching data.");
      } finally {
      }
    };

    fetchGameWeekAndLeague();
  }, [leagueID]);

  useEffect(() => {
    const fetchTeamScoring = async () => {
      if (!gameweekInfo?.current_event) return;

      try {
        setLoadingTeamData(true);
        const teamResponse = await fetchTeamDetails(
          teamID,
          gameweekInfo.current_event,
        );
        if (!teamResponse) {
          new Error("Failed to load team scoring data");
        }
        setTeamScoringData(teamResponse);
      } catch (error) {
        console.error("Error fetching team scoring data:", error);
        setError(
          "An unexpected error occurred while fetching team scoring data.",
        );
      } finally {
        setLoadingTeamData(false);
      }
    };

    fetchTeamScoring();
  }, [teamID, gameweekInfo]);

  const team = leagueData?.league_entries.find(
    (team) => team.entry_id === teamID,
  );
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className={"min-h-[80vh] flex flex-col items-center"}>
      <TabGroup className={"w-full"}>
        <div className="w-full md:px-1 pt-8 md:pb-1 bg-black/5 dark:bg-black/20 rounded-b-lg shadow backdrop-blur-2xl flex-col justify-start items-center gap-8 inline-flex">
          <div className="text-center dark:text-dark-90 text-light-90 text-[1.625rem] font-semibold leading-normal">
            Hawcey Gang
          </div>
          <TabList className="w-full justify-evenly items-center gap-3.5 md:gap-2 inline-flex h-[41px]">
            <Tab className="md:h-3.5 px-4 py-3.5 data-[selected]:bg-white data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay  rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
                scoring
              </div>
            </Tab>
            <Tab className="md:h-3.5 px-4 py-3.5 data-[selected]:bg-white  data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay  rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
                Matchup
              </div>
            </Tab>
            <Tab className="md:h-3.5 px-4 py-3.5 data-[selected]:bg-white data-[selected]:dark:bg-button-dark-bg data-[selected]:dark:bg-button-dark-secondary data-[selected]:bg-blend-overlay  rounded justify-center items-center gap-2.5 inline-flex">
              <div className="text-center text-light-default dark:text-dark-default text-sm font-roobertMono uppercase leading-3 tracking-tight">
                League Scoring
              </div>
            </Tab>
          </TabList>{" "}
        </div>
        <TabPanels className={"w-full"}>
          <TabPanel>
            <Scoring />
          </TabPanel>
          <TabPanel>Content 2</TabPanel>
          <TabPanel>Content 3</TabPanel>
        </TabPanels>
      </TabGroup>
    </div>
  );
}
