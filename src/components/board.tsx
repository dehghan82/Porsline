import React from 'react';
import './board.css';

interface BoardProps {
  guesses: string[];
  statuses: ('correct' | 'present' | 'absent')[][];
}

const Board: React.FC<BoardProps> = ({ guesses, statuses }) => {
  return (
    <div className="board">
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {guess.split('').map((letter, colIndex) => (
            <div key={colIndex} className={`board-cell ${statuses[rowIndex][colIndex]}`}>
              {letter}
            </div>
          ))}
          {Array.from(Array(5 - guess.length)).map((_, colIndex) => (
            <div key={colIndex + guess.length} className="board-cell"></div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
