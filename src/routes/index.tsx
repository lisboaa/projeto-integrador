import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';
import DashBoard from '../pages/DashBoard';
import SignIn from '../pages/Signin';
import SignUp from '../pages/SignUp';

const Rotas: React.FC = () => (
    <Switch>
        <Route path='/' exact component={SignIn}/>
        <Route path='/signup' component={SignUp}/>

        <Route path='/dashboard' component={DashBoard} isPrivate/>
    </Switch>
);

export default Rotas;
