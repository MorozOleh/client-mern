import React, { useRef} from 'react'
import { Box , Button} from '@material-ui/core'
import { Formik, Form } from 'formik'
import { CSSTransition } from 'react-transition-group'

import {useMount} from '../../hooks/useMount'
import { FormikTextField } from '../../controls/FormikTextField'

import axios from 'axios'
import * as Yup from 'yup';
import styles from './Registration.module.scss'


export const Registration = () => {
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
          validationSchema={
            Yup
              .object()
              .shape({
                name: Yup
                  .string()
                  .min(3)
                  .required(),
                email: Yup
                  .string()
                  .email()
                  .required(),
                phoneNumber: Yup
                  .string()
                  .min(10)
                  .matches(/^[0-9]/)
                  .required(),
                password: Yup
                  .string()
                  .matches(/^[a-zA-Z0-9]/)
                  .min(8)
                  .required(),
            })
          }
          validateOnBlur={false}
          initialValues={{
              name: "",
              phoneNumber: "",
              password: "",
              email: ""
          }}
          onSubmit={async(values, {resetForm, setErrors}) => {

            try {
              const { data } = await axios.post('http://localhost:4000/api/registration', values);

              if (data.email) {
                setErrors({email: data.email})
                
                throw Error(data.message)
              }
              resetForm()
              
            } catch (e) {
              console.log(e.message)
            }


          } }
        >
          {({ errors }) => {
            return (
              <Form 
                className={styles.form}
                ref={formRef}
              >
                <FormikTextField 
                  className={styles.input} 
                  name='name' 
                  label="Name"
                  helperText={errors.name || ''}
                  error={!!errors.name}
                  />
                <FormikTextField 
                  className={styles.input} 
                  name='phoneNumber' 
                  label="PhoneNumber" 
                  helperText={errors.phoneNumber || ''}
                  error={!!errors.phoneNumber}
                  />
                <FormikTextField 
                  className={styles.input} 
                  name='email' 
                  label="Email" 
                  helperText={errors.email || ''}
                  error={!!errors.email}
                  />
                <FormikTextField 
                  className={styles.input} 
                  name='password' 
                  label="Password" 
                  type="password"
                  helperText={errors.password || ''}
                  error={!!errors.password}
                  />
                <Button
                  variant="outlined"
                  color="secondary"
                  type="submit"
                >
                  Submit
                </Button>

              </Form>

            )
          }}

        </Formik>
          </CSSTransition>
    </Box>
  )
}
