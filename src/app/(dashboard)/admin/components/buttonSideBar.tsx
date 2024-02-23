import { useState } from "react";

interface buttonSideBarProps {
  logo: React.ComponentType;
  title: string;
}

export const ButtonSideBar: React.FC<buttonSideBarProps> = ({
  logo,
  title,
}) => {
  const [hover, setHover] = useState(false);
  const Logo = logo;
  return (
    <div
      onMouseOver={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="w-full flex items-center justify-start cursor-pointer hover:bg-[#1A1F37] rounded-xl transition-all"
    >
      <div className="pl-3 py-2 flex items-center gap-3">
        <div
          className={`p-2 rounded-xl transition-colors ${
            hover ? "text-base bg-primary" : "text-primary bg-[#1A1F37]"
          }`}
        >
          <Logo />
        </div>
        <div>
          <h3 className="text-base">{title}</h3>
        </div>
      </div>
    </div>
  );
};
