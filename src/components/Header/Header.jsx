import React, { useRef, useEffect } from 'react';
import {
  List,
  AppBar,
  Toolbar,
  Typography,
  ListItem,
  IconButton,
} from '@material-ui/core';
import { Link, NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from './Header.module.scss';
import { useAuth } from '../../hooks/useAuth';

export const Header = () => {
  const { logout } = useAuth();

  return (
    <AppBar position="static" className={styles.root}>
      <Toolbar className={styles.toolbar}>
        <Typography variant="h6">Users</Typography>
        <List disablePadding className={styles.list}>
          <ListItem className={styles.item}>
            <NavLink to="/exercises" className={`${styles.link}`}>
              Exercises
            </NavLink>
          </ListItem>
          <ListItem className={styles.item}>
            <Link to="/pictures" className={styles.link}>
              Pictures
            </Link>
          </ListItem>
          <ListItem className={styles.item}>
            <Link to="/registration" className={styles.link}>
              Registration page
            </Link>
          </ListItem>
          <ListItem className={styles.item}>
            <Link to="/login" className={styles.link}>
              Login page
            </Link>
          </ListItem>
        </List>
        <IconButton onClick={logout}>
          <ExitToAppIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};
