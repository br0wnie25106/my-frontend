"use client";
import { useEffect } from "react";
import { getGameState } from "@/lib/api";

export default function Home() {
  useEffect(() => {
    getGameState().then(console.log).catch(console.error);
  }, []);

  return <h1>Testing fetch...</h1>;
}
