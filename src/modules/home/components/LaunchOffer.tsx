"use client";

import { useRouter } from "next/navigation";
import { useHome } from "../hooks/useHome";

const formatDate = (date?: string): string => {
  if (!date) {
    return "";
  }

  const value = new Date(`${date}T00:00:00`);

  if (Number.isNaN(value.getTime())) {
    return date;
  }

  return value.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const isExternalUrl = (url: string): boolean => {
  try {
    const parsedUrl = new URL(url);
    return parsedUrl.protocol === "http:" || parsedUrl.protocol === "https:";
  } catch {
    return false;
  }
};

export default function LaunchOffer() {
  const router = useRouter();
  const { homepage, loading } = useHome();

  const launchOffer = homepage?.launchOffer;

  const handleOfferClick = () => {
    const url = launchOffer?.buttonUrl?.trim();

    if (!url) {
      return;
    }

    if (isExternalUrl(url)) {
      window.location.assign(url);
      return;
    }

    router.push(url.startsWith("/") ? url : `/${url}`);
  };

  if (loading || !launchOffer) {
    return null;
  }

  return (
    <section className="w-full bg-[#3674d9] px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-5xl text-center">
        {launchOffer.title && (
          <h2 className="text-2xl font-bold tracking-tight text-white md:text-[30px]">
            {launchOffer.title}
          </h2>
        )}

        {launchOffer.subtitle && (
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-6 text-white/90 md:text-[14px]">
            {launchOffer.subtitle}
          </p>
        )}

        <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
          {launchOffer.buttonText && launchOffer.buttonUrl && (
            <button
              type="button"
              onClick={handleOfferClick}
              className="h-11 rounded-lg bg-white px-5 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-100"
            >
              {launchOffer.buttonText}
            </button>
          )}

          {(launchOffer.expiryDate || launchOffer.seats) && (
            <div className="text-left text-xs leading-5 text-white">
              {launchOffer.expiryDate && (
                <p className="font-semibold">
                  Offer ends {formatDate(launchOffer.expiryDate)}
                </p>
              )}

              {launchOffer.seats && (
                <p className="text-white/80">{launchOffer.seats}</p>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
