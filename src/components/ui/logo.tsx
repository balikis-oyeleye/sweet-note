import Image from "next/image";
import Link from "next/link";
import React from "react";

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/assets/logo.svg" height={36} width={150} alt="logo" />
    </Link>
  );
};

export default Logo;
