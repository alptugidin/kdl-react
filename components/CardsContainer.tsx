import React, {useEffect, useState} from 'react';
import CardNew from './CardNew';
import {Chevron} from './index';

type Operator = '+' | '-';
const CardsContainer = () => {
  const arr = [...Array(20).keys()];
  const length = 20;
  const count = 8;
  const [cursor, setCursor] = useState({first: 0, last: count});
  const changeCursor = (param: Operator) => {
    if (param === '+') {
      if (cursor.last + count <= length) {
        setCursor({first: cursor.first + count, last: cursor.last + count});
      } else {
        setCursor({first: length - count, last: length});
      }
    } else if (param === '-') {
      if (cursor.first - count >= 0) {
        setCursor({first: cursor.first - count, last: cursor.last - count});
      } else {
        setCursor({first: 0, last: count});
      }
    }
  };

  return (
    <div className='pt-10 '>
      <div className='font-ubuntu container relative mx-auto pb-5 text-center text-3xl text-gray-700'>
        <span>Latest Korean Dramas</span>

        {
          cursor.first !== 0 &&
					<Chevron
					  direction={'left'}
					  onClick={() => changeCursor('-')}
					/>
        }
        {
          cursor.last !== length &&
					<Chevron
					  direction={'right'}
					  onClick={() => changeCursor('+')}
					/>
        }

      </div>
      <div className='card-container container relative mx-auto flex h-[336px] overflow-hidden'>
        <div
          style={{
            left: `${-100 * cursor.first / count}%`,
          }}
          className='absolute flex justify-around transition-all duration-500'
        >
          {arr.slice(0, 16).map((el, index) => (
            <div key={index}>
              <CardNew id={el + 1}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;