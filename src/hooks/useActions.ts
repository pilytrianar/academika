import { ActionCreatorsMapObject, bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

export default function useActions<T extends ActionCreatorsMapObject<unknown>>(actions: T): T {
  const dispatch = useDispatch();
  return bindActionCreators<T, T>(actions, dispatch);
}
