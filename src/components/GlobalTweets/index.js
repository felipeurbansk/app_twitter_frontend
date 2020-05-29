import React, { useEffect, useState, memo } from "react";

import api from "../../service/api";
import socket from "../../service/socket";

import Tweet from "../Tweet";

import "./style.css";

let subscription;

function GlobalTweets({ title }) {
  const [tweetsGlobal, setTweetsGlobal] = useState([]);

  useEffect(() => {
    getNewGlobalTweets();

    socket.connect();
    subscription = socket.subscribe("room:newTweet", setTweets);

    return () => subscription.close();
  }, []);

  async function getNewGlobalTweets() {
    await api.get("/global").then((success) => {
      setTweetsGlobal(success.data);
    });
  }

  function setTweets(tweet) {
    setTweetsGlobal((tweets) => [tweet, ...tweets]);
  }

  return (
    <div className="container-global">
      {title === true ? (
        <div className="header-section">
          <span className="page-title">Tweets Globais</span>
        </div>
      ) : (
        ""
      )}
      <div className="content-globals">
        {tweetsGlobal.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} user={tweet.user} />
        ))}
      </div>
    </div>
  );
}

export default memo(GlobalTweets);
