import React from 'react';

interface IClose {
  closeHandler: () => void;
}
const Close : React.FC<IClose> = ({closeHandler}) => {
  return (
    <button
      type='button'
      className='absolute right-2 top-2 flex rounded-full bg-gradient-to-r from-rose-100 to-blue-100 stroke-red-400 p-2 transition-all'
      onClick={closeHandler}
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        className='text-gray-500'
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M3.6001 3.6001L20.4001 20.4001M3.6001 20.4001L20.4001 3.6001L3.6001 20.4001Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round" />
        {/*<path*/}
        {/*  d="M18 6L6 18"*/}
        {/*  // stroke="currentColor"*/}
        {/*  strokeWidth="2"*/}
        {/*  strokeLinecap="round"*/}
        {/*  strokeLinejoin="round"*/}
        {/*/>*/}
        {/*<path*/}
        {/*  d="M6 6L18 18"*/}
        {/*  // stroke="currentColor"*/}
        {/*  strokeWidth="2"*/}
        {/*  strokeLinecap="round"*/}
        {/*  strokeLinejoin="round"*/}
        {/*/>*/}
      </svg>
    </button>
  );
};

export default Close;