import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import {connect} from "react-redux";

export const ProtectedRoute = ({component: Component, isLoggedIn, ...rest}) => {
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

const mapStateToProps = (state) => {
    return{
        isLoggedIn: state.isLoggedIn
    }
}
export default connect(mapStateToProps, null)(ProtectedRoute);