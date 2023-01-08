import axios from 'axios';
import React, {useRef, useState} from 'react';
import {ISeries, ITags} from '../../types';
import Clear from '../SVG/Clear';
import Search from '../SVG/Search';
import SearchResults from './SearchResults';

const SearchBox: React.FC = () => {
  const resultRef = useRef<HTMLUListElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [results, setResults] = useState<{ series: ISeries[], tags: ITags[] }>({
    series: [],
    tags: []
  });
  const [searchBox, setSearchBox] = useState({
    ref: useRef<HTMLDivElement>(null),
    value: '',
    searchType: 'Search by Name',
    placeholder: 'Korean Dramas like...'
  });
  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === ' ') return;
    setSearchBox(prev => ({...prev, value: e.target.value}));
    if (e.target.value.length > 2) {
      switch (searchBox.searchType) {
      case 'Search by Name':
        const {data: seriesData} = await axios.get('/api/series?q=' + e.target.value);
        setResults(prev => ({...prev, series: seriesData}));
        break;
      case 'Search by Tags':
        const {data: tagsData} = await axios.get('/api/tags?q=' + e.target.value);
        setResults(prev => ({...prev, tags: tagsData}));
        break;
      }
    }
    if (e.target.value.length < 2) {
      setResults({series: [], tags: []});
    }
  };

  const handleSearchType = (): void => {
    if (searchBox.searchType === 'Search by Name') {
      setSearchBox(prev => ({...prev, searchType: 'Search by Tags', placeholder: 'e.g. Romance'}));
    } else {
      setSearchBox(prev => ({...prev, searchType: 'Search by Name', placeholder: 'Korean Dramas like...'}));
    }
  };

  const handleClear = (): void => {
    setSearchBox(prev => ({...prev, value: ''}));
    setResults({tags: [], series: []});
  };

  const handleOutsideClick = (): void => {
    setResults({series: [], tags: []});
  };

  return (
    <>
      <div
        onClick={handleOutsideClick}
        className={`absolute left-0 top-0 w-full h-screen z-40 ${results.series.length > 0 ? 'block' : 'hidden'}`}></div>
      <div ref={searchBox.ref} className='w-full relative z-50'>
        <div className='w-full flex'>
          <div className='absolute mt-[6px] ml-[6px]'>
            <Search/>
          </div>
          <input
            type="text"
            ref={inputRef}
            onChange={handleOnChange}
            value={searchBox.value}
            placeholder={searchBox.placeholder}
            className='h-8 rounded-full w-full pl-8 pr-36 outline-none placeholder:italic placeholder:select-none focus:shadow-lg hover:shadow-lg transition-all'
          />
          {(searchBox.value.length > 0 && searchBox.searchType === 'Search by Name') &&
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
        <SearchResults {...{results, setResults, searchBox, setSearchBox, resultRef, inputRef}} />
      </div>
    </>
  );

};

export default SearchBox;