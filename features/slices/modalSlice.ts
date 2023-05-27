import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../../store/store';
import {ISeries} from '../../types';

interface IModal {
  isOpen: boolean;
  content: ISeries | null;
}

const initialState: IModal = {
  isOpen: false,
  content: null,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IModal>) => {
      state.isOpen = action.payload.isOpen;
      state.content = action.payload.content;
    },

    closeModal: (state) => {
      state.isOpen = false;
      state.content = null;
    }
  }
});

export const {openModal} = modalSlice.actions;
export const selectModal = (state: RootState) => state.modal;
export default modalSlice.reducer;

