import { CSSTransition } from 'react-transition-group';
import { useContext } from 'react';

import {
  List,
  AppBar,
  Toolbar,
  Typography,
  ListItem,
  IconButton,
} from '@material-ui/core';
import { NavLink } from 'react-router-dom';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import styles from './Header.module.scss';
import { AuthContext } from '../Contexts/AuthContext';

export const Header = (): JSX.Element => {
  const { logout } = useContext(AuthContext);

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
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? 'black' : 'white',
                      })}
                      to="/transition"
                      className={`${styles.link}`}
                    >
                      Transition
                    </NavLink>
                  </ListItem>
                  <ListItem className={styles.item}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? 'black' : 'white',
                      })}
                      to="/exercises"
                      className={`${styles.link}`}
                    >
                      Exercises
                    </NavLink>
                  </ListItem>
                  <ListItem className={styles.item}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? 'black' : 'white',
                      })}
                      to="/pictures"
                      className={styles.link}
                    >
                      Pictures
                    </NavLink>
                  </ListItem>
                  <ListItem className={styles.item}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? 'black' : 'white',
                      })}
                      to="/registration"
                      className={styles.link}
                    >
                      Registration page
                    </NavLink>
                  </ListItem>
                  <ListItem className={styles.item}>
                    <NavLink
                      style={({ isActive }) => ({
                        color: isActive ? 'black' : 'white',
                      })}
                      to="/login"
                      className={styles.link}
                    >
                      Login page
                    </NavLink>
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
