"use client";

import Image from "next/image";
import { useState } from "react";

export const Ambilight = () => {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="ambilight-image"
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      {" "}
      <div className="imgcon">
        <Image
          src="/img/mon-profile.png"
          className={`rounded-full ${
            hover ? "grayscale-0" : "grayscale"
          } transition-all`}
          alt="Photo de profile"
          width={500}
          height={333}
        />
      </div>
      <Image
        src="/img/mon-profile.png"
        alt="profile ambilight"
        className={`light rounded-full ${
          hover ? "grayscale-0" : "grayscale"
        } transition-all blur-[20px]`}
        width={500}
        height={333}
      />
    </div>
  );
};
