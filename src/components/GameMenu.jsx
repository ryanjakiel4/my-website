import styled from "styled-components";
import { Link } from "react-router-dom";
/*
Menu for photo links and text to each game
*/

function GameMenu() {
  return (
    <GamesList.Items>
      <GamesList.Item>
        <Link to={"/FiftyStates"}>
          <GamesList.Image src="/resources/usa.jpg" />
          <GamesList.Title>
            Can you name all 50 states?
          </GamesList.Title>
        </Link>
      </GamesList.Item>
      <GamesList.Item>
        <Link to={"/RollCall"}>
          <GamesList.Image src="/resources/dice.svg" />
          <GamesList.Title>
            Play Roll Call
          </GamesList.Title>
        </Link>
      </GamesList.Item>
    </GamesList.Items>
  );
}

const GamesList = {
  Items: styled.ul`
      list-style: none;
      padding-top: 20px;
      font-size: 20px;
      display: flex;
      flex-wrap: wrap;
    `,
  Item: styled.li`
      padding: 0 1rem;
      flex: 1;
    `,
  Image: styled.img`
  width: 200px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 12px 40px 0 rgba(0, 0, 0, 0.19);
  border-radius: 40px;
  display: block;
  margin-left: auto;
  margin-right: auto;
  
  `,
  Title: styled.div`
  padding-top: 5px;
  text-align: center;
  `
};

export default GameMenu;