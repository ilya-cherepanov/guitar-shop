import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../store';
import { RootState } from '../types/store';


export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
