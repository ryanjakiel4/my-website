import Typewriter from "typewriter-effect";

/*
Eye-catching typing animation
https://www.npmjs.com/package/typewriter-effect
*/

function Autotype() {
  return (
    <Typewriter
      options={{
        strings: [
          "Welcome!",
          "Thanks for coming to my website!",
          "God bless you!"
        ],
        autoStart: true,
        loop: true,
        deleteSpeed: 50,
      }}
    />
  );
}

export default Autotype;