import { TAppDispatch } from '@/store/store';
import { useDispatch } from 'react-redux';

export const useAppDispatch: () => TAppDispatch = useDispatch;
