import { lazy, Suspense, useContext } from 'react';
import { useRoutes, Navigate } from 'react-router';

import { Login } from './components/Login/Login';
import { Pictures } from './components/Pictures/Pictures';
import Registration from './components/Registration/Registration';
import { Loader } from './components/Loader/Loader';
import { NotFound } from './components/NotFound/NotFound';
import { AuthContext } from './components/Contexts/AuthContext';
import { Counter } from './components/Counter/Counter';
import { PostsList } from './features/posts/PostsList';
import { CreatePost } from './features/posts/CreatePost';
import { SinglePostPage } from './features/posts/SinglePostPage';

const Exercises = lazy(
  () =>
    import(
      './components/Exercises/Exercises' /* webpackChunkName: "exercises" */
    )
);
const Transition = lazy(
  () =>
    import(
      './components/Transition/Transition' /* webpackChunkName: "transition" */
    )
);

export const Router = () => {
  const { isAuthenticated } = useContext(AuthContext);

  const AuthRoutes = useRoutes([
    { path: 'registration', element: <Registration /> },
    { path: 'login', element: <Login /> },
    { path: 'counter', element: <Counter /> },
    { path: 'posts', element: <PostsList /> },
    { path: 'posts/:postId', element: <SinglePostPage /> },
    { path: 'create', element: <CreatePost /> },
    { path: '*', element: <Navigate to="login" /> },
  ]);

  const Routes = useRoutes([
    { path: 'registration', element: <Registration /> },
    { path: 'login', element: <Login /> },
    { path: 'transition', element: <Transition /> },
    { path: 'exercises', element: <Exercises /> },

    {
      path: 'pictures',
      element: <Pictures />,
      children: [
        {
          path: 'img',
          element: (
            <div>
              If you want see me like a child, do not forgot to insert Outlet
              inside parent component
            </div>
          ),
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ]);

  return (
    <Suspense fallback={<Loader />}>
      {isAuthenticated ? Routes : AuthRoutes}
    </Suspense>
  );
};
