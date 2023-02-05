import React, {useEffect, useRef, useState} from 'react';
import {Chevron, Card} from './index';
import {scryRenderedDOMComponentsWithClass} from 'react-dom/test-utils';

const LatestContainer = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [offset, setOffset] = useState(0);
  const [scrollWidth, setScrollWidth] = useState(0);
  const [showChevron, setShowChevron] = useState<{left: boolean, right: boolean}>({left: false, right: true});
  const chevronOnClick = (direction: string) => {
    const currentWidth = cardsContainerRef.current?.offsetWidth as number - 6;
    setScrollWidth(cardsContainerRef.current?.scrollWidth as number - 6);
    switch (direction) {
    case 'left':
      if (cardsContainerRef.current){
        cardsContainerRef.current.scrollLeft -= currentWidth;
        setTimeout(() => {
          if (cardsContainerRef.current) {
            setScrollLeft(cardsContainerRef.current.scrollLeft);
            setOffset(cardsContainerRef.current.offsetWidth);
          }
        }, 500);
      }
      break;
    case 'right':
      if (cardsContainerRef.current){
        cardsContainerRef.current.scrollLeft += currentWidth;
        setTimeout(() => {
          if (cardsContainerRef.current) {
            setScrollLeft(cardsContainerRef.current.scrollLeft);
            setOffset(cardsContainerRef.current.offsetWidth);
          }
        }, 500);
      }
    }
  };

  useEffect(() => {
    if (Math.round(scrollLeft) === 0) {
      setShowChevron(prev => ({...prev, left: false}));
    }else if (Math.round(scrollLeft) > 0) {
      setShowChevron(prev => ({...prev, left: true}));
    }else if (scrollWidth - Math.round((scrollLeft - 8)) === offset) {
      setShowChevron(prev => ({...prev, right: false}));
    }else if (scrollWidth - Math.round((scrollLeft - 8)) < 15) {
      setShowChevron(prev => ({...prev, right: true}));
    }
    console.log(Math.round(scrollLeft));
  }, [scrollLeft, offset]);


  return (
    <div className='container mx-auto flex flex-col justify-center mt-10 gap-5 cards-container relative'>
      <div className='w-full flex justify-center items-center gap-5'>
        <span className='font-ubuntu text-3xl text-gray-600 text-center'>
            Latest Korean Dramas {Math.round(scrollLeft)} and {offset} and {scrollWidth - Math.round((scrollLeft - 8))}
        </span>
      </div>
      <div className='relative'>
        <div className={showChevron.left ? 'block' : 'hidden'}>
          <Chevron direction='left' onClick={chevronOnClick} parentRef={cardsContainerRef}/>
        </div>
        <div ref={cardsContainerRef}
          className='w-full border rounded-lg p-1 flex gap-1 sm:overflow-hidden overflow-auto relative scroll-smooth'>
          {Array.from(Array(20).keys()).map((i) => (
            <div className='relative' key={i}>
              <span className='absolute left-2 top-0 font-bold text-yellow-400
               z-50 text-2xl'>{i}</span>
              <Card name={'Korean Drama ' + i.toString()}/>
            </div>
          ))}
        </div>
        <div className={showChevron.right ? 'block' : 'hidden'}>
          <Chevron direction='right' onClick={chevronOnClick} parentRef={cardsContainerRef}/>
        </div>
      </div>
    </div>
  );
};

export default LatestContainer;