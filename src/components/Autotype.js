import Typewriter from "typewriter-effect";

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