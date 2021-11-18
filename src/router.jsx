import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';

import { Login } from './components/Login/Login';
import { Pictures } from './components/Pictures/Pictures';
import Registration from './components/Registration/Registration';
import { Loader } from './components/Loader/Loader';

const Exercises = lazy(() =>
  import('./components/Exercises/Exercises' /* webpackChunkName: "exercises" */)
);
const Transition = lazy(() =>
  import(
    './components/Transition/Transition' /* webpackChunkName: "transition" */
  )
);

export const Router = ({ auth }) => {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        <Route path="/transition" exact>
          <Transition />
        </Route>
        <Route path="/exercises" exact>
          <Exercises />
        </Route>
        <Route path="/pictures" exact>
          <Pictures />
        </Route>
        <Route path="/registration" exact>
          <Registration />
        </Route>
        <Route path="/login" exact>
          <Login />
        </Route>
      </Switch>
    </Suspense>
  );
};
