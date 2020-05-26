import React, { useEffect, useState } from "react";
import api from "../../service/api";
import socket from "../../service/socket";

import Tweet from "../Tweet";

import "./style.css";

let subscription;

export default function SidebarGlobalTweets() {
  const [tweetsGlobal, setTweetsGlobal] = useState([""]);

  useEffect(() => {
    socket.connect();
    subscription = socket.subscribe("room:newTweet", setTweets);

    getNewGlobalTweets();
  }, []);

  // useEffect(() => () => (subscription = subscription.close()), []);

  async function getNewGlobalTweets() {
    await api.get("/global").then((success) => {
      setTweetsGlobal(success.data);
    });
  }

  function setTweets(tweet) {
    console.log({ tweet });
    // setTweetsGlobal([tweet, ...tweetsGlobal]);
  }

  return (
    <div className="content-globals">
      {tweetsGlobal.map((tweet) => (
        <Tweet key={tweet.id} tweet={tweet} user={tweet.user} />
      ))}
    </div>
  );
}
