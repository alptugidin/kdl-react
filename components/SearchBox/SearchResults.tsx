import React, {CSSProperties, useRef, useState} from 'react';
import Remove from '../SVG/Remove';
import {ISearchResults} from '../../types';

const SearchResults: React.FC<ISearchResults> = (props) => {
  const tagsRef = useRef<HTMLDivElement>(null);
  const [colorfulTags, setColorfulTags] = useState<JSX.Element[]>([]);

  const highlighted = (serieName: string): JSX.Element => {
    let span = <span>{serieName}</span>;
    const split = serieName.split(new RegExp(`(${props.searchBox.value})`, 'gi'));
    if (split.length > 1) {
      span =
          <div className={'sb-highlight-div'}>
            <span>{split[0]}</span>
            <span className='font-bold'>{split[1]}
            </span>
            <span>{split[2]}</span>
          </div>;
    }
    return span;
  };

  const handleSerieSelect = (name: string): void => {
    props.setSearchBox(prev => ({...prev, value: name}));
    props.setResults(prev => ({...prev, series: []}));
  };


  const handleTagSelect = (name: string): void => {
    const random = Math.floor(Math.random() * 7);
    const randomBgColor = ['bg-red-200', 'bg-blue-200', 'bg-yellow-200', 'bg-indigo-200', 'bg-gray-200', 'bg-green-200', 'bg-purple-200'];
    const randomTextColor = ['text-red-600', 'text-blue-600', 'text-yellow-600', 'text-indigo-600', 'text-gray-600', 'text-green-600', 'text-purple-600'];
    const el =
            <div
              className={`px-1 rounded-md flex items-center gap-2 justify-between text-sm whitespace-nowrap ${randomBgColor[random]}`}>
              <span className={`${randomTextColor[random]} select-none`}>{name}</span>
              <button
                type='button'
                data-tag={name.toLowerCase().replaceAll(' ', '-')}
                className='outline-none'>
                <Remove/>
              </button>
            </div>;
    if (colorfulTags.every(tag => tag.props.children[1].props['data-tag'] !== name.toLowerCase().replaceAll(' ', '-'))) {
      setColorfulTags(prev => [...prev, el]);
      props.inputRef.current?.focus();
    }

  };
  const removeTag = async (e: React.MouseEvent<HTMLDivElement>) => {
    const tagName = (e.target as Element).closest('button')?.attributes[1].value;
    const arr = colorfulTags.filter(tag => tag.props.children[1].props['data-tag'] !== tagName);
    setColorfulTags(arr);
  };

  const handleSelectWithTags = () => {

  };

  return (
    <div
      className='absolute top-9 bg-white w-full rounded-2xl overflow-hidden drop-shadow-lg'>
      <ul ref={props.resultRef}>
        {props.results.tags.length > 0 &&
          <div
            ref={tagsRef}
            className='flex gap-1 h-10 border-b items-center px-4 touch-scroll overflow-auto'
            onClick={removeTag}
          >
            {colorfulTags.map((tag, i) => <div key={i}>{tag}</div>)}
          </div>
        }
        {props.searchBox.searchType === 'Search by Name' ?
          props.results.series.length > 0 && props.results.series.map((serie, i) => (
            <li
              key={i}
              onClick={() => handleSerieSelect(serie.name)}
              className='pl-8 from-rose-50 to-blue-50 hover:bg-gradient-to-r cursor-pointer h-8 flex items-center select-none'
            >
              {highlighted(serie.name)}
            </li>
          )) : (
            props.results.tags.length > 0 && props.results.tags.map((tag, i) => (
              <li
                key={i}
                onClick={() => handleTagSelect(tag.tag)}
                className='pl-8 from-rose-50 to-blue-50 hover:bg-gradient-to-r cursor-pointer h-8 flex items-center select-none'
              >
                {highlighted(tag.tag)}
              </li>
            ))
          )
        }
        {props.results.tags.length > 0 &&
          <button
            type='button'
            className='w-full h-8 from-rose-50 to-blue-50 hover:bg-gradient-to-r border-t tracking-wider hover:font-semibold'
            onClick={handleSelectWithTags}
          >
            Search
          </button>
        }
      </ul>
    </div>
  );
};

export default SearchResults;
