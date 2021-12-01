import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export const Post = function () {
  const [post, setPost] = useState(null);
  const { id } = useParams();

  const getPost = async (id) => {
    const { data } = await axios.get(`http://localhost:4000/api/posts/${id}`);

    setPost(data);
  };

  useEffect(() => {
    getPost(id);
  }, []);
  return <div>{JSON.stringify(post, null, 4)}</div>;
};
