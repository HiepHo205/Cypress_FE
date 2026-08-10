"use client";

interface LoadingProps {
  show?: boolean;
  message?: string;
  fullScreen?: boolean;
}

export default function Loading({
  show = false,
  message = "Loading...",
  fullScreen = true,
}: LoadingProps) {
  if (!show) return null;

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
        <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-xl">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

          <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center rounded-2xl bg-white/70 backdrop-blur-sm">
      <div className="flex flex-col items-center rounded-2xl bg-white px-8 py-6 shadow-xl">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />

        <p className="mt-4 text-sm font-medium text-gray-700">{message}</p>
      </div>
    </div>
  );
}
