import React from 'react';
import {useContext} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { UserContext } from './usercontext';

export const ProtectedRoute = ({component: Component, ...rest}) => {
    const {user} = useContext(UserContext);
    return(
        <Route {...rest} render={
            (props) => {
                if(user !== null && user.authenticated){
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