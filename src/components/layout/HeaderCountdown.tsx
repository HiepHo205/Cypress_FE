"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

interface Props {
  targetDate?: string | null;
  enabled?: boolean;
}

export default function HeaderCountdown({ targetDate, enabled = true }: Props) {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    console.log("targetDate:", targetDate);
    console.log("enabled:", enabled);

    if (!targetDate || !enabled) {
      return;
    }

    const updateCountdown = () => {
      const inputDate = new Date(targetDate.replace(" ", "T"));

      const target = new Date(inputDate.getFullYear(), 11, 31, 23, 59, 59);
      let diff = target.getTime() - inputDate.getTime();
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

    return () => clearInterval(timer);
  }, [targetDate, enabled]);

  if (!enabled || !targetDate) {
    return null;
  }

  return (
    <div className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-gray-700">
      <Zap className="h-4 w-4 text-blue-500" />

      <span className="text-sm font-medium whitespace-nowrap">
        {countdown.days} d : {countdown.hours} h : {countdown.minutes} m :{" "}
        {countdown.seconds} s
      </span>
    </div>
  );
}
