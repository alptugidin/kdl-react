import React, {useEffect, useRef} from 'react';
import {Chevron, Card} from './index';
const LatestContainer = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const chevronOnClick = (direction: string) => {
    console.log('chevron works ' + direction);
  };
  useEffect(() => {
    console.log(cardsContainerRef.current?.offsetWidth);
  }, []);
  return (
    <div className='container mx-auto flex flex-col justify-center mt-10 gap-5 cards-container relative'>
      <div className='w-full flex justify-center items-center gap-5'>
        <span className='font-ubuntu text-3xl text-gray-600 text-center'>
            Latest Korean Dramas
        </span>
      </div>
      <div className='relative'>
        <Chevron direction='left' onClick={chevronOnClick}/>
        <div ref={cardsContainerRef} className='w-full border rounded-lg p-1 flex gap-1 sm:overflow-hidden overflow-auto relative'>
          {Array.from(Array(20).keys()).map((i, _) => (
            <div key={_}>
              <Card/>
            </div>
          ))}
        </div>
        <Chevron direction='right' onClick={chevronOnClick}/>
      </div>
    </div>
  );
};

export default LatestContainer;