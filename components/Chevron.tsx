import React from 'react';
import {IChevron} from '../types';

const Chevron: React.FC<IChevron> = ({direction, onClick}) => {
  const customClass = direction === 'left' ? '-left-4' : '-right-4';
  const rotate = direction === 'right' ? 'rotate(180 0 0)' : 'rotate(0 0 0)';
  return (
    <button
      type='button'
      className={`absolute top-[204px] z-20 h-10 w-10 rounded-full border bg-gradient-to-r from-rose-50 to-blue-50 outline-none drop-shadow transition hover:drop-shadow-lg ${customClass}`}
      onClick={onClick}
    >
      <div className={direction === 'left' ? 'ml-[10px]' : 'ml-[16px]'}>
        <svg
          width="12"
          height="22"
          viewBox="0 0 12 22"
          fill="none"
          transform={rotate}
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11 1L1 11L11 21"
            stroke="#808080"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </button>

  );
};

export default Chevron;