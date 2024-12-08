import React from "react";

interface IconProps {
  mode: string;
  width?: number;
  height?: number;
}

const About: React.FC<IconProps> = ({ mode, width, height }) => {
  return (
    <svg
      width={`${width ? width : 21}`}
      height={`${height ? height : 20}`}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.5 17.5C14.6421 17.5 18 14.1421 18 10C18 5.85786 14.6421 2.5 10.5 2.5C6.35786 2.5 3 5.85786 3 10C3 14.1421 6.35786 17.5 10.5 17.5Z"
        stroke={
          mode === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"
        }
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.5 6.6665H10.5089V6.67543H10.5V6.6665Z"
        strokeWidth="2.5"
        strokeLinejoin="round"
        stroke={
          mode === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"
        }
      />
      <path
        d="M10.5 10V13.3333"
        strokeWidth="1.66667"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke={
          mode === "light" ? "rgba(0, 0, 0, 1)" : "rgba(255, 255, 255, 1)"
        }
      />
    </svg>
  );
};

export default About;
