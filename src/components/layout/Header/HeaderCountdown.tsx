"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface Props {
  targetDate?: string | null;
  enabled?: boolean;
  faviconUrl?: string | null;
}

export default function HeaderCountdown({
  targetDate,
  enabled = true,
  faviconUrl,
}: Props) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    if (!targetDate || !enabled) {
      return;
    }
    const startDate = new Date(targetDate.replace(" ", "T"));

    if (isNaN(startDate.getTime())) {
      return;
    }
    const endOfYear = new Date(startDate.getFullYear(), 11, 31, 23, 59, 59);

    const updateCountdown = () => {
      const now = new Date();

      let diff = endOfYear.getTime() - now.getTime();

      if (diff < 0) {
        diff = 0;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));

      diff %= 1000 * 60 * 60 * 24;

      const hours = Math.floor(diff / (1000 * 60 * 60));

      diff %= 1000 * 60 * 60;

      const minutes = Math.floor(diff / (1000 * 60));

      diff %= 1000 * 60;

      const seconds = Math.floor(diff / 1000);

      setCountdown({
        days,
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    updateCountdown();

    const timer = setInterval(updateCountdown, 1000);

    return () => {
      clearInterval(timer);
    };
  }, [targetDate, enabled]);

  if (!enabled || !targetDate) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-gray-700">
      {faviconUrl ? (
        <Image
          src={faviconUrl}
          alt="Cypress"
          width={40}
          height={40}
          className="h-6 w-6 object-contain"
        />
      ) : null}

      <span className="whitespace-nowrap text-sm font-medium">
        {countdown.days} d : {countdown.hours} h : {countdown.minutes} m :{" "}
        {countdown.seconds} s
      </span>
    </div>
  );
}
