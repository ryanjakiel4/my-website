import styled from "styled-components";
import React from "react";
/*
50 States game!
*/

class FiftyStates extends React.Component {
  /*
  Create class variables needed to run the game.  Bind startGame and timer to render the DOM and update the timer
  and game for the player.  Variables altering the objects in the DOM are kept track of in the state, so as these
  variables are updated with setState calls, the DOM is updated as needed.
  */
  constructor(props) {
    super(props);
    this.startGame = this.startGame.bind(this);
    this.timer = this.timer.bind(this);
    this.interval = null;
    this.statesArray = ["alabama", "alaska", "arizona", "arkansas", "california", "colorado", "connecticut", "delaware", "florida", "georgia", "hawaii", "idaho", "illinois", "indiana", "iowa", "kansas", "kentucky", "louisiana", "maine", "maryland", "massachusetts", "michigan", "minnesota", "mississippi", "missouri", "montana", "nebraska", "nevada", "new hampshire", "new jersey", "new mexico", "new york", "north carolina", "north dakota", "ohio", "oklahoma", "oregon", "pennsylvania", "rhode island", "south carolina", "south dakota", "tennessee", "texas", "utah", "vermont", "virginia", "washington", "west virginia", "wisconsin", "wyoming"];
    this.stateAbbsArray = ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"];
    this.startTimeSeconds = 0;
    this.gameDurationSeconds = 300;
    this.wonGame = false;
    this.state = {
      inputValue: '',
      buttonText: 'Start',
      buttonDisabled: false,
      textBoxDisabled: true,
      statesGuessed: [],
      statesMissed: [],
      gameInfo: "How many states can you name in 5 minutes?"
    };
  }

  /*
  DOM structure for the game.  Styles are defined at the bottom of the file.
  */
  render() {
    return (
      <GameSpace.Wrapper>
        <GameSpace.Info>
          {this.state.gameInfo}
        </GameSpace.Info>
        <GameSpace.ButtonHolder>
          <GameSpace.StartButton disabled={this.state.buttonDisabled} variant="contained" onClick={this.startGame} >
            {this.state.buttonText}
          </GameSpace.StartButton>
        </GameSpace.ButtonHolder>
        <GameSpace.TextBoxHolder>
          <GameSpace.TextBox value={this.state.inputValue} disabled={this.state.textBoxDisabled} onChange={evt => this.updateInputValue(evt)} autoFocus />
        </GameSpace.TextBoxHolder>
        <GameSpace.StateCounter>
          {this.state.buttonDisabled? "You've guessed " + this.statesGuessedString() + " so far" : ""}
        </GameSpace.StateCounter>
        <StatesList.States>
          {
            this.state.statesGuessed?.map(state => {
              return <StatesList.State>
                <StatesList.StateText>
                  {state}
                </StatesList.StateText>
              </StatesList.State>
            })
          }
        </StatesList.States>
        <StatesList.States>
          {
            this.state.statesMissed?.map(state => {
              return <StatesList.MissedState>
                <StatesList.StateText>
                  {state}
                </StatesList.StateText>
              </StatesList.MissedState>
            })
          }
        </StatesList.States>
      </GameSpace.Wrapper>
    );
  }

  /*
  Called when the start button is clicked.
  Sets the variables for starting the game, and begins the timer.
  */
  startGame() {
    this.startTimeSeconds = Date.now() / 1000;
    this.wonGame = false;
    this.setState(prevState => ({
      ...prevState,
      buttonDisabled: true,
      textBoxDisabled: false,
      statesGuessed: [],
      statesMissed: [],
      gameInfo: "Type state names or abbreviations"
    }));
    this.interval = setInterval(this.timer, 100);
  }

  /*
  This method is called tenth of a second.  First, it checks if the timer reached zero
  and the player has lost.  If not, it checks if the player has won the game.  And if not,
  it updates the timer.
  */
  timer() {
    let currentTimeSeconds = Date.now() / 1000;
    let timeElaspedSeconds = currentTimeSeconds - this.startTimeSeconds;

    if (timeElaspedSeconds >= 3000) {
      this.gameLost();
    }
    else if (this.wonGame) {
      this.gameWin();
    }
    else {
      let timeLeft = this.getTimeLeft(timeElaspedSeconds);
      if (timeLeft !== this.state.buttonText) {
        this.setState(prevState => ({
          ...prevState,
          buttonText: timeLeft
        }));
      }
    }
  }

  /*
  Display missed state names, update DOM for a lost game state, and clear the timer.
  */
  gameLost() {
    let missedStates = [];
    for (var s = 0; s < this.statesArray.length; s++) {
      var state = this.statesArray.at(s)
      if (this.state.statesGuessed.indexOf(state) === -1) {
        missedStates.push(state);
      }
    }

    var gameInfoMessage = "Time's up!  You guessed " + this.statesGuessedString() + ".  Play again?";
    this.setState(prevState => ({
      ...prevState,
      statesMissed: missedStates,
      gameInfo: gameInfoMessage,
      buttonDisabled: false,
      textBoxDisabled: true,
      buttonText: "Start"
    }));
    clearInterval(this.interval);
  }

