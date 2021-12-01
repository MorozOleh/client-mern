import { configureStore } from '@reduxjs/toolkit';
import counterSlice from '../features/counter/counterSlice';
import postsSlice from '../features/posts/postsSlice';

const store = configureStore({
  reducer: {
    counter: counterSlice,
    posts: postsSlice
  }
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;