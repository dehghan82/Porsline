import React from 'react';
import './keyboard.css';

interface KeyboardProps {
  on_key_press: (key: string) => void;
  on_delete_press: () => void;
  keyboard_statuses: { [key: string]: 'correct' | 'present' | 'absent' };
}

const Keyboard: React.FC<KeyboardProps> = ({ on_key_press, on_delete_press, keyboard_statuses }) => {
  const top_row = 'QWERTYUIOP'.split('');
  const middle_row = 'ASDFGHJKL'.split('');
  const bottom_row = 'ZXCVBNM'.split('');

  const render_row = (keys: string[], extra_key?: string, extra_key_action?: () => void) => (
    <div className="keyboard-row">
      {keys.map((key) => (
        <button
          key={key}
          onClick={() => on_key_press(key)}
          className={keyboard_statuses[key] || ''}
        >
          {key}
        </button>
      ))}
      {extra_key && (
        <button
          key={extra_key}
          onClick={extra_key_action}
          className="delete-button"
        >
          {extra_key}
        </button>
      )}
    </div>
  );

  return (
    <div className="keyboard">
      {render_row(top_row)}
      {render_row(middle_row)}
      {render_row(bottom_row, 'DELETE', on_delete_press)}
    </div>
  );
};

export default Keyboard;
