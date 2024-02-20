import Image from "next/image";

export const Dashboard = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full rounded-3xl p-2 bg-blue-900 max-w-5xl">
        <div className="absolute w-full lg:h-96 md:h-52 h-20  top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-blue-500 to-blue-800 z-10 blur-[100px]"></div>
        <Image
          className="relative rounded-2xl z-20"
          src="/svg/app.svg"
          alt="Dashboard"
          height={600}
          width={1024}
        />
      </div>
    </div>
  );
};
