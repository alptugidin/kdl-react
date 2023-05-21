import React, {useEffect, useRef, useState} from 'react';
import Image from 'next/image';

interface ICardNew {
  id: number;
}

// 186x336
const CardNew: React.FC<ICardNew> = ({id}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 1
  };
  const load = (e: IntersectionObserverEntry[]): void => {
    if (e[0].isIntersecting) {
    } else {
    }
  };
  useEffect(() => {
    const observer = new IntersectionObserver(load, options);
    observer.observe(cardRef.current as HTMLDivElement);
  }, []);

  return (
    <div
      ref={cardRef}
      className='p-2'
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
        <div className='flex flex-col p-1'>
          <span className='truncate font-semibold text-gray-700'>The Good Bad Mother</span>
          <span className='text-xs text-gray-500'>나쁜엄마</span>
          <span className='font-semibold text-gray-700'>2023</span>
        </div>
      </div>
    </div>
  );
};

export default CardNew;