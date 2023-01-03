import React from 'react';
import SearchBox from './SearchBox/SearchBox';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Header: React.FC = () => {

  const router = useRouter();
  return (
    <div className='h-16 w-full bg-gradient-to-r from-rose-400 to-blue-400 shadow-sm border-b absolute left-0 right-0'>
      <div className='container mx-auto flex h-full'>
        <div className='basis-1/3 flex items-center'>
          <Image
            src='/logoSVG.svg'
            width={200} height={0} alt='logo'
            className='cursor-pointer select-none'
            onClick={() => router.push('/') } />
        </div>
        <div className='basis-1/3 flex items-center'>
          <SearchBox/>
        </div>
        <div className='basis-1/3 flex items-center'></div>
      </div>
    </div>
  );

};

export default Header;