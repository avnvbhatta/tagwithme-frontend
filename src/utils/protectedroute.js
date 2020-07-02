import React from 'react';
import {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { LoggedInContext } from './loggedincontext';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {isLoggedIn} = useContext(LoggedInContext);
    return(
        <Route {...rest} render={
            (props) => {
                if(isLoggedIn){
                    return <Component {...props}/>
                }else{
                    return <Redirect to={
                        {
                            pathname: "/login",
                            state: {
                                from: props.location
                            }
                        }
                    }/>
                }
            }
        }/>
    )
}
export default ProtectedRoute;