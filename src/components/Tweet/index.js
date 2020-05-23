import React, {useState, useEffect} from 'react'

import Moment from 'react-moment';

import {ReactComponent as ReactLogo} from '../../assets/images/icon.svg';

import './style.css';

export default function Tweet( { Tweet, User } ) {

    return(
        <div className="container-tweet">
            <div className="image-user">
                <ReactLogo className="icon"/>
            </div>
            <div className="content-tweet">
                <div className="header-tweet">
                    <div className="user-info">
                        <span className="name">{ User.name }</span>
                        <div className="last-info">
                            <span className="username">{ `@${User.username}` }</span>
                            <span className="separator">.</span>
                            <Moment 
                                fromNow ago
                                >{ Tweet.created_at }</Moment>
                        </div>
                    </div>
                </div>
                <div className="body-tweet">
                    <p className="display-linebreak">
                        { Tweet.post }
                    </p>
                </div>
                <div className="content-actions">

                </div>
            </div>
        </div>
    );
}