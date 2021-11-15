import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, List, ListItem, Typography } from '@material-ui/core';
import axios from 'axios';
import styles from './Posts.module.scss';

export const Posts = function () {
  const [posts, setPosts] = useState([]);

  const getPosts = async (token) => {
    const { data } = await axios.get('http://localhost:4000/api/posts', {
      headers: {
        Authorization: `Barrier: ${token}`,
      },
    });
    setPosts(data);
  };

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      getPosts(JSON.parse(localStorage.getItem('userData')).token);
    }
  }, []);

  return (
    <Box className={styles.container}>
      <List className={styles.list}>
        {posts.map((post) => (
          <Link key={post._id} to={post._id} className={styles.link}>
            <ListItem className={styles.item}>
              <Typography component="h2" className={styles.title}>
                {post.title}
              </Typography>
              <Typography>{post.description}</Typography>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
};
