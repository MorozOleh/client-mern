import React, { useRef } from 'react';
import { useHistory } from 'react-router';
import { Box, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { CSSTransition } from 'react-transition-group';

import { useMount } from '../../hooks/useMount';
import { FormikTextField } from '../../controls/FormikTextField';

import axios from 'axios';
import * as Yup from 'yup';
import styles from './Registration.module.scss';

export const Registration = () => {
  const { push } = useHistory();
  const formRef = useRef(null);
  const { isMounted } = useMount();

  return (
    <Box className={styles.container}>
      <CSSTransition
        in={isMounted}
        timeout={0}
        classNames={{
          enterDone: styles['form-enter-done'],
        }}
        nodeRef={formRef}
      >
        <Formik
          validationSchema={Yup.object().shape({
            name: Yup.string().min(3).required(),
            email: Yup.string().email().required(),
            last_name: Yup.string().min(3).required(),
            password: Yup.string()
              .matches(/^[a-zA-Z0-9]/)
              .min(8)
              .required(),
          })}
          validateOnBlur={false}
          initialValues={{
            name: '',
            last_name: '',
            password: '',
            email: '',
          }}
          onSubmit={async (values, { resetForm, setErrors }) => {
            console.log(values);

            try {
              const { data } = await axios.post(
                'http://localhost:4000/api/registration',
                values
              );

              if (data.email) {
                setErrors({
                  email: data.email,
                });

                throw Error(data.message);
              }
              resetForm();
              push('/login');
            } catch (e) {
              console.log(e.message);
            }
          }}
        >
          {({ errors }) => {
            return (
              <Form className={styles.form} ref={formRef}>
                <FormikTextField
                  className={styles.input}
                  name="name"
                  label="First name"
                  helperText={errors.name || ''}
                  error={!!errors.name}
                />
                <FormikTextField
                  className={styles.input}
                  name="last_name"
                  label="Last name"
                  helperText={errors.last_name || ''}
                  error={!!errors.last_name}
                />
                <FormikTextField
                  className={styles.input}
                  name="email"
                  label="Email"
                  helperText={errors.email || ''}
                  error={!!errors.email}
                />
                <FormikTextField
                  className={styles.input}
                  name="password"
                  label="Password"
                  type="password"
                  helperText={errors.password || ''}
                  error={!!errors.password}
                />
                <Button variant="outlined" color="secondary" type="submit">
                  Submit
                </Button>
              </Form>
            );
          }}
        </Formik>
      </CSSTransition>
    </Box>
  );
};
