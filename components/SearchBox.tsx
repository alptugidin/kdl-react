import React from 'react';

const SearchBox: React.FC = () => {

  return (
    <div className='w-full'>
      <input
        type="text"
        placeholder='Search'
        className='h-9 bg-white w-full rounded-full border border-blue-500 searchbox outline-none px-6' />
    </div>
  );

};

export default SearchBox;