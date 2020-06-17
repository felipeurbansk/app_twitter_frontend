import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiUpload } from "react-icons/fi";
import { FaRetweet, FaRegHeart } from "react-icons/fa";
import PhotoDefault from "../../assets/images/profile.png";
import ViewComments from "../ViewComments";

import api from "../../service/api";

import Moment from "react-moment";

import "./style.css";

function Tweet({ tweet, user }) {
  const [showModalComments, setShowModalComments] = useState(false);
  const [tweetLike, setTweetLike] = useState(false);

  function modalViewComments() {
    setShowModalComments(true);
  }

  async function likeTweet(id) {
    try {
      const like = await api
        .put(`like/${id}`)
        .then((success) => {
          setTweetLike(success.data.like);
        })
        .catch((err) => {
          console.log({ err });
        });
    } catch (err) {
      console.log({ err });
    }
  }

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
            <Link to="#" onClick={modalViewComments}>
              <FiMessageSquare className="icon-actions" />
            </Link>
            <span className="count-actions">0</span>
          </div>
          <div className="action-retweet">
            <FaRetweet className="icon-actions" />
            <span className="count-actions">0</span>
          </div>
          <div className="action-like">
            <Link to="#" onClick={() => likeTweet(tweet.id)}>
              <FaRegHeart className={`icon-actions ${tweetLike && "active"}`} />
            </Link>
            <span className="count-actions">{tweet.likes}</span>
          </div>
          <div className="action-options">
            <FiUpload className="icon-actions" />
          </div>
        </div>
      </div>
      {showModalComments ? (
        <ViewComments
          show={showModalComments}
          tweet_id={tweet.id}
          onHide={() => {
            setShowModalComments(false);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
}

export default memo(Tweet);
