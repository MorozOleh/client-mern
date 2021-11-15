import React, { useEffect } from 'react';
import { Formik, Form } from 'formik';
import { Box, Button } from '@material-ui/core';
import { useHistory } from 'react-router';
import * as Yup from 'yup';
import axios from 'axios';
import { useAuth } from '../../hooks/useAuth';

import { FormikTextField } from '../../controls/FormikTextField';

import styles from './NewPost.module.scss';

export const NewPost = function () {
  const { token } = useAuth();
  const { push } = useHistory();

  useEffect(() => {
    if (!localStorage.getItem('userData')) {
      push('/login');
    }
  }, []);

  const submitHandler = async (values) => {
    const { data } = await axios.post(
      'http://localhost:4000/api/posts/create',
      values,
      {
        headers: {
          Authorization: `Barrier ${token}`,
        },
      }
    );

    console.log(data);
  };
  return (
    <Box className={styles.container}>
      <Formik
        validationSchema={Yup.object().shape({
          title: Yup.string().min(5).required(),
          description: Yup.string().min(20).required(),
        })}
        onSubmit={submitHandler}
        initialValues={{
          title: '',
          description: '',
        }}
      >
        {({ errors }) => (
          <Form className={styles.form}>
            <FormikTextField
              name="title"
              label="Title"
              helperText={errors?.title || ' '}
              error={!!errors?.title}
            />
            <FormikTextField
              name="description"
              label="Description"
              multiple
              helperText={errors?.description || ' '}
              error={!!errors?.description}
            />
            <Button type="submit">Submit</Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
