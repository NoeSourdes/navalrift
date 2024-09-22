"use client";

import TableDemineur from "./components/TableDemineur";

export default function Page() {
  return (
    <div className="h-full w-full flex flex-col lg:gap-6 gap-3">
      <div className="relative h-full w-full bg-blue-800/75 rounded-xl flex max-md:flex-col items-center lg:justify-center lg:gap-6 gap-3 lg:p-6 p-3 overflow-y-scroll">
        <div className="h-full w-full bg-blue-900  bg-dot-[#0070EF] relative rounded-lg overflow-hidden cursor-pointer z-10 min-h-[300px]">
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-blue-900 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
          <div className="relative p-5 h-full z-40">
            <div className="bg-blue-800/50 h-full rounded-md p-3 relative">
              <TableDemineur />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
