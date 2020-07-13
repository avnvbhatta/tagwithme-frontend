import React, {useState, useEffect} from 'react';
import { Route, Redirect, withRouter } from 'react-router-dom';
import { LoadingOutlined } from '@ant-design/icons';
import { connect } from 'react-redux'


export const ProtectedRoute = ({component, isLoggedIn, isAuthenticating, ...rest}) => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        if(isAuthenticating){
            setLoaded(false);
        }
        else{
            setLoaded(true);
        }
    }, [isAuthenticating])

    let ComponentToRender = component;
    if(!localStorage.getItem('jwt')){
        return <Redirect
            to={{
                pathname: "/login",
                
            }}
        />
    }
    if(!loaded){
        return <LoadingOutlined />
    }
    return(
        <Route
            {...rest}
            render={props =>
                isLoggedIn ? (
                    <ComponentToRender {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: props.location }
                        }}
                    />
                )
            }
        />
    )
}

const mapStateToProps  = (state) => ({ 
    isLoggedIn: state.isLoggedIn,
    isAuthenticating: state.isAuthenticating
});

export default connect(mapStateToProps)(withRouter(ProtectedRoute));