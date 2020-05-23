import React, { useState, useEffect } from "react";
import { ReactComponent as ReactLogo } from "../../assets/images/icon.svg";
import Tweet from "../../components/Tweet";

import api from "../../service/api";

import "./style.css";

export default function Profile() {
  const [post, setPost] = useState("");
  const [tweets, setTweets] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    api
      .get("/tweets")
      .then((success) => {
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
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="main">
      {/* <section className="section-left"> */}
      {/* <ReactLogo className="icon"/> */}
      {/* </section> */}
      <section className="section-middle">
        <div className="header-section">
          <span className="page-title">Página inicial</span>
        </div>
        <div className="tweet">
          <div className="image-profile">
            <ReactLogo className="icon" />
          </div>
          <div className="content-tweet">
            <form>
              <textarea
                onChange={(post) => {
                  setPost(post.target.value);
                }}
                value={post}
                placeholder="O que está acontencedo?"
              ></textarea>
              <div className="actions">
                <button type="submit" onClick={submitTweet}>
                  Tweetar
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="timeline">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} Tweet={tweet} User={user} />
          ))}
        </div>
      </section>
      {/* <section className="section-rigth">

            </section> */}
    </div>
  );
}
