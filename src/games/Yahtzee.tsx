import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Types for the game
interface Dice {
  value: number;
  kept: boolean;
}

interface ScoreCategory {
  name: string;
  score: number | null;
  description: string;
}

// Daily seed generator - creates a new seed each day
const getDailySeed = (): number => {
  const today = new Date();
  const dateString = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    const char = dateString.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return Math.abs(hash);
};

// Seeded random number generator
class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }
}

const Yahtzee: React.FC = () => {
  const [dice, setDice] = useState<Dice[]>([
    { value: 0, kept: false },
    { value: 0, kept: false },
    { value: 0, kept: false },
    { value: 0, kept: false },
    { value: 0, kept: false }
  ]);
  const [rollsLeft, setRollsLeft] = useState(3);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [randomGenerator, setRandomGenerator] = useState<SeededRandom | null>(null);
  const [totalScore, setTotalScore] = useState(0);
  const [yahtzeeBonus, setYahtzeeBonus] = useState(0);
  const [scoreSelected, setScoreSelected] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const [scoreCategories, setScoreCategories] = useState<ScoreCategory[]>([
    { name: 'Ones', score: null, description: 'Sum of all 1s' },
    { name: 'Twos', score: null, description: 'Sum of all 2s' },
    { name: 'Threes', score: null, description: 'Sum of all 3s' },
    { name: 'Fours', score: null, description: 'Sum of all 4s' },
    { name: 'Fives', score: null, description: 'Sum of all 5s' },
    { name: 'Sixes', score: null, description: 'Sum of all 6s' },
    { name: 'Three of a Kind', score: null, description: 'Sum of all dice if 3+ same' },
    { name: 'Four of a Kind', score: null, description: 'Sum of all dice if 4+ same' },
    { name: 'Full House', score: null, description: '25 points if 3 of one, 2 of another' },
    { name: 'Small Straight', score: null, description: '30 points for 4 in a row' },
    { name: 'Large Straight', score: null, description: '40 points for 5 in a row' },
    { name: 'Yahtzee', score: null, description: '50 points for 5 of a kind' },
    { name: 'Chance', score: null, description: 'Sum of all dice' }
  ]);

  // Initialize the game with daily seed
  useEffect(() => {
    const seed = getDailySeed();
    setRandomGenerator(new SeededRandom(seed));
  }, []);

  const startGame = () => {
    setGameStarted(true);
    setRollsLeft(3);
    setCurrentTurn(1);
    setGameOver(false);
    setTotalScore(0);
    setYahtzeeBonus(0);
    setScoreSelected(false);
    setSelectedCategory(null);
    setScoreCategories(prev => prev.map(cat => ({ ...cat, score: null })));
    setDice([
      { value: 0, kept: false },
      { value: 0, kept: false },
      { value: 0, kept: false },
      { value: 0, kept: false },
      { value: 0, kept: false }
    ]);
  };

  const rollDice = () => {
    if (!randomGenerator || rollsLeft <= 0) return;

    setDice(prev => prev.map(die => 
      die.kept ? die : { ...die, value: randomGenerator.nextInt(1, 6) }
    ));
    setRollsLeft(prev => prev - 1);
  };

  const toggleKeepDie = (index: number) => {
    if (rollsLeft === 3) return; // Can't keep dice before first roll
    setDice(prev => prev.map((die, i) => 
      i === index ? { ...die, kept: !die.kept } : die
    ));
  };

  const calculateScore = (categoryIndex: number): number => {
    const diceValues = dice.map(d => d.value);
    const isYahtzee = diceValues.every(val => val === diceValues[0]) && diceValues[0] !== 0;
    const yahtzeeAlreadyFilled = scoreCategories[11].score !== null;
    const isBonusYahtzee = isYahtzee && yahtzeeAlreadyFilled;

    switch (categoryIndex) {
      case 0: // Ones
        return diceValues.filter(v => v === 1).reduce((sum, v) => sum + v, 0);
      case 1: // Twos
        return diceValues.filter(v => v === 2).reduce((sum, v) => sum + v, 0);
      case 2: // Threes
        return diceValues.filter(v => v === 3).reduce((sum, v) => sum + v, 0);
      case 3: // Fours
        return diceValues.filter(v => v === 4).reduce((sum, v) => sum + v, 0);
      case 4: // Fives
        return diceValues.filter(v => v === 5).reduce((sum, v) => sum + v, 0);
      case 5: // Sixes
        return diceValues.filter(v => v === 6).reduce((sum, v) => sum + v, 0);
      case 6: // Three of a Kind
        const counts3 = diceValues.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);
        return Object.values(counts3).some(count => count >= 3) ? diceValues.reduce((sum, v) => sum + v, 0) : 0;
      case 7: // Four of a Kind
        const counts4 = diceValues.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);
        return Object.values(counts4).some(count => count >= 4) ? diceValues.reduce((sum, v) => sum + v, 0) : 0;
      case 8: // Full House
        if (isBonusYahtzee) return 25; // Bonus Yahtzee can score full house
        const countsFH = diceValues.reduce((acc, val) => {
          acc[val] = (acc[val] || 0) + 1;
          return acc;
        }, {} as Record<number, number>);
        const values = Object.values(countsFH).sort((a, b) => b - a);
        return (values[0] === 3 && values[1] === 2) ? 25 : 0;
      case 9: // Small Straight
        if (isBonusYahtzee) return 30; // Bonus Yahtzee can score small straight
        const sorted = [...new Set(diceValues)].sort();
        for (let i = 0; i <= sorted.length - 4; i++) {
          if (sorted[i + 3] - sorted[i] === 3) return 30;
        }
        return 0;
      case 10: // Large Straight
        if (isBonusYahtzee) return 40; // Bonus Yahtzee can score large straight
        const sorted2 = [...diceValues].sort();
        const isLargeStraight = sorted2.every((val, i) => i === 0 || val === sorted2[i - 1] + 1);
        return isLargeStraight ? 40 : 0;
      case 11: // Yahtzee
        if (isYahtzee) {
          // If Yahtzee category is already filled, this is a bonus Yahtzee
          if (yahtzeeAlreadyFilled) {
            return 100; // Bonus Yahtzee
          }
          return 50; // First Yahtzee
        }
        return 0;
      case 12: // Chance
        return diceValues.reduce((sum, v) => sum + v, 0);
      default:
        return 0;
    }
  };

  const selectCategory = (categoryIndex: number) => {
    if (scoreCategories[categoryIndex].score !== null) return;

    // If clicking the same category, deselect it
    if (selectedCategory === categoryIndex) {
      setSelectedCategory(null);
      setScoreSelected(false);
      return;
    }

    // Select new category
    setSelectedCategory(categoryIndex);
    setScoreSelected(true);
  };

  const confirmScore = () => {
    if (selectedCategory === null) return;

    const score = calculateScore(selectedCategory);
    const isYahtzee = dice.every(die => die.value === dice[0].value);
    const isYahtzeeCategory = selectedCategory === 11;
    const yahtzeeAlreadyFilled = scoreCategories[11].score !== null;

    // Handle Yahtzee bonus logic
    if (isYahtzee && yahtzeeAlreadyFilled && !isYahtzeeCategory) {
      // This is a bonus Yahtzee - add 100 points to bonus
      setYahtzeeBonus(prev => prev + 100);
    }

    setScoreCategories(prev => prev.map((cat, i) => 
      i === selectedCategory ? { ...cat, score } : cat
    ));

    // Update total score including Yahtzee bonus
    const newTotal = scoreCategories.reduce((sum, cat, i) => 
      sum + (i === selectedCategory ? score : (cat.score || 0)), 0
    ) + yahtzeeBonus + (isYahtzee && yahtzeeAlreadyFilled && !isYahtzeeCategory ? 100 : 0);
    setTotalScore(newTotal);

    // Reset for next turn
    setScoreSelected(false);
    setSelectedCategory(null);

    // Next turn
    if (currentTurn >= 13) {
      setGameOver(true);
    } else {
      setCurrentTurn(prev => prev + 1);
      setRollsLeft(3);
      setDice([
        { value: 0, kept: false },
        { value: 0, kept: false },
        { value: 0, kept: false },
        { value: 0, kept: false },
        { value: 0, kept: false }
      ]);
    }
  };

  const getDiceEmoji = (value: number): string => {
    const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    return diceEmojis[value - 1];
  };

  return (
    <GameSpace.Wrapper>
      <GameSpace.Title>Yahtzee</GameSpace.Title>
      <GameSpace.Info>
        {!gameStarted ? "Roll dice and score points! Each day has the same random sequence for all players." : 
         gameOver ? `Game Over! Final Score: ${totalScore}${yahtzeeBonus > 0 ? ` (${yahtzeeBonus} Yahtzee bonus)` : ''}` :
         `Turn ${currentTurn}/13 - ${rollsLeft} rolls left`}
      </GameSpace.Info>

      {!gameStarted ? (
        <GameSpace.ButtonHolder>
          <GameSpace.StartButton onClick={startGame}>
            Start Game
          </GameSpace.StartButton>
        </GameSpace.ButtonHolder>
      ) : !gameOver ? (
        <>
          <GameSpace.DiceContainer>
            {dice.map((die, index) => (
              <GameSpace.Die
                key={index}
                kept={die.kept}
                onClick={() => toggleKeepDie(index)}
              >
                {getDiceEmoji(die.value)}
              </GameSpace.Die>
            ))}
          </GameSpace.DiceContainer>

          <GameSpace.ButtonHolder>
            {!scoreSelected ? (
              <GameSpace.RollButton 
                onClick={rollDice} 
                disabled={rollsLeft <= 0}
              >
                Roll Dice ({rollsLeft} left)
              </GameSpace.RollButton>
            ) : (
              <>
                <GameSpace.RollButton 
                  onClick={rollDice} 
                  disabled={rollsLeft <= 0}
                >
                  Roll Again ({rollsLeft} left)
                </GameSpace.RollButton>
                <GameSpace.ConfirmButton onClick={confirmScore}>
                  Confirm Score & Next Turn
                </GameSpace.ConfirmButton>
              </>
            )}
          </GameSpace.ButtonHolder>

          <GameSpace.ScoreSection>
            <GameSpace.ScoreTitle>Score Categories</GameSpace.ScoreTitle>
            <GameSpace.ScoreGrid>
              {scoreCategories.map((category, index) => (
                <GameSpace.ScoreItem
                  key={index}
                  used={category.score !== null}
                  selected={selectedCategory === index}
                  onClick={() => selectCategory(index)}
                >
                  <GameSpace.ScoreName>{category.name}</GameSpace.ScoreName>
                  <GameSpace.ScoreValue>
                    {category.score !== null ? category.score : calculateScore(index)}
                  </GameSpace.ScoreValue>
                  <GameSpace.ScoreDescription>{category.description}</GameSpace.ScoreDescription>
                </GameSpace.ScoreItem>
              ))}
            </GameSpace.ScoreGrid>
          </GameSpace.ScoreSection>
        </>
      ) : (
        <GameSpace.ButtonHolder>
          <GameSpace.StartButton onClick={startGame}>
            Play Again
          </GameSpace.StartButton>
        </GameSpace.ButtonHolder>
      )}

      {gameStarted && (
        <GameSpace.TotalScore>
          Total Score: {totalScore}{yahtzeeBonus > 0 ? ` (${yahtzeeBonus} Yahtzee bonus)` : ''}
        </GameSpace.TotalScore>
      )}
    </GameSpace.Wrapper>
  );
};

