import axios from 'axios';
import { useState, useEffect, useRef, useCallback, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { Card, CardMedia } from '@material-ui/core';
import { useMount } from '../../hooks/useMount';
import { CSSTransition } from 'react-transition-group';

import styles from './Pictures.module.scss';
import { AuthContext } from '../Contexts/AuthContext';

interface Picture {
  imageUrl: string;
  alt: string;
  desc: string;
}

export const Pictures = (): JSX.Element => {
  const [images, setImages] = useState<[] | Picture[]>([]);
  const [loading, setLoading] = useState(false);
  const [next, setNext] = useState(true);
  const [limit] = useState(6);
  const [page, setPage] = useState(1);
  const { isMounted } = useMount();
  const contRef = useRef(null);

  const { isAuthenticated } = useContext(AuthContext);

  console.log(isAuthenticated);

  const observer = useRef<IntersectionObserver>();

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

      if (node) observer && observer.current && observer.current.observe(node);
    },
    [loading]
  );

  useEffect(() => {
    loadImages();
  }, [page]);

  return (
    <>
      <Outlet />
      <CSSTransition
        in={isMounted}
        timeout={0}
        classNames={{
          enterDone: styles['root-enter-done'],
        }}
        nodeRef={contRef}
      >
        <div className={styles.root} ref={contRef}>
          {images.map(({ imageUrl }, id) => {
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
        </div>
      </CSSTransition>

      <Link to="img">new</Link>
    </>
  );
};
