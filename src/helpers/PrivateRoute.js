import React, {useState, useEffect} from 'react';
// import Auth from '../service/auth'

import {Redirect, Route} from 'react-router-dom';


export default function PrivateRoute ( { component:Component, ...rest} ) {
    
    let [authUser, setAuth] = useState(true);

    useEffect( () => {
        authenticate();
    }, [])

    function authenticate() {
        // setAuth( Auth.isAuthenticated() );
    }
    
    return(
        <Route 
            { ...rest }
            render={ props => 
                authUser ? ( 
                        <Component { ...props } />
                    ) : (
                        <Redirect to={{
                                pathname: "/",
                                state: { from: props.location }
                            }}
                        />
                    )

            }
        />
    );

}