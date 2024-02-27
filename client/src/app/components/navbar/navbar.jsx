"use client";
import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <div>
      <Link href="/home">Home</Link>
      <Link href="/history">Historial</Link>
    </div>
  );
};

export default Navbar;
