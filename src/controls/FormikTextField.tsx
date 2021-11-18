import { useField } from 'formik';
import { TextField, TextFieldProps } from '@material-ui/core';
import { forwardRef } from 'react';

type FormikTextFieldProps = TextFieldProps & {
  name: string;
};

export const FormikTextField = forwardRef(
  ({ name, ...props }: FormikTextFieldProps, ref) => {
    const [fields] = useField(name);

    return (
      <TextField
        {...props}
        {...fields}
        innerRef={ref}
        fullWidth
        variant="outlined"
      />
    );
  }
);
