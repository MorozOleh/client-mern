import React, { useState, useEffect } from 'react';
import { Box, TextField, Typography } from '@material-ui/core';
import { DesktopDatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { formatDate } from '../../helpers/utils';

import styles from './Exercises.module.scss';
import axios from 'axios';
import { ToDoExercise } from './ToDoExercise/ToDoExercise';

export const Exercises = () => {
  const [value, setValue] = useState(new Date());
  const [data, setData] = useState(null);

  const getData = async (time, id) => {
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
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Date desktop"
          inputFormat="dd/MM/yyyy"
          value={value}
          onChange={setValue}
          renderInput={(params) => (
            <TextField classes={{ root: styles.calendar }} {...params} />
          )}
        />
      </LocalizationProvider>
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
              {data.done_exercises.map((inv, id) => {
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
