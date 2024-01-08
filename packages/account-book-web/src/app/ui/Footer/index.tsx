"use client";

import Image from "next/image";
import {
  useSelectedLayoutSegment,
  useSelectedLayoutSegments,
} from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const iconMap = {
  home: <Image src="/images/home.svg" alt="home" width={32} height={32} />,
  activeHome: (
    <Image
      src="/images/activeHome.svg"
      alt="activeHome"
      width={32}
      height={32}
    />
  ),
  statistics: (
    <Image src="/images/graph.svg" alt="statistics" width={32} height={32} />
  ),
  activeStatistics: (
    <Image
      src="/images/activeGraph.svg"
      alt="activeStatistics"
      width={32}
      height={32}
    />
  ),
  calendar: (
    <Image src="/images/calendar.svg" alt="calendar" width={32} height={32} />
  ),
  activeCalendar: (
    <Image
      src="/images/activeCalendar.svg"
      alt="activeCalendar"
      width={32}
      height={32}
    />
  ),
  profile: (
    <Image src="/images/profile.svg" alt="profile" width={32} height={32} />
  ),
  activeProfile: (
    <Image
      src="/images/activeProfile.svg"
      alt="activeProfile"
      width={32}
      height={32}
    />
  ),
  plusCircle: (
    <Image
      src="/images/plusCircle.svg"
      alt="plusCircle"
      width={50}
      height={50}
    />
  ),
};

function Footer() {
  const segment = useSelectedLayoutSegment();
  const segments = useSelectedLayoutSegments();

  return (
    <footer className="fixed bottom-0 left-0 w-full h-16 bg-background border-t border-gray-1 flex justify-around items-center">
      <Link href={`/${segment}/home`}>
        <div className="flex flex-col items-center">
          {segments.includes("home") ? iconMap.activeHome : iconMap.home}
          <span
            className={clsx(`text-[10px]`, {
              "text-gray-2": segment !== "home",
            })}
          >
            ホーム
          </span>
        </div>
      </Link>
      <Link href={`/${segment}/statistics`}>
        <div className="flex flex-col items-center">
          {segments.includes("statistics")
            ? iconMap.activeStatistics
            : iconMap.statistics}
          <span
            className={clsx(`text-[10px]`, {
              "text-gray-2": segment !== "statistics",
            })}
          >
            統計
          </span>
        </div>
      </Link>
      <Link href={`/${segment}/writeAccountBook`}>
        <div className="flex flex-col items-center">{iconMap.plusCircle}</div>
      </Link>
      <Link href={`/${segment}/calendar`}>
        <div className="flex flex-col items-center">
          {segments.includes("calendar")
            ? iconMap.activeCalendar
            : iconMap.calendar}
          <span
            className={clsx(`text-[10px]`, {
              "text-gray-2": segment !== "calendar",
            })}
          >
            カレンダー
          </span>
        </div>
      </Link>
      <Link href={`/${segment}/profile`}>
        <div className="flex flex-col items-center">
          {segments.includes("profile")
            ? iconMap.activeProfile
            : iconMap.profile}
          <span
            className={clsx(`text-[10px]`, {
              "text-gray-2": segment !== "profile",
            })}
          >
            MY
          </span>
        </div>
      </Link>
    </footer>
  );
}

export default Footer;
