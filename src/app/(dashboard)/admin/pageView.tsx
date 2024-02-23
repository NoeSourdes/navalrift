import { auth } from "@/lib/auth";
import { SideBar } from "./components/sideBar";

export const PageView = async () => {
  const session = await auth();
  return (
    <div className="h-screen flex items-center p-3 bg-gradient-to-b from-[#0A0913] to-[#004493]">
      {/* <div className="w-full absolute inset-0 h-full z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={100}
          className="w-full h-full"
          particleColor="#FFFFFF"
        />
      </div>{" "} */}
      <div className="relative h-full w-[270px] z-20">
        <SideBar session={session} />
      </div>
      <div></div>
    </div>
  );
};
