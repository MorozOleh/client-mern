import { useState, useEffect } from 'react';
import { Box, Typography } from '@material-ui/core';
import { formatDate } from '../../helpers/utils';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import styles from './Exercises.module.scss';
import axios from 'axios';
import { ToDoExercise } from './ToDoExercise/ToDoExercise';

interface DataProps {
  message: string;
  user: {
    first_name: string;
    last_name: string;
    person_id: string;
  };
  done_exercises: {
    name: string;
    quantity: string;
  }[];
}

const Exercises = (): JSX.Element => {
  const [value, setValue] = useState(new Date());
  const [data, setData] = useState<DataProps | null>(null);

  const getData = async (time: string, id: string) => {
    const { data } = await axios.get(
      `http://localhost:4000/api/exercise/?time=${time}&id=${id}`
    );
    setData(data);
  };

  useEffect(() => {
    getData(
      formatDate(value),
      JSON.parse(localStorage.getItem('userData'))?.userId
    );
  }, [value]);

  return (
    <Box className={styles.container}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="yyyy/MM/dd"
          margin="normal"
          id="date-picker-inline"
          label="Date picker inline"
          value={value}
          onChange={(e) => {
            setValue(e);
          }}
        />
      </MuiPickersUtilsProvider>

      {data && (
        <Box className={styles.wrapper}>
          <Typography>{data?.user?.first_name}</Typography>
          <Typography>{data?.user?.last_name}</Typography>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Inventories</th>
                <th>Quantities</th>
              </tr>
            </thead>

            <tbody>
              {data.done_exercises.map((inv, id: number) => {
                return (
                  <tr key={id}>
                    <td className={styles.tbody}>{inv.name}</td>
                    <td className={styles.tbody}>{inv.quantity}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Box>
      )}
      <ToDoExercise />
    </Box>
  );
};

export default Exercises;
