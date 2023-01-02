import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { ISeries } from '../types';
import Clear from './SVG/Clear';
import Search from './SVG/Search';

const SearchBox: React.FC = () => {
  const sbRef = useRef<HTMLDivElement>(null);
  const resultRef = useRef<HTMLUListElement>(null);

  const [series, setSeries] = useState<ISeries[]>([]);
  const [searchBox, setSearchBox] = useState({
    value: '',
    searchType: 'Search by Name',
    placeholder: 'Korean Dramas like...'
  });
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ' ') return;
    setSearchBox((prev) => ({...prev, value: e.target.value}));
    if (e.target.value.length > 2) {
      const {data} = await axios.get('/api/series?q=' + e.target.value);
      setSeries(data);
    }
    if (e.target.value.length < 2 ){
      setSeries([]);
    }
  };

  const highlighted = (serieName: string): JSX.Element => {
    let span = <span>{serieName}</span>;
    const splitted = serieName.split(new RegExp(`(${searchBox.value})`, 'gi'));
    if (splitted.length > 1) {
      span =
      <div className={'sb-highlight-div'}>
        <span>{splitted[0]}</span>
        <span className='font-bold'>
          {splitted[1]}
        </span>
        <span>{splitted[2]}</span>
      </div>;
    }
    return span;
  };

  const handleSelect = (name: string): void => {
    setSearchBox((prev) => ({...prev, value: name}));
    setSeries([]);
  };

  const handleSearchType = (): void => {
    if (searchBox.searchType === 'Search by Name'){
      setSearchBox((prev) => ({...prev, searchType: 'Search by Tags', placeholder: 'e.g. Romance'}));
    }else {
      setSearchBox((prev) => ({...prev, searchType: 'Search by Name', placeholder: 'Korean Dramas like...'}));
    }
  };

  const handleClear = (): void => {
    setSearchBox((prev) => ({...prev, value: ''}));
    setSeries([]);
  };

  useEffect(() => {
    document.addEventListener('click', (e: MouseEvent) => {
      if (!sbRef.current?.contains(e.target as Element) && !resultRef.current?.contains(e.target as Element) ){
        console.log('out');
      }
    });
  }, []);
  return (
    <div ref={sbRef} className='w-full relative'>
      <div className='w-full'>
        <div className='absolute mt-[6px] ml-[6px]'>
          <Search/>
        </div>
        <input
          type="text"
          onChange={handleOnChange}
          value={searchBox.value}
          placeholder={searchBox.placeholder}
          className='h-8 rounded-full w-full pl-8 pr-36 outline-none placeholder:italic placeholder:select-none'
        />
        {searchBox.value.length > 0 &&
          <button
            type='button'
            onClick={handleClear}
            className='absolute top-[4px] right-[120px] transition-all hover:bg-gray-100 rounded-full p-0.5'>
            <Clear/>
          </button>
        }
        <button
          type='button'
          onClick={handleSearchType}
          className='bg-[#9990CE] hover:bg-[#8679cc] transition-all text-white rounded-2xl py-0.5 px-1 text-sm h-6 mt-1 mr-1 w-[112px] outline-none absolute top-0 right-0'>
          <span>
            {searchBox.searchType}
          </span>
        </button>
      </div>
      {series.length > 0 &&
      <div

        className='absolute top-9 bg-white w-full rounded-2xl overflow-hidden drop-shadow-lg'>
        <ul ref={resultRef}>
          {series.map((serie,i) => (
            <li
              key={i}
              onClick={() => handleSelect(serie.name)}
              className='pl-8 from-rose-50 to-blue-50 hover:bg-gradient-to-r cursor-pointer h-8 flex items-center'
            >
              {highlighted(serie.name)}
            </li>
          ))}
        </ul>
      </div>
      }
    </div>
  );

};

export default SearchBox;