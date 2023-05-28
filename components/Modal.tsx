import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {openModal} from '../features/slices/modalSlice';
import {Flat} from '@alptugidin/react-circular-progress-bar';
import {Close} from './SVG';
import Add from './SVG/Add';

const Modal = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const {isOpen, content} = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();
  const testArr = ['Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Thriller',
    'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Thriller',
  ];

  const closeHandler = () => {
    dispatch(openModal({isOpen: false, content: null}));
  };

  const outsideClickListener = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === bgRef.current) {
      closeHandler();
    }
  };

  const colorfulTag = (tag: string): JSX.Element => {
    const count = 7;
    const random = Math.floor(Math.random() * count);
    const randomBgColor = ['bg-red-100', 'bg-blue-100', 'bg-yellow-100', 'bg-indigo-100', 'bg-gray-100', 'bg-green-100', 'bg-purple-100'];
    const randomTextColor = ['text-red-600', 'text-blue-600', 'text-yellow-600', 'text-indigo-600', 'text-gray-600', 'text-green-600', 'text-purple-600'];
    return(
      <div
        className={`flex items-center justify-between whitespace-nowrap rounded-md px-1 text-xs ${randomBgColor[random]}`}>
        <span className={`${randomTextColor[random]} select-none`}>{tag}</span>
        <div
          data-tag={tag.toLowerCase().replaceAll(' ', '-')}
          className='outline-none'>
        </div>
      </div>
    );
  };

  useEffect(() => {

    if (isOpen) {
      bgRef.current?.classList.remove('hidden');
      const interval = setInterval(() => {
        if (isOpen) {
          bgRef.current?.classList.add('opacity-100');
          clearInterval(interval);
        }
      }, 100);
    } else {
      bgRef.current?.classList.remove('opacity-100');
      const interval = setInterval(() => {
        if (!isOpen) {
          bgRef.current?.classList.add('hidden');
          clearInterval(interval);
        }
      }, 100);
    }
  }, [isOpen]);

  return (
    <div
      ref={bgRef}
      onClick={outsideClickListener}
      className={'fixed left-0 top-0 z-50 hidden h-full w-full bg-[#00000080] opacity-0 transition-all '}
    >
      <div
        ref={modalRef}
        className='absolute left-1/2 top-1/2 h-[400px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white'
      >
        <div className='flex h-full flex-col'>
          <Close closeHandler={closeHandler}/>
          <Add/>
          <div className='flex h-[200px]'>
            <div className='h-full overflow-hidden p-2'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`/img/${content?.idx}.jpg`}
                alt="thumbnail"
                className='h-full rounded-3xl object-cover'
              />
            </div>
            <div className='flex w-[calc(100%-147px)] flex-col'>
              <div className='flex h-full w-full'>
                <div className='w-3/4'>
                  <div className={'flex w-full flex-col gap-2 pl-1'}>
                    <p className='font-ubuntu truncate font-semibold'>{content?.name}</p>
                    <p className='text-xs'>{content?.title}</p>
                    <p className='font-semibold'>{content?.year}</p>
                  </div>
                </div>
                <div className='flex w-1/4 items-center'>
                  <div className='h-20 w-20'>
                    <Flat
                      progress={50}
                      text={'Match'}
                      showMiniCircle={false}
                      sx={{
                        strokeColor: 'red',
                        barWidth: 6,
                        textSize: 20,
                        strokeLinecap: 'butt',
                      }}
                    />
                  </div>
                </div>
              </div>
              <hr/>
              <div className='h-full w-full'>
                <div className='flex w-full flex-wrap items-center gap-1 pr-1 pt-2'>
                  {content?.tags.map((tag, i) => (
                    <div key={i}>
                      {colorfulTag(tag)}
                    </div>
                  ))}
                </div>
              </div>
              <hr className='mb-2'/>
            </div>
          </div>
          <div className='flex px-2 pb-1'>
            <div className='h-[200px] basis-1/2 pb-2 pr-1 text-sm'>
              <div className='h-full overflow-auto'>
                {content?.summary}
              &nbsp; &nbsp;
                <a
                  target={'_blank'}
                  className={'cursor-pointer select-none text-blue-600 hover:underline'}
                  href={content?.summaryLink} rel="noreferrer">Read More</a>
              </div>
            </div>
            <div className='basis-1/2'>
              <iframe
                className='aspect-video w-full rounded-3xl'
                src={content?.video}
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
