import React, { memo, useEffect } from "react";
import { FiMessageSquare, FiUpload } from "react-icons/fi";
import { FaRetweet, FaRegHeart } from "react-icons/fa";
import PhotoDefault from "../../assets/images/profile.png";

import Moment from "react-moment";

import "./style.css";

function Tweet({ tweet, user }) {
  useEffect(() => {
    console.log(tweet);
  });
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
                {tweet.created_at}
              </Moment>
            </div>
          </div>
        </div>
        <div className="body-tweet">
          <p className="tweet_post">{tweet.post}</p>
        </div>
        <div className="content-actions">
          <div className="action-messages">
            <FiMessageSquare className="icon-actions" />
            <span className="count-actions">0</span>
          </div>
          <div className="action-retweet">
            <FaRetweet className="icon-actions" />
            <span className="count-actions">0</span>
          </div>
          <div className="action-like">
            <FaRegHeart className="icon-actions" />
            <span className="count-actions">{tweet.likes}</span>
          </div>
          <div className="action-options">
            <FiUpload className="icon-actions" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Tweet);
