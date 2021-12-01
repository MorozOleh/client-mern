// import { nanoid } from 'nanoid';
import { ChangeEvent, useState } from 'react';
import { Box, TextField, Button } from '@material-ui/core';

import { useAppDispatch } from '../../app/hooks';

import styles from './CreatePost.module.scss';
import { nanoid } from '@reduxjs/toolkit';
import { addPost } from './postsSlice';

interface InitialFieldsProps {
  title: string;
  content: string;
}

const initialFields: InitialFieldsProps = {
  title: '',
  content: '',
};

interface PostProps extends InitialFieldsProps {
  id: string;
}

export const CreatePost = (): JSX.Element => {
  const [fields, setFields] = useState(initialFields);
  const dispatch = useAppDispatch();

  const changeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const { value, name } = event.target;

    setFields({ ...fields, [name]: value });
  };

  const submitHandler = () => {
    const newPost: PostProps = {
      id: nanoid(),
      title: fields.title,
      content: fields.content,
    };

    dispatch(addPost(newPost));
    setFields(initialFields);
  };

  return (
    <Box className={styles.container}>
      <TextField
        className={styles.input}
        fullWidth
        name="title"
        value={fields.title}
        label="Title"
        onChange={changeHandler}
      />
      <TextField
        className={styles.input}
        fullWidth
        name="content"
        value={fields.content}
        label="Content"
        onChange={changeHandler}
      />
      <Button variant="contained" type="submit" onClick={submitHandler}>
        create post
      </Button>
    </Box>
  );
};
