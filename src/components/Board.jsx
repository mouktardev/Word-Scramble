import { h, Component } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { answers, count } from "../store/result";
import { gsap } from "gsap/dist/gsap";
import { allAnagrams, generateWords } from "../functions/anagram";
import Dial from "./Dial";
import Player from "./Player";
import confetti from "../../public/confetti.json";

const Board = ({ slug, next, dictionary }) => {
  const [visible, setVisible] = useState(false);
  const yourAnswer = useStore(answers);
  const yourRecord = useStore(count);
  const words = generateWords(slug);
  const anagrams = allAnagrams(dictionary, words);
  const tl = gsap.timeline();
  let boardLetters = useRef([]);
  let boardHolders = useRef([]);
  const addBoardLetters = (el) => {
    if (el && !boardLetters.current.includes(el)) {
      boardLetters.current.push(el);
    }
  };
  const addBoardHolders = (el) => {
    if (el && !boardHolders.current.includes(el)) {
      boardHolders.current.push(el);
    }
  };
  useEffect(() => {
    if (yourAnswer.length > 0 && yourAnswer.length != anagrams.length) {
      tl.from(
        Array.from(
          boardLetters.current[boardLetters.current.length - 1].children
        ),
        {
          scale: 0,
          autoAlpha: 0,
          stagger: 0.3,
          ease: "power1.inOut",
        }
      );
    } else if (yourAnswer.length == anagrams.length) {
      tl.from(
        Array.from(
          boardLetters.current[boardLetters.current.length - 1].children
        ),
        {
          scale: 0,
          autoAlpha: 0,
          stagger: 0.3,
          ease: "power1.inOut",
        }
      );
      setVisible(true);
    } else {
      tl.from(boardHolders.current, {
        scale: 0,
        autoAlpha: 0,
        stagger: 0.3,
        ease: "power1.inOut",
      });
    }
    console.log(anagrams);
  }, [yourAnswer]);

  return (
    <div className="relative h-screen container mx-auto flex flex-col justify-center items-center p-4">
      <div className=" flex space-x-3 mx-auto p-4">
        <div className="animate-glow animation-delay-300 card text-xl text-white text-center font-poppins font-extrabold uppercase">
          wrong: {yourRecord}
        </div>
        <div className="animate-glow animation-delay-300 card text-xl text-white text-center font-poppins font-extrabold uppercase">
          correct: {yourAnswer.length}
        </div>
      </div>
      {visible && <Player data={confetti} />}
      <div className="flex justify-start items-start mb-7 mx-auto ">
        {anagrams.map((anagram, i) => {
          if (yourAnswer.includes(anagram))
            return (
              <ul className="invisible flex flex-col" ref={addBoardLetters}>
                {[...anagram].map((ana) => (
                  <li className="text-white md:text-2xl sm:text-base font-poppins uppercase font-medium px-4 py-2 m-2 bg-purple-900 rounded-md ">
                    {ana}
                  </li>
                ))}
              </ul>
            );
          else
            return (
              <ul className="invisible flex flex-col" ref={addBoardHolders}>
                {[...anagram].map((ana) => (
                  <li className="md:p-6 sm:p-5 m-2 bg-slate-300 drop-shadow-lg rounded-md "></li>
                ))}
              </ul>
            );
        })}
      </div>
      {visible ? (
        <div className="flex flex-col justify-center items-center">
          <h1 className="animate-glow animation-delay-300 card text-5xl text-white text-center font-poppins font-extrabold uppercase">
            you win
          </h1>
          {next != "undefined" && (
            <a
              href={`/level/${next}`}
              className="font-poppins font-bold uppercase  text-fuchsia-900 mx-auto text-2xl py-2 px-10 mt-10 drop-shadow-lg border-2 border-purple-900 bg-fuchsia-300 active:bg-fuchsia-600 rounded-lg"
            >
              go to next level
            </a>
          )}
        </div>
      ) : (
        <Dial letters={slug} anagrams={anagrams} />
      )}
    </div>
  );
};

export default Board;
