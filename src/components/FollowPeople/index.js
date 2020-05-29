import React, { useEffect } from "react";

import CardOtherUser from "../CardOtherUser";

import api from "../../service/api";

import "./style.css";

export default function FollowPeople() {
  useEffect(() => {});

  return (
    <div className="follow-peoples">
      <div className="header-section">
        <span className="title">Quem seguir</span>
      </div>
      <CardOtherUser />
    </div>
  );
}
