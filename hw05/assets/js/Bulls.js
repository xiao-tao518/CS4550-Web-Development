import React, { useState, useEffect } from 'react';
import { ch_join, ch_push } from './socket';


function BullGame({reset, gameState, setGameState}) {
  const [input, setInput] = useState("");

  function guess() {
      ch_push("guess", {number: input});
  }

  function keyPress(ev) {
    if (ev.key === "Enter") {
      guess();
    }
  }
  
  function updateGuess(ev) {
    setInput(ev.target.value);
  }



  function render(guess, index) {
    return (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{guess.guess}   {`${guess.right_place}A${guess.wrong_place}B`}</td>
      </tr>
    );
  }
  
  return (
        <div className="row">
		  <div className="column">
		    <p>Four digit number</p>
		    <p>
		      <input type="text"
		             value={input}
		             onChange={updateGuess}
		             onKeyPress={keyPress} />
		    </p>
		  </div>
          <body>
		    <p>
		      <button onClick={guess}>Guess</button>
		      <button onClick={() => {reset(); setInput("");}}>Reset</button>
            </p>
            <h2>reports</h2>
            <p>
		      {gameState.guesses.map((guess, index) => render(guess, index))}
		    </p>
		   </body>
		</div>
  );
}

function gameOver({reset}) {
  return (
		<div>
		  <div>
		    <h1>Game Over! Click reset to play again</h1>
		    <p>
		      <button onClick={reset}>
		        reset
		      </button>
		    </p>
		  </div>
		</div>
  );
}

function Bulls() {
  const [gameState, setGameState] = useState({
    guesses: [],
    won: false,
    lost: false,
  });

  useEffect(() => ch_join(setGameState));

  function reset() {
    ch_push("reset", "");
  }

  if (gameState.lost) {
    return (
      <gameOver reset={reset} />
    );
  } else if (gameState.won) {
    return (
    <div>
      <h1>You Win!</h1>
      <p>click reset to play again</p>
      <button onClick={reset}>
        reset
      </button>
    </div>
    );
  }
  else {
    return (
      <BullGame reset={reset}
                  gameState={gameState}
                  setGameState={setGameState} />
    );
  }
}

export default Bulls;
