import React, { useEffect, useState, memo } from "react";

import api from "../../service/api";
import socket from "../../service/socket";

import Tweet from "../Tweet";

import "./style.css";

let subscription;

function SidebarGlobalTweets() {
  const [tweetsGlobal, setTweetsGlobal] = useState([]);

  useEffect(() => {
    getNewGlobalTweets();

    socket.connect();
    subscription = socket.subscribe("room:newTweet", setTweets);
  }, []);

  async function getNewGlobalTweets() {
    await api.get("/global").then((success) => {
      setTweetsGlobal(success.data);
    });
  }

  function setTweets(tweet) {
    try {
      setTweetsGlobal((tweets) => [tweet, ...tweets]);
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="container-global">
      <div className="header-section">
        <span className="page-title">Tweets Globais</span>
      </div>
      <div className="content-globals">
        {tweetsGlobal.map((tweet) => (
          <Tweet key={tweet.id} tweet={tweet} user={tweet.user} />
        ))}
      </div>
    </div>
  );
}

export default memo(SidebarGlobalTweets);
