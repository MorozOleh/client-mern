import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const name = 'posts';

interface InitialStateProps {
  id: string,
  title: string,
  content: string
}

const initialState: InitialStateProps[] = [
  { id: '1', title: 'First post', content: 'Hello world!!!'},
  { id: '2', title: 'Second post', content: 'Hello People!!!'},
];

const postsSlice = createSlice({
  name,
  initialState,
  reducers: {
    addPost: (state, action: PayloadAction<InitialStateProps>) => {
      state.push(action.payload);
    }
  }
});

export const { addPost } = postsSlice.actions;


export default postsSlice.reducer;