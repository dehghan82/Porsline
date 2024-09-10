import React from 'react';
import './tile.css';

interface TileProps {
  letter: string;
  status: 'correct' | 'present' | 'absent';
}

const Tile: React.FC<TileProps> = ({ letter, status }) => {
  return <div className={`tile ${status}`}>{letter}</div>;
};

export default Tile;
