import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../service/api";
import socket from "../../service/socket";

import Tweet from "../Tweet";

import "./style.css";

let subscription;

export default function SidebarGlobalTweets() {
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
    <div className="content-globals">
      <Link onClick={() => console.log({ tweetsGlobal })}>Vaidar tweets</Link>
      {tweetsGlobal.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} user={tweet.user} />
      ))}
    </div>
  );
}
