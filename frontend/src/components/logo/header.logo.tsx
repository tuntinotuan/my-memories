import Image from "next/image";
import Link from "next/link";
import React from "react";

const HeaderLogo = () => {
  return (
    <Link href={"/"}>
      <h1 className="text-signature text-2xl font-bold bg-gradient-to-br from-secondaryColor to-primaryColor  inline-block text-transparent bg-clip-text">
        Canva
      </h1>
    </Link>
  );
};

export default HeaderLogo;
