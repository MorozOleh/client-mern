// import React from 'react';
import styles from './NotFound.module.scss';
import { Typography } from '@material-ui/core';

export const NotFound = (): JSX.Element => {
  return (
    <div className={styles.container}>
      <Typography className={styles.title}>404</Typography>
    </div>
  );
};
