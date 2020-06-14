import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import { FiMessageSquare, FiUpload } from "react-icons/fi";
import { FaRetweet, FaRegHeart } from "react-icons/fa";
import PhotoDefault from "../../assets/images/profile.png";
import ViewComments from "../ViewComments";

import Moment from "react-moment";

import "./style.css";

function Tweet({ tweet, user }) {
  const [showModalComments, setShowModalComments] = useState(false);

  function modalViewComments() {
    setShowModalComments(true);
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
            <FaRegHeart className="icon-actions" />
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
