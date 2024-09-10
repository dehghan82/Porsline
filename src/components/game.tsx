import React, { useState } from 'react';
import Board from './board';
import Keyboard from './keyboard';
import './game.css';

const secret_word = 'REACT'; // Hardcoded secret word

const Game: React.FC = () => {
  const [guesses, set_guesses] = useState<string[]>(['', '', '', '', '', '']);
  const [current_guess_index, set_current_guess_index] = useState<number>(0);
  const [current_guess, set_current_guess] = useState<string>('');
  const [statuses, set_statuses] = useState<('correct' | 'present' | 'absent')[][]>(
    new Array(6).fill(null).map(() => new Array(5).fill('absent'))
  );
  const [keyboard_statuses, set_keyboard_statuses] = useState<{ [key: string]: 'correct' | 'present' | 'absent' }>({});
  const [game_won, set_game_won] = useState<boolean>(false);

  const handle_key_press = (key: string) => {
    if (current_guess.length < 5) {
      const new_guess = current_guess + key;
      set_current_guess(new_guess);

      const new_guesses = [...guesses];
      new_guesses[current_guess_index] = new_guess;
      set_guesses(new_guesses);
    }
  };

  const handle_delete_press = () => {
    if (current_guess.length > 0) {
      const new_guess = current_guess.slice(0, -1);
      set_current_guess(new_guess);

      const new_guesses = [...guesses];
      new_guesses[current_guess_index] = new_guess;
      set_guesses(new_guesses);
    }
  };

  const handle_submit_guess = () => {
    if (current_guess.length === 5) {
      const new_statuses = [...statuses];
      const new_keyboard_statuses = { ...keyboard_statuses };
      const guess_statuses: ('correct' | 'present' | 'absent')[] = [];

      for (let i = 0; i < 5; i++) {
        if (current_guess[i] === secret_word[i]) {
          guess_statuses.push('correct');
          new_keyboard_statuses[current_guess[i]] = 'correct';
        } else if (secret_word.includes(current_guess[i])) {
          guess_statuses.push('present');
          if (new_keyboard_statuses[current_guess[i]] !== 'correct') {
            new_keyboard_statuses[current_guess[i]] = 'present';
          }
        } else {
          guess_statuses.push('absent');
          new_keyboard_statuses[current_guess[i]] = 'absent';
        }
      }

      new_statuses[current_guess_index] = guess_statuses;

      set_statuses(new_statuses);
      set_keyboard_statuses(new_keyboard_statuses);

      if (current_guess === secret_word) {
        set_game_won(true);
      } else {
        set_current_guess('');
        set_current_guess_index(current_guess_index + 1);
      }
    }
  };

  return (
    <div className="game">
      <Board guesses={guesses} statuses={statuses} />
      <button onClick={handle_submit_guess} className="submit-button">Submit</button>
      <Keyboard on_key_press={handle_key_press} on_delete_press={handle_delete_press} keyboard_statuses={keyboard_statuses} />
      {game_won && <div className="win-message">You won!</div>}
    </div>
  );
};

export default Game;
