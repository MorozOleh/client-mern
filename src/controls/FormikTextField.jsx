import {useField} from 'formik';
import { TextField } from '@material-ui/core';

export const FormikTextField = ({ name, ...props }) => {
  const [fields] = useField(name)

  return (
    <TextField {...props}{...fields} fullWidth variant="outlined"/>
  )
}