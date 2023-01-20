import React from 'react';
import Card from './Card';

export const CardsContainer: React.FC<{}> = props => {
    return (
        <div className='container mx-auto flex justify-center mt-10 flex-col gap-5 cards-container'>
            <span className='font-ubuntu text-3xl text-gray-600 text-center'>Latest Korean Dramas</span>
            <div className='w-full border rounded-lg p-1 flex gap-1 sm:overflow-hidden overflow-auto'>
                {Array.from(Array(20).keys()).map((i, _) => (
                    <div key={_}>
                        <Card/>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default CardsContainer;