// Styled components
const GameSpace = {
  Wrapper: styled.div`
    position: relative;
    max-width: 1000px;
    margin: auto auto !important;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding-top: 20px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 20px;
    @media only screen and (max-width: 42em) {
      width: 100%;
      font-size: 16px;
    }
  `,
  Title: styled.h1`
    font-size: 48px;
    color: rgb(0,0,128);
    margin-bottom: 20px;
    @media only screen and (max-width: 42em) {
      font-size: 36px;
    }
  `,
  Info: styled.div`
    font-size: 24px;
    padding-bottom: 20px;
    @media only screen and (max-width: 42em) {
      font-size: 20px;
    }
  `,
  ButtonHolder: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding-bottom: 20px;
    margin: auto auto !important;
    flex-wrap: wrap;
    @media only screen and (max-width: 42em) {
      gap: 10px;
    }
  `,
  StartButton: styled.button`
    font-size: 24px;
    padding: 15px 30px;
    background-color: rgb(0,0,128);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    @media only screen and (max-width: 42em) {
      font-size: 20px;
      padding: 12px 24px;
    }
    &:hover {
      background-color: rgb(0,0,150);
    }
  `,
  RollButton: styled.button`
    font-size: 20px;
    padding: 12px 24px;
    background-color: rgb(0,100,200);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    @media only screen and (max-width: 42em) {
      font-size: 18px;
      padding: 10px 20px;
    }
    &:hover:not(:disabled) {
      background-color: rgb(0,120,220);
    }
    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  `,
  ConfirmButton: styled.button`
    font-size: 20px;
    padding: 12px 24px;
    background-color: rgb(0,150,0);
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    @media only screen and (max-width: 42em) {
      font-size: 18px;
      padding: 10px 20px;
    }
    &:hover {
      background-color: rgb(0,170,0);
    }
  `,
  DiceContainer: styled.div`
    display: flex;
    justify-content: center;
    gap: 15px;
    padding: 20px 0;
    flex-wrap: wrap;
    @media only screen and (max-width: 42em) {
      gap: 10px;
    }
  `,
  Die: styled.div<{ kept: boolean }>`
    font-size: 48px;
    width: 60px;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid ${props => props.kept ? 'rgb(0,150,0)' : 'rgb(0,0,128)'};
    border-radius: 8px;
    background-color: ${props => props.kept ? 'rgba(0,150,0,0.1)' : 'white'};
    cursor: pointer;
    transition: all 0.2s;
    @media only screen and (max-width: 42em) {
      font-size: 36px;
      width: 50px;
      height: 50px;
    }
    &:hover {
      transform: scale(1.1);
    }
  `,
  ScoreSection: styled.div`
    margin-top: 30px;
  `,
  ScoreTitle: styled.h2`
    font-size: 28px;
    color: rgb(0,0,128);
    margin-bottom: 20px;
    @media only screen and (max-width: 42em) {
      font-size: 24px;
    }
  `,
  ScoreGrid: styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    @media only screen and (max-width: 42em) {
      grid-template-columns: repeat(3, 1fr);
      gap: 8px;
    }
  `,
  ScoreItem: styled.div<{ used: boolean; selected?: boolean }>`
    padding: 15px;
    border: 2px solid ${props => 
      props.selected ? 'rgb(255,165,0)' : 
      props.used ? 'rgb(150,150,150)' : 'rgb(0,0,128)'
    };
    border-radius: 8px;
    background-color: ${props => 
      props.selected ? 'rgba(255,165,0,0.1)' :
      props.used ? 'rgba(150,150,150,0.1)' : 'white'
    };
    cursor: ${props => props.used ? 'not-allowed' : 'pointer'};
    transition: all 0.2s;
    @media only screen and (max-width: 42em) {
      padding: 8px;
    }
    &:hover:not([style*="cursor: not-allowed"]) {
      background-color: rgba(0,0,128,0.1);
      transform: translateY(-2px);
    }
  `,
  ScoreName: styled.div`
    font-weight: bold;
    font-size: 18px;
    margin-bottom: 5px;
    @media only screen and (max-width: 42em) {
      font-size: 16px;
    }
  `,
  ScoreValue: styled.div`
    font-size: 24px;
    font-weight: bold;
    color: rgb(0,0,128);
    margin-bottom: 5px;
    @media only screen and (max-width: 42em) {
      font-size: 20px;
    }
  `,
  ScoreDescription: styled.div`
    font-size: 14px;
    color: #666;
    @media only screen and (max-width: 42em) {
      font-size: 12px;
    }
  `,
  TotalScore: styled.div`
    font-size: 28px;
    font-weight: bold;
    color: rgb(0,0,128);
    margin-top: 20px;
    @media only screen and (max-width: 42em) {
      font-size: 24px;
    }
  `
};

export default Yahtzee;
