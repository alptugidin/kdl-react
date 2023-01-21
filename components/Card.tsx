import React from 'react';
import Image from 'next/image';
import {Flat} from '@alptugidin/react-circular-progress-bar';

const Card: React.FC = () => {
  return (
    <div className='card group cursor-pointer relative'>
      <div className='lg:w-16 lg:h-16 h-11 w-11 absolute right-0 top-0 z-50 hidden'>
        <Flat
          progress={50}
          text={'Match'}
          showMiniCircle={false}
          sx={{
            strokeColor: '#ff0000',
            barWidth: 5,
            bgStrokeColor: '#d9d9d9',
            strokeLinecap: 'butt',
            bgColor: {value: '#000000', transparency: '70'},
            valueSize: 32,
            textSize: 28,
            textColor: '#facc15',
            valueColor: '#facc15',
            valueWeight: 'bold',
            textWeight: 'bold'
          }}
        />
      </div>
      <div>
        <div className='w-fit transition-all overflow-hidden group-hover:scale-110 duration-[400ms]'>
          <Image src='/img/136.webp' width={160} height={120} alt='poster'/>
        </div>
        <div className='absolute bottom-0 title w-full h-20 flex flex-col items-center justify-end text-center text-yellow-400'>
          <p className=''>Korean Drama</p>
          <p className='font-semibold'>2022</p>
        </div>
      </div>
    </div>
  );
};

export default Card;