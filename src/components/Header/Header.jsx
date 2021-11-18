import React, { useRef, useEffect } from 'react';
import { CSSTransition } from 'react-transition-group';

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
    <CSSTransition
      unmountOnExit
      in={true}
      timeout={1000}
      appear={true}
      classNames={{
        appear: styles['root-appear'],
        appearActive: styles['root-appear-active'],
      }}
    >
      {(stage) => {
        console.log(stage);
        return (
          <AppBar position="static" className={styles.root}>
            <Toolbar className={styles.toolbar}>
              <Typography variant="h6">Users</Typography>
              <CSSTransition
                in={stage === 'entered'}
                timeout={1000}
                unmountOnExit
                classNames={{
                  enter: styles['list-enter'],
                  enterActive: styles['list-enter-active'],
                }}
              >
                <List disablePadding className={styles.list}>
                  <ListItem className={styles.item}>
                    <NavLink to="/transition" className={`${styles.link}`}>
                      Transition
                    </NavLink>
                  </ListItem>
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
              </CSSTransition>
              <CSSTransition
                in={stage === 'entered'}
                timeout={1000}
                unmountOnExit
                classNames={{
                  enter: styles['button-enter'],
                  enterActive: styles['button-enter-active'],
                }}
              >
                <IconButton onClick={logout} className={styles.button}>
                  <ExitToAppIcon />
                </IconButton>
              </CSSTransition>
            </Toolbar>
          </AppBar>
        );
      }}
    </CSSTransition>
  );
};
