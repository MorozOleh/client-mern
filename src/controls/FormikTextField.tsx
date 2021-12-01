import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';

type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

export const FormikTextField = ({ name, ...props }: FormikTextFieldProps) => {
  const [fields] = useField(name);

  return <TextField {...props} {...fields} fullWidth variant="outlined" />;
};
