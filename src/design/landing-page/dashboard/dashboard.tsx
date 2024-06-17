import Image from "next/image";

export const Dashboard = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full rounded-3xl p-2 bg-blue-900 max-w-5xl">
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
