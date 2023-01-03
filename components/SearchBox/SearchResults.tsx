import { ppid } from 'process';
import React, { CSSProperties, useRef, useState } from 'react';
import { ISearchResults } from '../../types';
const SearchResults: React.FC<ISearchResults> = (props) => {
  const tagsRef = useRef<HTMLDivElement>(null);
  const [colorfulTags, setColorfulTags] = useState<string[]>([]);

  const highlighted = (serieName: string): JSX.Element => {
    let span = <span>{serieName}</span>;
    const splitted = serieName.split(new RegExp(`(${props.searchBox.value})`, 'gi'));
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

  const handleSerieSelect = (name: string): void => {
    props.setSearchBox(prev => ({...prev, value: name}));
    props.setResults(prev => ({...prev, series: []}));
  };


  // const tag = (tag:string): JSX.Element => {
  //   const randomBgColor = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-indigo-400', 'bg-gray-400', 'bg-green-400', 'bg-purple-400'];
  //   const randomTextColor = ['text-red-50', 'text-blue-50', 'text-yellow-200', 'text-indigo-50', 'text-gray-50', 'text-green-50', 'text-purple-50'];
  //   return (
  //     <div className={`px-1 rounded-full flex items-center ${randomBgColor[random]}`}>
  //       <span className={randomTextColor[random]}>{tag}</span>
  //     </div>
  //   );
  // };


  const handleTagSelect = (name: string): void => {
    // setColorfulTags(prev => [...prev, name]);
    const random = Math.floor(Math.random() * 7);
    const randomBgColor = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-indigo-400', 'bg-gray-400', 'bg-green-400', 'bg-purple-400'];
    const randomTextColor = ['text-red-50', 'text-blue-50', 'text-yellow-200', 'text-indigo-50', 'text-gray-50', 'text-green-50', 'text-purple-50'];
    const el =
    <div className={`px-1 rounded-full flex items-center ${randomBgColor[random]}`}>
      <span className={randomTextColor[random]}>{name}</span>
    </div>;
    if (tagsRef.current !== null && tagsRef.current !== undefined){
      tagsRef.current.innerHTML += `<div class='px-1 h-fit rounded-lg border text-sm items-center ${randomBgColor[random]}'}>
        <span class='${randomTextColor[random]} whitespace-nowrap'>${name}</span>
      </div>`;
    }
  };

  return (
    <div
      className='absolute top-9 bg-white w-full rounded-2xl overflow-hidden drop-shadow-lg'>
      <ul ref={props.resultRef}>
        { props.results.tags.length > 0 &&
          <div
            ref={tagsRef}
            className='flex gap-1 h-10 border-b items-center px-4 touch-scroll overflow-auto'
          >
          </div>
        }
        { props.searchBox.searchType === 'Search by Name' ?
          props.results.series.length > 0 && props.results.series.map((serie,i) => (
            <li
              key={i}
              onClick={() => handleSerieSelect(serie.name)}
              className='pl-8 from-rose-50 to-blue-50 hover:bg-gradient-to-r cursor-pointer h-8 flex items-center'
            >
              {highlighted(serie.name)}
            </li>
          )) : (
            props.results.tags.length > 0 && props.results.tags.map((tag, i) => (
              <li
                key={i}
                onClick={() => handleTagSelect(tag.tag)}
                className='pl-8 from-rose-50 to-blue-50 hover:bg-gradient-to-r cursor-pointer h-8 flex items-center'
              >
                {highlighted(tag.tag)}
              </li>
            ))
          )
        }
      </ul>
    </div>
  );
};

export default SearchResults;