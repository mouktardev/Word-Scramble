import { h, Component } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { count, answers, setAnswers } from "../store/result";
import { gsap } from "gsap/dist/gsap";
import Checkbox from "./CheckBox";

const Dial = ({ letters, anagrams }) => {
  const [isCheck, setIsCheck] = useState([]);
  const yourAnswer = useStore(answers);
  const tl = gsap.timeline();
  let wrapper = useRef(null);
  let dialButtons = useRef([]);
  const addDialButtons = (el) => {
    if (el && !dialButtons.current.includes(el)) {
      dialButtons.current.push(el);
    }
  };

  const handleCheckBoxClick = (e) => {
    const { id, name, checked } = e.target;
    setIsCheck([...isCheck, { id: parseInt(id), value: name }]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item.id !== parseInt(id)));
    }
  };

  const submitAnswer = () => {
    let solution = isCheck.map((item) => item.value).join("");
    if (anagrams.includes(solution) && !yourAnswer.includes(solution)) {
      console.log("correct");
      setAnswers(solution);
      setIsCheck([]);
    } else {
      console.log("wrong");
      count.set(count.get() + 1);
      setIsCheck([]);
    }
  };
  //   useEffect(() =8 {
  //     console.log(isCheck, yourAnswer);
  //   }, [isCheck]);

  useEffect(() => {
    let radius = 80,
      angle = 0,
      step = (2 * Math.PI) / dialButtons.current.length;

    dialButtons.current.forEach((btn, i) => {
      tl.to(btn, {
        autoAlpha: 1,
        x: Math.round(
          wrapper.offsetWidth / 2.1 +
            radius * Math.cos(angle) -
            btn.offsetWidth / 2
        ),
        y: Math.round(
          wrapper.offsetHeight / 2.1 +
            radius * Math.sin(angle) -
            btn.offsetWidth / 2
        ),
        duration: 0.3,
        ease: "power1.inOut",
      });
      angle += step;
    });
    tl.to(wrapper, {
      rotation: 360,
      duration: 1,
      ease: "elastic.inOut(0.5, 0.5)",
    });
  }, []);

  return (
    <>
      <ul
        className="relative w-72 h-72 rounded-full mx-auto overflow-hidden border-8 border-purple-900 drop-shadow-xl bg-purple-400"
        ref={(el) => (wrapper = el)}
      >
        {[...letters].map((letter, i) => (
          <li
            className=" invisible absolute flex justify-center items-center w-[80px] h-[80px] border-4 border-purple-900 drop-shadow-xl bg-purple-200 rounded-full"
            ref={addDialButtons}
          >
            <Checkbox
              id={i}
              type="checkbox"
              name={letter}
              label={letter}
              handleClick={handleCheckBoxClick}
              isChecked={isCheck.some((item) => item.id == i)}
            />
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="font-poppins font-bold uppercase  text-fuchsia-900 mx-auto text-4xl py-2 px-10 mt-10 drop-shadow-lg border-2 border-purple-900 bg-fuchsia-300 active:bg-fuchsia-600 rounded-lg"
        onClick={() => submitAnswer()}
      >
        Play
      </button>
    </>
  );
};

export default Dial;
