import React, {useEffect, useState} from 'react';
import {Card, Chevron, Modal} from '.';
import dummyData from '../pages/api/dummyData.json';
import {ISeries} from '../types';
import {useAppSelector} from '../store/store';

type Operator = '+' | '-';
const CardsContainer = () => {
  const {isOpen} = useAppSelector(state => state.modal);

  const arr = [...Array(20).keys()];
  const length = 20;
  const count = 8;
  let data = dummyData as ISeries[];

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
      {isOpen && <Modal/>}
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
      <div className='card-container container relative mx-auto flex h-[350px] items-center overflow-hidden'>
        <div
          style={{
            left: `${-100 * cursor.first / count}%`,
          }}
          className='absolute flex justify-around transition-all duration-700'
        >
          {data.map((serie, index) => (
            <div key={index}>
              <Card
                id={index + 1}
                data={serie}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsContainer;