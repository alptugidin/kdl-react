import React, {useEffect, useRef} from 'react';
interface IChevron {
    direction: string
    onClick: (direction: string) => void
    parentRef?: React.RefObject<HTMLDivElement>
}
const Chevron: React.FC<IChevron> = ({direction, onClick, parentRef}) => {
  const chevronRef = useRef<HTMLButtonElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const chevronOnClick = () => {
    onClick(direction);
    chevronRef.current?.classList.toggle('pointer-events-none');
    svgRef.current?.classList.toggle('fill-gray-400');
    setTimeout(() => {
      chevronRef.current?.classList.toggle('pointer-events-none');
      svgRef.current?.classList.toggle('fill-gray-400');
    }, 500);
  };
  return (
    <button
      ref={chevronRef}
      type='button'
      onClick={chevronOnClick}
      className={`absolute top-[calc(50%_-_1.25rem)] z-[1500] w-10 bg-white rounded-full border hover:drop-shadow-lg transition-all ${direction === 'left' ? '-left-5' : '-right-5'}`}>
      <svg ref={svgRef} focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className='fill-rose-400'>
        {direction === 'right' ?
          <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
          :
          <path d="M14.0002 18L15.4102 16.59L10.8302 12L15.4102 7.41L14.0002 6L8.00016 12L14.0002 18Z"/>
        }
      </svg>
    </button>
  );
};

export default Chevron;