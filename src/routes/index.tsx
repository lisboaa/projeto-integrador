import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Scheduled from '../pages/Agendamento';
// import Route from './Route';
import DashBoard from '../pages/DashBoard';
import SignIn from '../pages/Signin';
import SignUp from '../pages/SignUp';

const Rotas: React.FC = () => (
    <Switch>
        <Route path='/' exact component={SignIn}/>
        <Route path='/signup' component={SignUp}/>

        <Route path='/dashboard' component={DashBoard} />

        <Route path='/scheduled' component={Scheduled} />
    </Switch>
);

export default Rotas;
