import React, { useState } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Box, Button, Typography } from '@material-ui/core';
import styles from './Transition.module.scss';

import { nanoid } from 'nanoid';

const Transition = () => {
  const [elems, setElems] = useState([
    { id: nanoid() },
    { id: nanoid() },
    { id: nanoid() },
  ]);

  const addElem = () => {
    setElems([...elems, { id: nanoid() }]);
  };

  const deleteElem = (id) => {
    setElems(elems.filter((elem) => elem.id !== id));
  };

  return (
    <Box className={styles.container}>
      <CSSTransition
        in={true}
        timeout={1000}
        appear={true}
        unmountOnExit
        classNames={{
          appear: styles['button-appear'],
          appearActive: styles['button-appear-active'],
        }}
      >
        <Button className={styles.button} onClick={addElem}>
          add task
        </Button>
      </CSSTransition>

      <TransitionGroup component="ul" className={styles.list}>
        {elems.map((el) => {
          return (
            <CSSTransition
              key={el.id}
              timeout={500}
              appear={true}
              unmountOnExit
              classNames={{
                appear: styles['item-appear'],
                appearActive: styles['item-appear-active'],
                enter: styles['item-enter'],
                enterActive: styles['item-enter-active'],
                exit: styles['item-exit'],
                exitActive: styles['item-exit-active'],
              }}
            >
              <li className={styles['item']}>
                <Typography>{el.id}</Typography>
                <Button
                  className={styles.btn}
                  onClick={() => {
                    deleteElem(el.id);
                  }}
                >
                  delete task
                </Button>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    </Box>
  );
};

export default Transition;
