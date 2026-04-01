'use client';

export default function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-4">

        {/* Spinner */}
        <div className="w-10 h-10 border-4 border-gray-300 border-t-black rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-gray-600 text-sm">Loading, please wait...</p>

      </div>
    </div>
  );
}