import React from 'react';
// import { useAuth } from '../hooks/auth';
import { 
    Route as ReactDOMRoute,
    RouteProps as ReactDOMRouteProps }
     from 'react-router-dom';

interface RouteProps extends ReactDOMRouteProps {
    isPrivate?: Boolean;
    component: React.ComponentType;
}

// function checkAuth()

const Route: React.FC<RouteProps> = ({ 
    isPrivate = false,
    component: Component,
    ...rest
    }) => {
    // const {instrutor} = useAuth();

    // console.log(instrutor, isPrivate);
    
    return(
        <ReactDOMRoute
        { ...rest}
        render={({  }) => {
            return null;
        }}
        />
    );
};

export default Route;