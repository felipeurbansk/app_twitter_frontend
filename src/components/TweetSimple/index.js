import React from "react";

import PhotoDefault from "../../assets/images/profile.png";

import Moment from "react-moment";

import "./style.css";

export default function TweetSimple({ tweet, user }) {
  return (
    <div className="container-tweet">
      <div className="image-user">
        {user && user.photo ? (
          <img src={user.photo} alt="Foto do usuário" />
        ) : (
          <img src={PhotoDefault} alt="Foto do usuário" />
        )}
      </div>
      <div className="content-tweet">
        <div className="header-tweet">
          <div className="user-info">
            <span className="name">{user && user.name ? user.name : ""}</span>
            <div className="last-info">
              <span className="username">{`@${
                user && user.username ? user.username : ""
              }`}</span>
              <span className="separator">.</span>
              <Moment fromNow ago>
                {tweet ? tweet.created_at : ""}
              </Moment>
            </div>
          </div>
        </div>
        <div className="body-tweet">
          <p className="tweet_post">{tweet ? tweet.comment : ""}</p>
        </div>
      </div>
    </div>
  );
}
