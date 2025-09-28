import React from 'react';
import styled from "styled-components";

/*
Component which makes its children have a fade-in animation from the bottom.
*/

function FadeInSection(props) {
  const [isVisible, setVisible] = React.useState(false);
  const domRef = React.useRef();
  React.useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => setVisible(entry.isIntersecting));
    });
    observer.observe(domRef.current);
  }, []);
  return (
    <FadeIn $isVisible={isVisible} ref={domRef} >
      {props.children}
    </FadeIn>
  );
}

const FadeIn = styled.div`
    opacity: ${(props) => (props.$isVisible ? "1" : "0")};
    transform: ${(props) => (props.$isVisible ? "none" : "translateY(20vh)")};
    visibility: ${(props) => (props.$isVisible ? "visible" : "hidden")};
    transition: opacity 1200ms ease-out, transform 600ms ease-out, visibility 1200ms ease-out;
    will-change: opacity, transform, visibility;
    `;

export default FadeInSection;