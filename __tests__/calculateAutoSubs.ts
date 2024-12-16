import { PlayerPick } from "@/app/models/playerPick";
import { ElementType } from "@/app/models/playerData";
import { calculateAutoSubs } from "@/app/apiHelpers/calculateAutoSubs";

export const mockFullTeam: PlayerPick[] = [
  // Starting XI
  {
    id: 1,
    element: 101,
    position: 1, // Goalkeeper
    multiplier: 1,
    isSub: false,
    points: 6,
    name: "Starting GK",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Goalkeeper,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 2,
    element: 102,
    position: 2, // Defender
    multiplier: 1,
    isSub: false,
    points: 8,
    name: "Defender 1",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 3,
    element: 103,
    position: 3, // Defender
    multiplier: 1,
    isSub: false,
    points: 5,
    name: "Defender 2",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 4,
    element: 104,
    position: 4, // Defender
    multiplier: 1,
    isSub: false,
    points: 7,
    name: "Defender 3",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 5,
    element: 105,
    position: 5, // Midfielder
    multiplier: 1,
    isSub: false,
    points: 9,
    name: "Midfielder 1",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Midfielder,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 6,
    element: 106,
    position: 6, // Midfielder
    multiplier: 1,
    isSub: false,
    points: 4,
    name: "Midfielder 2",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Midfielder,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 7,
    element: 107,
    position: 7, // Midfielder
    multiplier: 1,
    isSub: false,
    points: 2,
    name: "Midfielder 3",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Midfielder,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 8,
    element: 108,
    position: 8, // Forward
    multiplier: 1,
    isSub: false,
    points: 5,
    name: "Forward 1",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Forward,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 9,
    element: 109,
    position: 9, // Forward
    multiplier: 1,
    isSub: false,
    points: 7,
    name: "Forward 2",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Forward,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 10,
    element: 110,
    position: 10, // Forward
    multiplier: 1,
    isSub: false,
    points: 6,
    name: "Forward 3",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Forward,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 11,
    element: 111,
    position: 11, // Midfielder
    multiplier: 1,
    isSub: false,
    points: 3,
    name: "Midfielder 4",
    hasPlayed: true,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Midfielder,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  // Bench players
  {
    id: 12,
    element: 112,
    position: 12, // Substitute GK
    multiplier: 0,
    isSub: true,
    points: 0,
    name: "Bench GK",
    hasPlayed: false,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Goalkeeper,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 13,
    element: 113,
    position: 13, // Substitute Defender
    multiplier: 0,
    isSub: true,
    points: 0,
    name: "Bench Defender",
    hasPlayed: false,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Defender,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 14,
    element: 114,
    position: 14, // Substitute Midfielder
    multiplier: 0,
    isSub: true,
    points: 0,
    name: "Bench Midfielder",
    hasPlayed: false,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Midfielder,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
  {
    id: 15,
    element: 115,
    position: 15, // Substitute Forward
    multiplier: 0,
    isSub: true,
    points: 0,
    name: "Bench Forward",
    hasPlayed: false,
    willBeAutosubbed: false,
    wasSubbedOn: false,
    yellowCarded: false,
    redCarded: false,
    fieldPosition: ElementType.Forward,
    isInjured: false,
    gameStatus: { isFinished: true, isInProgress: false },
  },
];

describe("Team substitution tests", () => {
  it("Substitutes a Defender when Defenders = 3 and Defender is unavailable", () => {
    const startingTeam: PlayerPick[] = JSON.parse(JSON.stringify(mockFullTeam));

    // Simulate unavailable defender
    startingTeam[2].hasPlayed = false; // Defender 2 hasn't played
    startingTeam[2].isInjured = true; // Defender 2 is injured

    //set this bench player to a mid for test purpose
    startingTeam[12].hasPlayed = true;
    startingTeam[12].isInjured = false;
    startingTeam[12].fieldPosition = ElementType.Midfielder;

    //set this bench player to a def for test purpose
    startingTeam[13].hasPlayed = true;
    startingTeam[13].isInjured = false;
    startingTeam[13].fieldPosition = ElementType.Defender;

    // Apply substitution logic
    const updatedTeam = calculateAutoSubs(startingTeam);

    // Validate the results
    const injuredDefender = updatedTeam.find((p) => p.id === 3); // Original Defender 2
    const subDefender = updatedTeam.find((p) => p.id === 14); // Substituted Defender

    // Original injured defender should have been substituted
    expect(injuredDefender?.position).toBeGreaterThan(11); // Moved to bench
    expect(subDefender?.position).toBe(3); // Moved to starting XI

    // Confirm substitution occurred
    expect(injuredDefender?.willBeAutosubbed).toBe(true);
    expect(subDefender?.willBeAutosubbed).toBe(true);
  });

  it("Substitutes a Goalkeeper for a Goalkeeper and no other player", () => {
    const startingTeam: PlayerPick[] = JSON.parse(JSON.stringify(mockFullTeam));

    startingTeam[0].hasPlayed = false;
    startingTeam[0].isInjured = true;

    startingTeam[11].hasPlayed = true;
    startingTeam[11].isInjured = false;

    const updatedTeam = calculateAutoSubs(startingTeam);

    const injuredGK = updatedTeam.find((p) => p.id === 1);
    const subGK = updatedTeam.find((p) => p.id === 12);

    // Original injured defender should have been substituted
    expect(injuredGK?.position).toBeGreaterThan(11); // Moved to bench
    expect(subGK?.position).toBe(1); // Moved to starting XI

    // Confirm substitution occurred
    expect(injuredGK?.willBeAutosubbed).toBe(true);
    expect(subGK?.willBeAutosubbed).toBe(true);
  });

  it("It doesn't substitute a Goalkeeper for a Goalkeeper when bench GK is injured or didn't play", () => {
    const startingTeam: PlayerPick[] = JSON.parse(JSON.stringify(mockFullTeam));

    //start keeper injured
    startingTeam[0].hasPlayed = false;
    startingTeam[0].isInjured = true;

    //bench keeper injured
    startingTeam[11].hasPlayed = false;
    startingTeam[11].isInjured = true;

    // Apply substitution logic
    const updatedTeam = calculateAutoSubs(startingTeam);

    // Validate no substitution occurred
    const injuredGK = updatedTeam.find((p) => p.id === 1);
    const benchGK = updatedTeam.find((p) => p.id === 12);

    expect(injuredGK?.position).toBe(1); // Starting GK remains in position
    expect(benchGK?.position).toBe(12); // Bench GK remains on the bench

    // Confirm no substitution flags were triggered
    expect(injuredGK?.willBeAutosubbed).toBe(false);
    expect(benchGK?.willBeAutosubbed).toBe(false);
  });

  it("Substitutes a Forward when Forwards = 1 and Forward is unavailable", () => {
    const startingTeam: PlayerPick[] = JSON.parse(JSON.stringify(mockFullTeam));

    // Simulate unavailable forward
    startingTeam[7].hasPlayed = false; // Forward 1 hasn't played
    startingTeam[7].isInjured = true; // Forward 1 is injured

    // Ensure the bench Forward is available
    startingTeam[14].hasPlayed = true;
    startingTeam[14].isInjured = false;

    // Apply substitution logic
    const updatedTeam = calculateAutoSubs(startingTeam);

    // Validate the results
    const injuredForward = updatedTeam.find((p) => p.id === 8); // Original Forward 1
    const subForward = updatedTeam.find((p) => p.id === 15); // Substituted Forward

    // Original injured forward should have been substituted
    expect(injuredForward?.position).toBeGreaterThan(11); // Moved to bench
    expect(subForward?.position).toBe(8); // Moved to starting XI

    // Confirm substitution occurred
    expect(injuredForward?.willBeAutosubbed).toBe(true);
    expect(subForward?.willBeAutosubbed).toBe(true); // Sub itself is not substituted
  });

  it("Substitutes the first available player off the bench when anyone is injured", () => {
    const startingTeam: PlayerPick[] = JSON.parse(JSON.stringify(mockFullTeam));

    // Simulate unavailable forward
    startingTeam[7].hasPlayed = false; // Forward 1 hasn't played
    startingTeam[7].isInjured = true; // Forward 1 is injured

    // Ensure the bench midfielder is available
    startingTeam[13].hasPlayed = true;
    startingTeam[13].isInjured = false;

    // Ensure the bench Forward is available
    startingTeam[14].hasPlayed = true;
    startingTeam[14].isInjured = false;

    // Apply substitution logic
    const updatedTeam = calculateAutoSubs(startingTeam);

    // Validate the results
    const injuredForward = updatedTeam.find((p) => p.id === 8); // Original Forward 1
    const sub = updatedTeam.find((p) => p.id === 14);

    // Original injured forward should have been substituted
    expect(injuredForward?.position).toBeGreaterThan(11);
    expect(sub?.position).toBe(8);

    // Confirm substitution occurred
    expect(injuredForward?.willBeAutosubbed).toBe(true);
    expect(sub?.willBeAutosubbed).toBe(true);
  });

  it("It doesn't sub a goalkeeper for a midfielder", () => {
    const startingTeam: PlayerPick[] = JSON.parse(JSON.stringify(mockFullTeam));

    // Simulate unavailable forward
    startingTeam[7].hasPlayed = false; // Forward 1 hasn't played
    startingTeam[7].isInjured = true; // Forward 1 is injured

    // Ensure the bench GK is available
    startingTeam[11].hasPlayed = true;
    startingTeam[11].isInjured = false;

    // Ensure the bench Forward is available
    startingTeam[14].hasPlayed = true;
    startingTeam[14].isInjured = false;

    // Apply substitution logic
    const updatedTeam = calculateAutoSubs(startingTeam);

    // Validate the results
    const injuredForward = updatedTeam.find((p) => p.id === 8);
    const subGK = updatedTeam.find((p) => p.id === 12);
    const subForward = updatedTeam.find((p) => p.id === 15);

    // Original injured forward should have been substituted
    expect(injuredForward?.position).toBeGreaterThan(11);
    expect(subGK?.position).toBe(12);
    expect(subForward?.position).toBe(8);

    // Confirm substitution occurred
    expect(injuredForward?.willBeAutosubbed).toBe(true);
    expect(subGK?.willBeAutosubbed).toBe(false);
    expect(subForward?.willBeAutosubbed).toBe(true);
  });
});
