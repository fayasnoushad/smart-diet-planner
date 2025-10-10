import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[25vh] flex flex-col justify-center items-center">
      <span className="loading loading-spinner loading-xl mb-5"></span>
      <br />
      <span className="font-semibold text-xl">Analyzing....</span>
    </div>
  );
}
