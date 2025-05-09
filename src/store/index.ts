import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import rootReducer from './reducers';


export type RootState = ReturnType<typeof rootReducer>;


export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const loadState = () => {
  try {
    if( !(typeof window === 'undefined') ){
     const serializedState = window.localStorage.getItem('app-state');

    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  }
  } catch (err) {
    console.error("Could not load state", err);
    return undefined;
  }
};

export const saveState = (state:RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    if( !(typeof window === 'undefined') )
      window.localStorage.setItem('app-state', serializedState);
  } catch (err) {
    console.error("Could not save state", err);
  }
};



const persistedState = loadState();

const store = configureStore({
  reducer: rootReducer,
  // preloadedState:persistedState
});

store.subscribe(() => {
  saveState(store.getState());
});


export default store;