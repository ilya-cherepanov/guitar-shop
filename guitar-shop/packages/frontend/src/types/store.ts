import { AnyAction, ThunkAction } from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';
import { store } from '../store';

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, AxiosInstance, AnyAction>;
