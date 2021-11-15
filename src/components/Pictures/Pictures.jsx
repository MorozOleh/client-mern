import axios from 'axios';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Box, Card, CardMedia, Button } from '@material-ui/core';
import { useMount } from '../../hooks/useMount';
import { CSSTransition } from 'react-transition-group';

import styles from './Pictures.module.scss';

export const Pictures = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [total, setTotal] = useState(0);
  const [next, setNext] = useState(true);
  const [limit, setLimit] = useState(6);
  const [page, setPage] = useState(1);
  const { isMounted } = useMount();
  const contRef = useRef(null);

  const observer = useRef();

  const loadImages = async () => {
    setLoading(true);

    try {
      const { data } = await axios.get(
        `http://localhost:4000/api/pictures?limit=${limit}&page=${page}`
      );

      setImages([...images, ...data.images]);
      setNext(data.next);
      setLoading(false);
    } catch (error) {
      setLoading(false);

      console.log(error);
    }
  };

  const lastCardRef = useCallback(
    (node) => {
      if (loading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && next) {
          setPage(page + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    loadImages();
  }, [page]);

  return (
    <>
      <CSSTransition
        in={isMounted}
        timeout={0}
        classNames={{
          enterDone: styles['root-enter-done'],
        }}
        nodeRef={contRef}
      >
        <Box className={styles.root} ref={contRef}>
          {images.map(({ imageUrl, alt, desc }, id) => {
            if (images.length - 1 === id) {
              return (
                <Card
                  ref={lastCardRef}
                  key={id}
                  classes={{
                    root: `${styles.card} ${id}`,
                  }}
                >
                  <CardMedia
                    src={imageUrl}
                    component="img"
                    loading="lazy"
                    className={styles.image}
                  />
                </Card>
              );
            }
            return (
              <Card
                key={id}
                classes={{
                  root: `${styles.card} ${id}`,
                }}
              >
                <CardMedia
                  src={imageUrl}
                  component="img"
                  loading="lazy"
                  className={styles.image}
                />
              </Card>
            );
          })}
        </Box>
      </CSSTransition>
    </>
  );
};
