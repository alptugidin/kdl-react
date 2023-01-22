import React, {useState} from 'react';
import {Chevron, Card} from './index';

const PopularsContainer = () => {
  const [year, setYear] = useState('2022');
  // @ts-ignore
  const years = (min: number, max: number) => [...Array(max - min + 1).keys()].map(i => i + min).reverse();
  const yearsOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setYear(e.target.value);
  };
  return (
    <div className='container mx-auto flex flex-col justify-center mt-10 gap-5 cards-container relative'>
      <div className='w-full flex justify-center items-center gap-5'>
        <span className='font-ubuntu text-3xl text-gray-600 text-center'>
          Most Popular Korean Dramas
        </span>
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


export default PopularsContainer;