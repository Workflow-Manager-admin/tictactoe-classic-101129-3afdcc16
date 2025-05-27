import dynamic from "next/dynamic";

// Lazy load the TicTacToeClassicContainer so it's client-only and SSR safe
const TicTacToeClassicContainer = dynamic(
  () => import("./tictactoe-classic"), { ssr: false }
);

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#f9f9f9]">
      <h1
        className="text-3xl sm:text-4xl font-bold mb-6 mt-8"
        style={{ color: "#ff00d0", textShadow: "0 2px 10px #dcf41f33" }}
      >
        TicTacToe Classic
      </h1>
      <TicTacToeClassicContainer />
      <footer className="mt-10 pt-4 pb-6 w-full flex flex-col items-center">
        <small className="text-gray-400 font-mono">
          ColorCraft TicTacToe Classic · Powered by Next.js
        </small>
      </footer>
    </div>
  );
}
