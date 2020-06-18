import React, { useState, useEffect, memo } from "react";
import { Modal } from "react-bootstrap";
import { CircularProgressbar } from "react-circular-progressbar";
import PhotoDefault from "../../assets/images/profile.png";
import TweetSimple from "../TweetSimple";

import Moment from "react-moment";

import api from "../../service/api";

import "./style.css";

function ViewComments(props) {
  const [singleTweet, setSingleTweet] = useState([]);
  const [allComments, setAllComments] = useState([]);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getCommentsByTweetId(); // eslint-disable-next-line
  }, []);

  async function getCommentsByTweetId() {
    await api
      .get(`/getAllComments/${props.tweet_id}`)
      .then((success) => {
        setAllComments(success.data.comments);
        setSingleTweet(success.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function createComment(e) {
    e.preventDefault();
    if (comment.length > 0) {
      await api
        .post("/comments", {
          tweet_id: props.tweet_id,
          comment,
        })
        .then((success) => {
          setAllComments([success.data, ...allComments]);
          setComment("");
        })
        .catch((err) => {
          console.log({ err });
        });
    }
  }

  return (
    <Modal
      {...props}
      className="body-modal-dark"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      {/* <Loading visible={loadingVisible} /> */}
      <Modal.Header closeButton></Modal.Header>

      <Modal.Body>
        <div className="container-tweet">
          <div className="image-user">
            {singleTweet.user && singleTweet.user.photo ? (
              <img src={singleTweet.user.photo} alt="Foto do usuário" />
            ) : (
              <img src={PhotoDefault} alt="Foto do usuário" />
            )}
          </div>
          <div className="content-tweet">
            <div className="header-tweet">
              <div className="user-info">
                <span className="name">
                  {singleTweet.user && singleTweet.user.name
                    ? singleTweet.user.name
                    : ""}
                </span>
                <div className="last-info">
                  <span className="username">{`@${
                    singleTweet.user && singleTweet.user.username
                      ? singleTweet.user.username
                      : ""
                  }`}</span>
                  <span className="separator">.</span>
                  <Moment fromNow ago>
                    {singleTweet && singleTweet.tweet
                      ? singleTweet.tweet.created_at
                      : ""}
                  </Moment>
                </div>
              </div>
            </div>
            <div className="body-tweet">
              <p className="tweet_post">
                {singleTweet && singleTweet.tweet ? singleTweet.tweet.post : ""}
              </p>
            </div>
          </div>
        </div>
        <div className="container-response">
          <div className="image-user">
            {singleTweet.user && singleTweet.user.photo ? (
              <img src={singleTweet.user.photo} alt="Foto do usuário" />
            ) : (
              <img src={PhotoDefault} alt="Foto do usuário" />
            )}
          </div>
          <div className="create-tweet create-response">
            <form>
              <textarea
                onChange={(comment) => {
                  setComment(comment.target.value);
                }}
                value={comment}
                maxLength="120"
                placeholder="Tweete sua resposta"
              ></textarea>
              <div className="actions">
                <div className="action">
                  <CircularProgressbar
                    className="circle-max-length"
                    value={comment.length}
                    minValue="1"
                    maxValue="120"
                    text={comment.length}
                  />
                </div>
                <div className="action">
                  <button type="submit" onClick={createComment}>
                    Responder
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="all-comments">
          {allComments && allComments.length ? (
            allComments.map((comment) => (
              <TweetSimple key={comment.id} tweet={comment} />
            ))
          ) : (
            <span className="text-info">Nenhuma resposta para esse tweet</span>
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default memo(ViewComments);
