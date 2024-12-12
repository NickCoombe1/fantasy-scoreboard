"use client";
import { ReactNode } from "react";
import ThemeToggle from "@/app/components/utility/themeToggle";
import Link from "next/link";
import { useParams, useRouter, usePathname } from "next/navigation";
import StyledButton from "./styledButton";
import About from "../svgs/about";
import Menu from "../svgs/menu";
import Logo from "@/app/components/svgs/logo";
import { useTheme } from "@/app/hooks/getTheme";

export default function Header(): ReactNode {
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();
  const teamID = params?.teamID;
  const { theme } = useTheme();

  //make the mob background transparent if the path is not /scoring as we have a header component that handles it for us
  const backgroundTransparent = !pathname.startsWith("/scoring/");
  const handleBackClick = () => {
    if (teamID) router.push(`/team/${teamID}`);
    else {
      router.back();
    }
  };
  return (
    <header className={"md:sticky md:top-0 md:z-10"}>
      <div className="w-full h-20 px-10 py-6 justify-between items-center hidden md:flex">
        <div className="w-[104px] h-[25.36px] relative">
          {" "}
          <div onClick={handleBackClick}>
            <Logo mode={theme} />
          </div>
        </div>
        <div className="justify-start items-center gap-2 flex">
          {teamID && (
            <Link href={teamID ? `/team/${teamID}` : `/welcome`}>
              <StyledButton label="MY LEAGUES" secondary={true} type="button">
                My Leagues
              </StyledButton>
            </Link>
          )}
          <Link href="/about">
            <StyledButton label="ABOUT" secondary={true} type={"button"}>
              About
            </StyledButton>
          </Link>
          <ThemeToggle />
        </div>
      </div>
      <div
        className={`md:hidden ${
          backgroundTransparent
            ? "bg-transparent"
            : "bg-black/5 dark:bg-black/20"
        }`}
      >
        <div className="w-full h-20 p-6 justify-between items-center inline-flex align-middle">
          <ThemeToggle />
          <div onClick={handleBackClick}>
            <Logo mode={theme} />
          </div>
          <div className="justify-start items-center gap-1 flex">
            <div className="w-[35px] h-[35px] px-3.5 py-3 bg-button-light-bg-20  bg-button-light-secondary dark:bg-button-dark-bg bg-blend-overlay  rounded justify-center items-center gap-2.5 flex">
              <div className="w-5 h-5 relative">
                <Link href="/about">
                  <About mode={theme} />
                </Link>
              </div>
            </div>
            <div className="w-[35px] h-[35px] px-3.5 py-3 bg-button-light-bg-20  bg-button-light-secondary dark:bg-button-dark-bg bg-blend-overlay  rounded flex-col justify-center items-center gap-[5px] inline-flex">
              {" "}
              <div className="w-5 h-5 relative flex justify-center items-center">
                <Menu mode={theme} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
