import Link from "next/link";

const AppLogo = () => {
  return (
    <Link href="/">
      <svg width="200" height="55" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="white" />
        <path d="M0 30 Q50 50, 100 30 T 200 30 V100 H0 Z" fill="#a3d5f7" />
        <text
          x="50%"
          y="40%"
          fontFamily="Arial, sans-serif"
          fontSize="24"
          fill="black"
          textAnchor="middle"
        >
          Handbook
        </text>
        <text
          x="50%"
          y="70%"
          fontFamily="Arial, sans-serif"
          fontSize="14"
          fill="black"
          textAnchor="middle"
        >
          Freshwater fishes
        </text>
      </svg>
    </Link>
  );
};

export default AppLogo;
