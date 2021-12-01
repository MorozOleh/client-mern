import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  TextField,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import styles from './ToDoExercise.module.scss';
import axios from 'axios';

const initialValues = {
  inventory_id: '',
  quantity: '',
};

export const ToDoExercise = (): JSX.Element => {
  const [input, setInput] = useState(initialValues);
  const [inventories, setInventories] = useState([]);
  const [open, setOpen] = useState(false);

  const getAllInventories = async () => {
    const { data } = await axios.get('http://localhost:4000/api/inventory');

    setInventories(data);
  };

  useEffect(() => {
    getAllInventories();
  }, []);

  const changeHandler = (
    e: React.ChangeEvent<{
      name?: string;
      value: unknown;
    }>
  ) => {
    const { value, name } = e.target;
    setInput({
      ...input,
      [name]: value,
    });
  };

  const clickHandler = async () => {
    const options = {
      ...input,
      person_id: JSON.parse(localStorage.getItem('userData')).userId,
    };

    try {
      await axios.post('http://localhost:4000/api/exercise/create', options);
      setOpen(true);
      setInput(initialValues);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box className={styles.container}>
      <Typography className={styles.title}>Select Exercise</Typography>
      <Select
        name="inventory_id"
        value={input.inventory_id}
        variant="outlined"
        className={styles.select}
        onChange={changeHandler}
        MenuProps={{
          MenuListProps: {
            className: styles.list,
          },
        }}
      >
        <MenuItem value=""></MenuItem>
        {inventories.map(({ id, name }) => {
          return (
            <MenuItem value={id} key={id}>
              <em>{name}</em>
            </MenuItem>
          );
        })}
      </Select>
      {input.inventory_id && (
        <>
          <Typography className={styles.title}>Quantity</Typography>
          <TextField
            value={input.quantity}
            variant="outlined"
            name="quantity"
            fullWidth
            onChange={changeHandler}
          />
        </>
      )}
      <Button className={styles.btn} onClick={clickHandler}>
        Send
      </Button>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          This is a success message!
        </Alert>
      </Snackbar>
    </Box>
  );
};
