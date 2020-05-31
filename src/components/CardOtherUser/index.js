import React from "react";
import { Link } from "react-router-dom";

// import { Button } from "react-bootstrap";
import PhotoDefault from "../../assets/images/profile.png";

import "./style.css";

export default function CardOtherUser({ user }) {
  return (
    <div className="info-user">
      <img src={PhotoDefault} width="50" height="50" alt="Foto do usuário" />
      <div className="infos">
        <span className="user-name">{user.name}</span>
        <span className="user-username">{`@${user.username}`}</span>
      </div>
      <Link className="btn btn-outline-primary btn-sm">Seguir</Link>
    </div>
  );
}
