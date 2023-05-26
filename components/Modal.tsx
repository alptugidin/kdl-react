import React, {useEffect, useRef} from 'react';
import {useAppDispatch, useAppSelector} from '../store/store';
import {openModal} from '../features/slices/modalSlice';

const Modal = () => {
  const bgRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const {isOpen, content} = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch(openModal(false));
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
      className={'fixed left-0 top-0 z-50 hidden h-full w-full bg-[#00000050] opacity-0 transition-all '}
    >
      <div
        ref={modalRef}
        className='absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white'
      >
        <div className='flex justify-end'>
          <button
            type='button'
            className='p-2'
            onClick={closeHandler}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              className='text-gray-500'
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6L18 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
