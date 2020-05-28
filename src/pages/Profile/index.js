import React, { useState, useEffect, memo } from "react";
import { ReactComponent as ReactLogo } from "../../assets/images/icon.svg";
import { CircularProgressbar } from "react-circular-progressbar";
import Tweet from "../../components/Tweet";
import CardUser from "../../components/CardUser";
import SidebarGlobalTweets from "../../components/SidebarGlobalTweets";
import PhotoDefault from "../../assets/images/profile.png";
import api from "../../service/api";

import "react-circular-progressbar/dist/styles.css";

import "./style.css";

function Profile() {
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

      setPost("");
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="content">
      <section className="section-left sidebar">
        <ReactLogo className="icon" />
        <CardUser user={user} />
      </section>
      <section className="section-middle middle">
        <div className="header-section">
          <span className="page-title">Página inicial</span>
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
        <div className="timeline">
          {tweets.map((tweet) => (
            <Tweet key={tweet.id} tweet={tweet} user={user} />
          ))}
        </div>
      </section>
      <section className="section-rigth sidebar">
        <SidebarGlobalTweets />
      </section>
    </div>
  );
}

export default memo(Profile);
