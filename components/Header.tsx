import React from 'react';
import SearchBox from './SearchBox';
import Image from 'next/image';

const Header: React.FC = () => {

  return (
    <div className='w-full h-24 p-2'>
      <div className='w-full h-full rounded-2xl bg-yellow-100 border-blue-500 border header flex px-1.5'>
        <div className='basis-1/3 flex items-center'>
          <Image src='/logo.png' alt='logo' width={250} height={65} quality={95}/>
        </div>
        <div className='basis-1/3 flex items-center'>
          <SearchBox/>
        </div>
        <div className='basis-1/3'>

        </div>
      </div>
    </div>
  );

};

export default Header;