  /*
  Update the DOM for a won game state, and clear the timer.
  */
  gameWin() {
    this.setState(prevState => ({
      ...prevState,
      gameInfo: "Nice Job!  You named all 50 states!  Play again?",
      buttonDisabled: false,
      inputValue: "",
      buttonText: "Start"
    }));
    clearInterval(this.interval);
  }

  /*
  Get proper timer formatting for the DOM based on timeElaspedSeconds
  */
  getTimeLeft(timeElaspedSeconds) {
    let minutes = Math.floor((this.gameDurationSeconds - timeElaspedSeconds) / 60);
    let seconds = Math.floor((this.gameDurationSeconds - timeElaspedSeconds) % 60);
    if (seconds.toString().length < 2)
      return "" + minutes.toString() + ":0" + seconds.toString();
    else
      return "" + minutes.toString() + ":" + seconds.toString();
  }

  /*
  Method to handle the logic of displaying the states guessed by the player so far
  */
  statesGuessedString() {
    if (this.state.statesGuessed.length === 1) {
      return this.state.statesGuessed.length + " state";
    } else {
      return this.state.statesGuessed.length + " states";
    }
  }

  /*
    Recieve and update the value entered into the text box.  Then, check if it's a state.
    */
  updateInputValue(evt) {
    const val = evt.target.value;
    this.setState(prevState => ({
      ...prevState,
      inputValue: val
    }), () => this.checkIfCorrect(this.state.inputValue));
  }

  /*
    Check each state to see if the input matches a state.
    If it does, reveal the state and reset the text input.
  */
  checkIfCorrect(input) {
    for (var s = 0; s < this.statesArray.length; s++) {
      if (this.checkIfInputMatches(input, this.statesArray[s]) ||
        this.checkIfInputMatches(input, this.stateAbbsArray[s])) {
        this.revealState(this.statesArray[s]);
        this.setState(prevState => ({
          ...prevState,
          inputValue: ""
        }));
      }
    }
  }

  /*
  Check if the input matches the state name or the uppercase abbreviation
  */
  checkIfInputMatches(input, state) {
    input = input.trim();
    if (input.toUpperCase() !== input)
      input = input.toLowerCase();
    return input === state;
  }

  /*
  If the state hasn't already been revealed, add it to the statesGuessed array.
  Check if the player has won by guessing the final state.  This is done prior to
  updating the array because setState is asyncronous.
  */
  revealState(state) {
    if (this.state.statesGuessed.indexOf(state) === -1) {
      // Set State is asyncronous, so we check if the guess will result in a win here
      if (this.state.statesGuessed.length >= 49)
        this.wonGame = true;
      this.setState(prevState => ({
        ...prevState,
        statesGuessed: [...this.state.statesGuessed, state]
      }));
    }
  }
}

/*
Styles for the DOM elements, supports desktop and mobile sized browsers.
*/
const StatesList = {
  States: styled.ul`
      list-style: none;
      padding-top: 20px;
      font-size: 28px;
      display: flex;
      flex-wrap: wrap;
      margin: auto auto !important;
  justify-content: center;
  align-items: center;
  text-align: center;
      @media only screen and (max-width: 42em) {
        font-size: 18px;
      }
    `,
  State: styled.li`
      flex: 1;
    `,
  StateText: styled.div`
    width: 200px;
    display: block;
    padding-top: 10px;
    @media only screen and (max-width: 42em) {
      width: 125px;
    }
    `,
  MissedState: styled.li`
      flex: 1;
      color: red;
    `
};

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
  font-size: 40px;
  @media only screen and (max-width: 42em) {
    width: 100%;
  }
  `,
  Info: styled.div`
  font-size: 40px;
  padding-bottom: 20px;
  @media only screen and (max-width: 42em) {
    font-size: 30px;
  }
  `,
  ButtonHolder: styled.div`
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto auto !important;
  @media only screen and (max-width: 42em) {
    font-size: 30px;
    width: 100%;
  }
  `,
  StartButton: styled.button`
  font-size: 40px;
  @media only screen and (max-width: 42em) {
    font-size: 30px;
    width: 100%;
  }
  `,
  TextBoxHolder: styled.div`
  padding-bottom: 20px;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: auto auto !important;
  @media only screen and (max-width: 42em) {
    font-size: 30px;
    width: 100%;
  }
  `,
  TextBox: styled.input`
  font-size: 40px;
  @media only screen and (max-width: 42em) {
    font-size: 30px;
    width: 100%;
  }
  `,
  StateCounter: styled.div`
  font-size: 40px;
  padding-bottom: 20px;
  @media only screen and (max-width: 42em) {
    font-size: 30px;
  }
  `
};

export default FiftyStates;