import React, {useState} from 'react';
import Card from './Card';

interface ICardsContainer {
    type: string
}

interface IChevron {
    direction: string
}

const Chevron: React.FC<IChevron> = ({direction}) => {
  return (
    <button
      type='button'
      className={`absolute top-[calc(50%_-_1.25rem)] z-[1500] w-10 bg-white rounded-full border hover:drop-shadow-lg transition-all ${direction === 'left' ? '-left-5' : '-right-5'}`}>
      <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-rose-400'>
        {direction === 'right' ?
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          :
          <path d="M14.0002 18L15.4102 16.59L10.8302 12L15.4102 7.41L14.0002 6L8.00016 12L14.0002 18Z"/>
        }
      </svg>
    </button>
  );
};

export const CardsContainer: React.FC<ICardsContainer> = ({type}) => {
  const [year, setYear] = useState('2022');
  // @ts-ignore
  const years = (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => i + min).reverse();
  const yearsOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };
  return (
    <div className='container mx-auto flex flex-col justify-center mt-10 gap-5 cards-container relative'>
      <div className={`w-full flex justify-center items-center ${type === 'popular' ? 'gap-5' : ''}`}>
        <span className='font-ubuntu text-3xl text-gray-600 text-center'>
          {type === 'latest' ? 'Latest' : 'Most popular'} Korean Dramas
        </span>
        <div>
          {type === 'popular' &&
          <select
            className='border outline-none rounded-lg border-gray-300 focus:border-gray-400 mt-1 cursor-pointer'
            value={year}
            onChange={yearsOnChange}
          >
            {years(2010, 2022).map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
          }
        </div>
      </div>
      <div className='relative'>
        <Chevron direction='left'/>
        <div className='w-full border rounded-lg p-1 flex gap-1 sm:overflow-hidden overflow-auto relative'>
          {Array.from(Array(20).keys()).map((i, _) => (
            <div key={_}>
              <Card/>
            </div>
          ))}
        </div>
        <Chevron direction='right'/>
      </div>
    </div>
  );
};


export default CardsContainer;