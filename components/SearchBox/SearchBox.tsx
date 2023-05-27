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
    setSearchBox(prev => ({...prev, value:''}));
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
        className={`absolute left-0 top-0 z-40 h-screen w-full ${(results.series.length > 0 || results.tags.length > 0) ? 'block' : 'hidden'}`}></div>
      <div ref={searchBox.ref} className='relative z-50 w-full'>
        <div className='flex w-full'>
          <div className='absolute ml-[6px] mt-[6px]'>
            <Search/>
          </div>
          <input
            type="text"
            ref={inputRef}
            onChange={handleOnChange}
            value={searchBox.value}
            placeholder={searchBox.placeholder}
            className='h-8 w-full rounded-full bg-white pl-8 pr-36 outline-none transition-all placeholder:select-none placeholder:italic hover:shadow-lg focus:shadow-lg'
          />
          {(searchBox.value.length > 0 && searchBox.searchType === 'Search by Name') &&
            <button
              type='button'
              onClick={handleClear}
              className='absolute right-[120px] top-[4px] rounded-full p-0.5 transition-all hover:bg-gray-100'>
              <Clear/>
            </button>
          }
          <button
            type='button'
            onClick={handleSearchType}
            className='absolute right-0 top-0 mr-1 mt-1 h-6 w-[112px] rounded-2xl bg-[#9990CE] px-1 py-0.5 text-sm text-white outline-none transition-all hover:bg-[#8679cc]'>
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