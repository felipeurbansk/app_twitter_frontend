import React, { useState, useEffect, memo } from "react";

import { CircularProgressbar } from "react-circular-progressbar";
import GlobalTweets from "../../components/GlobalTweets";
import FollowPeople from "../../components/FollowPeople";
import LayoutDefault from "../../components/LayoutDefault";

import PhotoDefault from "../../assets/images/profile.png";

import api from "../../service/api";

import "react-circular-progressbar/dist/styles.css";

import "./style.css";

function HomePage() {
  const [post, setPost] = useState("");
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    api
      .get("/tweets")
      .then((success) => {
        console.log(success);
        setTweets(success.data.tweets);
        setUser(success.data.user);
      })
      .catch((err) => {
        console.log({ err });
      });
  }, []);

  async function submitTweet(e) {
    e.preventDefault();

    try {
      const response = await api.post("/tweets", { post });

      setTweets([response.data, ...tweets]);

      setPost("");
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <LayoutDefault user={user}>
      <section className="section-middle middle">
        <div className="header-section">
          <span className="page-title">Timeline</span>
        </div>
        <div className="tweet">
          <div className="image-profile">
            {user.photo ? (
              <img src={user.photo} alt="Foto do usuário" />
            ) : (
              <img src={PhotoDefault} alt="Foto do usuário" />
            )}
          </div>
          <div className="create-tweet">
            <form>
              <textarea
                onChange={(post) => {
                  setPost(post.target.value);
                }}
                value={post}
                maxLength="120"
                placeholder="O que está acontencedo?"
              ></textarea>
              <div className="actions">
                <div className="action">
                  <CircularProgressbar
                    className="circle-max-length"
                    value={post.length}
                    minValue="1"
                    maxValue="120"
                    text={post.length}
                  />
                </div>
                <div className="action">
                  <button type="submit" onClick={submitTweet}>
                    Tweetar
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
        <div className="timeline scrollbar scrollbar-style-2">
          <GlobalTweets />
        </div>
      </section>
      <section className="section-rigth sidebar">
        <FollowPeople />
      </section>
    </LayoutDefault>
  );
}

export default memo(HomePage);
