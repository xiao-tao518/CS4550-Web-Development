import React, { useState, useEffect } from 'react';
import './App.css';

// this is from lecture note
function SetTitle({text}) {
	useEffect(() => {
		let orig = document.title;
		document.title = text;

		return () => {
			document.title = orig;
		};
	});
	return <div />;
}

function GameOver(props) {
	let {reset} = props;

	return (
		<div className="row">
		  <SetTitle text="Game Over" />
		  <div className="column">
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

function Controls({guess, reset, text, setText}) {

	function updateText(ev) {
		let buffer = "";
		let vv = ev.target.value;
		for (let c of vv) {
			if (buffer.length < 4 && !buffer.includes(c)
			    && c <= '9' && c >= '0') {
				buffer += c;
			}
		}
		setText(buffer);
	}

	function keyPress(ev) {
		if (ev.key === "Enter") {
			guess(text);
		}
	}

	return (
		<div className="row">
		  <div className="column">
		    <p>
		      <input type="text"
		             value={text}
		             onChange={updateText}
		             onKeyPress={keyPress} />
		    </p>
		  </div>
		  <div className="column">
		    <p>
		      <button onClick={() => guess(text)}>Guess</button>
		      <button onClick={reset}>Reset</button>
		    </p>
		  </div>
		</div>
	);
}

function fourDigits() {
	let availableList = [0,1,2,3,4,5,6,7,8,9];
	let count = 0;
	let result = "";
	let rand = 0;
	for (let i = 0; i < 4; i++) {
		rand = Math.floor(Math.random() * (10 - count));
		result += availableList[rand];
		availableList.splice(rand, 1);
		count++;
	}
	return result;
}

function App() {
	const [text, setText] = useState("");
	const [game, setGame] = useState({
		secret: fourDigits(),
		guesses: [],
		reports: [],
		lives: 8,
	});

	function guess(text) {
		console.log(game.secret);
		
		let bulls = 0;
		let cows = 0;
		let secret = game.secret
		for (let i = 0; i < secret.length; i++) {
			if (text[i] === secret[i]) {
				bulls++;
			}
			else if (secret.includes(text[i])) {
				cows++;
			}
		}
		
		let report = bulls + "A" + cows + "B";

		game.guesses.push(text);
		game.reports.push(report);

		setGame({
			secret: game.secret,
			guesses: game.guesses,
			reports: game.reports,
			lives: game.lives - 1,
		});

		setText("");
	}

	function reset() {
		console.log("reset");
		setGame({
			secret: fourDigits(),
			guesses: [],
			reports: [],
			lives: 8,
		});
		setText("");
	}

	function displayReports() {
		let result = ""
		for (let i = 0; i < game.guesses.length; i++) {
			result = result + game.guesses[i] + ": " + game.reports[i] + "\n";
		}
		return result;
	}

	let body = null;

	if (game.guesses[game.guesses.length - 1] === game.secret) {
		body = (
			<div>
			  <div className="row">
			    <div className="column">
			      <p>You Win!</p>
			    </div>
			  </div>
			  <div>
		            <p> <button onClick={reset}>Reset</button> </p>
			  </div>
			</div>
		)
	}
	else if (game.lives > 0) {
		body = (
			<div>
			  <div className="row">
			    <div className="column">
			      <h1>Four Digits Game</h1>
			      <p>Lives: {game.lives}</p>
			    </div>
			  </div>
			  <Controls reset={reset} guess={guess} text={text} setText={setText} reports={game.reports} />
			  <div>
			   <p>{displayReports()}</p>
			  </div>
			</div>
		)
	}
	else {
		body = <GameOver reset={reset} />;
	}

	return (
		<div className="fourDigits">{body}</div>
	);
}

export default App;
