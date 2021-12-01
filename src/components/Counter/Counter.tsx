import { useAppSelector, useAppDispatch } from '../../app/hooks';
import {
  increment,
  decrement,
  incrementByAmount,
  decrementByAmount,
} from '../../features/counter/counterSlice';
import { Button, TextField } from '@mui/material';
import { ChangeEvent, useState } from 'react';

export const Counter = (): JSX.Element => {
  const [amount, setAmount] = useState<number>(0);

  const count = useAppSelector((state) => state.counter.value);
  const dispatch = useAppDispatch();

  const changeHandler = (
    event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
    const parsedInt = parseInt(event.target.value);

    if (parsedInt) {
      setAmount(parsedInt);
    }
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(increment());
        }}
      >
        increment
      </Button>
      <div>{count}</div>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(decrement());
        }}
      >
        decrement
      </Button>
      <TextField
        name="amount"
        value={amount}
        onChange={changeHandler}
        fullWidth
      />
      <Button
        variant="contained"
        onClick={() => {
          dispatch(incrementByAmount(amount));
        }}
      >
        increase by amount
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          dispatch(decrementByAmount(amount));
        }}
      >
        decrease by amount
      </Button>
    </>
  );
};
