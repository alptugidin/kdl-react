import React from 'react';

const Add = () => {
  return (
    <button
      type='button'
      className='absolute right-2 top-[50px] flex w-10 items-center justify-center rounded-full bg-gradient-to-r from-rose-100 to-blue-100 p-2'>
      <svg
        className='stroke-red-400'
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <path d="M2.61093 4.54417C2.1002 5.03373 1.69507 5.61492 1.41867 6.25455C1.14226 6.89419 1 7.57976 1 8.2721C1 8.96444 1.14226 9.65 1.41867 10.2896C1.69507 10.9293 2.1002 11.5105 2.61093 12L12 21L21.3891 12C22.4205 11.0113 23 9.67034 23 8.2721C23 6.87385 22.4205 5.53288 21.3891 4.54417C20.3576 3.55546 18.9587 3.00001 17.5 3.00001C16.0413 3.00001 14.6423 3.55546 13.6109 4.54417L12 6.0883L10.3891 4.54417C9.8784 4.05461 9.27209 3.66627 8.60479 3.40132C7.9375 3.13637 7.2223 3 6.50003 3C5.77775 3 5.06255 3.13637 4.39526 3.40132C3.72797 3.66627 3.12165 4.05461 2.61093 4.54417Z"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"/>
      </svg>
    </button>


  );
};


export default Add;