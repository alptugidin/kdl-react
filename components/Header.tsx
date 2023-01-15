import React from 'react';
import SearchBox from './SearchBox/SearchBox';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header: React.FC = () => {

  const router = useRouter();
  return (
    <div className='md:h-16 h-20 w-full bg-gradient-to-r from-rose-400 to-blue-400 shadow-sm border-b'>
      <div className='container mx-auto md:flex h-full'>
        <div className='basis-1/3 flex items-center md:justify-start justify-center md:h-auto h-10'>
          <Image
            src='/logoSVG.svg'
            width={0} height={0} alt='logo'
            className='cursor-pointer select-none md:w-[200px] w-[120px]'
            onClick={() => router.push('/') } />
        </div>
        <div className='md:w-[550px] flex items-center md:h-auto h-10 md:px-auto px-0.5'>
          <SearchBox/>
        </div>
        <div className='basis-1/3 flex items-center'></div>
      </div>
    </div>
  );

};

export default Header;