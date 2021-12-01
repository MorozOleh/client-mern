import { useAppSelector } from '../../app/hooks';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { Link } from 'react-router-dom';

import styles from './PostsList.module.scss';

export const PostsList = (): JSX.Element => {
  const posts = useAppSelector((state) => state.posts);

  return (
    <Box className={styles.container}>
      <Typography component="h2" className={styles.title}>
        Title
      </Typography>
      {posts.map((post) => {
        return (
          <Card key={post.id} className={styles.card} variant="outlined">
            <CardContent>
              <Typography component="h3">{post.title}</Typography>
              <Typography>{post.content}</Typography>
              <Link to={`/posts/${post.id}`}>show post</Link>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
};
