import {Route, Switch} from 'react-router-dom'
import { Header } from './components/Header/Header';
import { Login } from './components/Login/Login'
import { Registration } from './components/Registration/Registration';
import { useAuth } from './hooks/useAuth'

export const App = () => {

    const {token, userId} = useAuth()

    console.log(token)
    console.log(userId)
    return ( 
        <>
        <Header />
        <Switch>
            <Route path="/" exact >Hello home</Route>
            <Route path="/about" exact >Hello About</Route>
            <Route path="/registration" exact><Registration /></Route>
            <Route path="/login" exact><Login /></Route>
        </Switch>
  
        </>
    );
}