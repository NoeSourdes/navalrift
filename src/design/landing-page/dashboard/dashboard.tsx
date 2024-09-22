import Safari from "@/app/components/ui/Safari";

export const Dashboard = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="relative w-full rounded-2xl p-2 bg-blue-900 max-w-5xl">
        <Safari
          url="navailrift.vercel.app"
          className="size-full"
          src="/img/app.png"
        />
      </div>
    </div>
  );
};
