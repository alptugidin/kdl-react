import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';
import {ICard} from '../types';
import {useAppDispatch} from '../store/store';
import {openModal} from '../features/slices/modalSlice';

// 186x336
const Card: React.FC<ICard> = ({id}) => {

  const cardRef = useRef<HTMLButtonElement>(null);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };

  const load = (e: IntersectionObserverEntry[]): void => {
    if (e[0].isIntersecting) {
      setIsVisible(true);
      cardRef.current?.classList.add('opacity-100');
      cardRef.current?.classList.remove('opacity-0');
    } else {
      setIsVisible(false);
      cardRef.current?.classList.remove('opacity-100');
      cardRef.current?.classList.add('opacity-0');
    }
  };

  const handleOnClick = () => {
    dispatch(openModal(true));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(load, options);
    observer.observe(cardRef.current as HTMLButtonElement);
  }, []);

  return (
    <button
      type='button'
      ref={cardRef}
      onClick={handleOnClick}
      className='p-2 transition-opacity duration-[87ms] ease-linear'
    >
      <div
        className='group h-[320px] w-[170px] cursor-pointer overflow-hidden rounded-b-2xl rounded-t-md bg-gradient-to-r from-rose-50 to-blue-50 drop-shadow-lg'
      >
        <div className=' h-[240px] overflow-hidden'>
          <Image
            src={`/img/${id}.jpg`}
            alt='thumbnail'
            width={0}
            height={0}
            sizes='100vw'
            className={'h-auto w-full rounded-t-md duration-300 group-hover:scale-105'}
          />
        </div>
        <div className='flex flex-col p-1 text-left'>
          <span className='truncate font-semibold text-gray-700'>The Good Bad Mother</span>
          <span className='text-xs text-gray-500'>나쁜엄마</span>
          <span className='font-semibold text-gray-700'>2023</span>
        </div>
      </div>
    </button>
  );
};

export default Card;