import React from 'react';
import Image from 'next/image';
import { Flat } from '@alptugidin/react-circular-progress-bar';

const Card: React.FC = () => {

  return (
    <div className='card group cursor-pointer relative'>
      <div className='w-16 h-16 absolute right-0 top-0 z-50'>
        <Flat
          progress={50}
          text={'Match'}
          showMiniCircle={ false }
          sx={{
            barColor: '#ff0000',
            barWidth: 5,
            bgColor: '#d9d9d9',
            strokeLinecap: 'butt',
            valueSize: 33,
            textSize: 29
          }}
        />
      </div>
      <div className='w-fit transition-all overflow-hidden group-hover:scale-110 duration-[400ms]'>
        <Image src='/img/136.webp' width={160} height={120} alt='poster'/>
      </div>
    </div>
  );
};

export default Card;