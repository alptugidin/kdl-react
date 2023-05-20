import React, {useEffect, useState} from 'react';
import CardNew from './CardNew';

type Operator = '+' | '-';
const CardsContainer = () => {
  // create an array contains numbers
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

  useEffect(() => {
    console.log(arr.slice(cursor.first, cursor.last));
  }, [cursor]);

  return (
    <div className='py-10 flex overflow-hidden container mx-auto card-container relative'>
      <div className='absolute bottom-0 w-full flex justify-center gap-3'>
        <button
          onClick={() => changeCursor('-')}
          className='bg-red-600 text-white font-semibold rounded-lg px-3 py-1 hover:bg-red-700'
        >cursor -
        </button>
        <button
          onClick={() => changeCursor('+')}
          className='bg-green-600 text-white font-semibold rounded-lg px-3 py-1 hover:bg-green-700'
        >
          cursor +
        </button>
        <span>cursor: {JSON.stringify(cursor)}</span>
      </div>
      {arr.slice(cursor.first, cursor.last).map((el, index) => (
        <div key={index}>
          <CardNew id={el + 1}/>
        </div>
      ))}
      {/*{*/}
      {/*  [...Array(20)].map((_, index) => (*/}
      {/*    <div key={index}>*/}
      {/*      <CardNew id={index + 1}/>*/}
      {/*    </div>*/}
      {/*  ))*/}
      {/*}*/}
    </div>
  );
};

export default CardsContainer;