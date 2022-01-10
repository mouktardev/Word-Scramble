import { h, Component } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";

const WelcomeScreen = ({ levels }) => {
  const word = "words";
  useEffect(() => {}, []);

  return (
    <div className="relative container flex flex-col mx-auto p-4">
      <div className="h-screen flex flex-col justify-center items-center p-4">
        <div className="flex">
          <div className="animate-glow animation-delay-300 card text-5xl text-white text-center font-poppins font-extrabold uppercase">
            word
          </div>
          <div className="ml-3 text-5xl text-fuchsia-400 text-center font-poppins font-extrabold uppercase">
            game
          </div>
        </div>
        {levels.map((level, i) => (
          <a
            href={`/level/${level}`}
            className="font-poppins font-bold uppercase text-purple-900 mx-auto text-3xl py-2 px-10 mt-10 rounded-full border-4 border-purple-900 drop-shadow-xl bg-purple-200"
          >
            level {i}
          </a>
        ))}
      </div>
    </div>
  );
};

export default WelcomeScreen;
