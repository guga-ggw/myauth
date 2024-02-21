'use client'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const navigate = useRouter();

  useEffect(() => {
    navigate.push("/SignUp");
  }, []);

  return (
    <div className="w-full h-full"></div>
  );
}