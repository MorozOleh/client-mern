import { Header } from './components/Header/Header';
import { Router } from './router';

export const App = (): JSX.Element => {
  return (
    <>
      <Header />
      <Router />
    </>
  );
};
