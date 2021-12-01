import { Box, Card, CardContent, Typography } from '@material-ui/core';
import { useAppSelector } from '../../app/hooks';

import { useParams, Link } from 'react-router-dom';

import styles from './SinglePostPage.module.scss';

export const SinglePostPage = (): JSX.Element => {
  const { postId } = useParams();

  const post = useAppSelector((state) =>
    state.posts.find(({ id }) => id === postId)
  );

  return (
    <Box className={styles.container}>
      <Link to="/posts">Go to posts</Link>

      {post ? (
        <Card className={styles.card} variant="outlined">
          <CardContent>
            <Typography component="h3">{post.title}</Typography>
            <Typography>{post.content}</Typography>
          </CardContent>
        </Card>
      ) : (
        <Typography>none of posts with {postId} were found </Typography>
      )}
    </Box>
  );
};
