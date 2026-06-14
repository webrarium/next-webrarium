import type { Metadata } from "next";
import Game from "./Game";
import "./game-globals.css";

export const metadata: Metadata = {
  title: "Webrarium Game 🎮 — Таблиця рекордів",
  description: "Зіграй у Pac-Man від Webrarium і потрап у таблицю рекордів. Найкращі гравці отримують бонус!",
  robots: { index: false },
};

export default function GamePage() {
  return (
    <main>
      <Game />
    </main>
  );
}
