import { Route, Switch } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login';
import { Registration } from './components/Registration/Registration';
import { Pictures } from './components/Pictures/Pictures';
import { useAuth } from './hooks/useAuth';
import { Exercises } from './components/Exercises/Exercises';

export const App = () => {
  const { token, userId } = useAuth();

  return (
    <>
      <Header />
      <Switch>
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
    </>
  );
};
