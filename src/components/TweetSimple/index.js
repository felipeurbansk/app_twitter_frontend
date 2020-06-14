import React, { useEffect } from "react";

import PhotoDefault from "../../assets/images/profile.png";

import Moment from "react-moment";

import "./style.css";

export default function TweetSimple({ tweet }) {
  useEffect(() => {
    console.log({ tweet });
  }, []);

  return (
    <div className="container-tweet">
      <div className="image-user">
        {tweet && tweet.photo ? (
          <img src={tweet.photo} alt="Foto do usuário" />
        ) : (
          <img src={PhotoDefault} alt="Foto do usuário" />
        )}
      </div>
      <div className="content-tweet">
        <div className="header-tweet">
          <div className="user-info">
            <span className="name">
              {tweet && tweet.name ? tweet.name : ""}
            </span>
            <div className="last-info">
              <span className="username">{`@${
                tweet && tweet.username ? tweet.username : ""
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
