import React from "react";

import { Button } from "react-bootstrap";
import PhotoDefault from "../../assets/images/profile.png";

import "./style.css";

export default function CardOtherUser() {
  return (
    <div className="info-user">
      <img src={PhotoDefault} width="50" height="50" alt="Foto do usuário" />
      <div className="infos">
        <span className="user-name">Felipe Urbanski Proença</span>
        <span className="user-username">@testando</span>
      </div>
      <Button className="button-follow unfolow">Seguir</Button>
    </div>
  );
}
