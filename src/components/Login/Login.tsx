import { useContext, useRef } from 'react';
import { Box, Button } from '@material-ui/core';
import { Formik, Form } from 'formik';
import { CSSTransition } from 'react-transition-group';

import { useMount } from '../../hooks/useMount';
import { FormikTextField } from '../../controls/FormikTextField';

import axios from 'axios';
import * as Yup from 'yup';
import styles from './Login.module.scss';
import { AuthContext } from '../Contexts/AuthContext';

export const Login = (): JSX.Element => {
  const formRef = useRef(null);
  const { isMounted } = useMount();
  const { login } = useContext(AuthContext);

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
            email: Yup.string().email().required(),
            password: Yup.string()
              .matches(/^[a-zA-Z0-9]/)
              .min(8)
              .required(),
          })}
          validateOnBlur={false}
          initialValues={{
            email: '',
            password: '',
          }}
          onSubmit={async (values, { resetForm, setErrors }) => {
            const { data, status } = await axios.post(
              'http://localhost:4000/api/login',
              values
            );

            if (status === 202) {
              resetForm();
              setErrors({
                email: 'check your credentials',
                password: 'check your credentials',
              });
              return;
            }

            login(data.token, data.userId);

            resetForm();
          }}
        >
          {({ errors }) => {
            return (
              <Form className={styles.form} ref={formRef}>
                <FormikTextField
                  autoFocus
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
