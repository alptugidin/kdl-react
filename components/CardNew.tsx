import React from 'react';
import Image from 'next/image';

interface ICardNew {
  id: number;
}
// 186x336
const CardNew: React.FC<ICardNew> = ({id}) => {

  return (
    <div className='p-2'>
      <div
        className='w-[170px] h-[320px] drop-shadow-lg bg-gradient-to-r from-rose-50 to-blue-50 rounded-b-2xl cursor-pointer group rounded-t-md overflow-hidden'>
        <div className=' h-[240px] overflow-hidden'>
          <Image
            src={`/img/${id}.jpg`}
            alt='thumbnail'
            width={0}
            height={0}
            sizes='100vw'
            className={'w-full h-auto rounded-t-md group-hover:scale-105 duration-300'}
          />
        </div>
        <div className='flex flex-col p-1'>
          <span className='font-semibold text-gray-700 truncate'>The Good Bad Mother</span>
          <span className='text-xs text-gray-500'>나쁜엄마</span>
          <span className='font-semibold text-gray-700'>2023</span>
        </div>
      </div>
    </div>
  );
};

export default CardNew;