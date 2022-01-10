import { h, Fragment } from "preact";
import { useRef, useEffect } from "preact/hooks";
import { gsap } from "gsap/dist/gsap";
import lottie from "lottie-web";

function Player({ data, size }) {
  let ref = useRef(null);
  let word = useRef(null);

  useEffect(() => {
    lottie.loadAnimation({
      container: ref,
      animationData: data,
      loop: true,
      autoplay: true,
    });
  }, []);

  return (
    <div
      class={`absolute z-10 w-full h-full top-0 pointer-events-none ${size}`}
    >
      <div
        class="h-full text-white object-contain"
        ref={(el) => (ref = el)}
      ></div>
    </div>
  );
}

export default Player;
