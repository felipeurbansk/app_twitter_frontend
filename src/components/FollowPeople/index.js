import React, { memo, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import CardOtherUser from "../CardOtherUser";

import api from "../../service/api";

import "./style.css";

function FollowPeople() {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getUsersApi();
  }, []);

  async function getUsersApi() {
    await api
      .get(`/getUsers/${page}`)
      .then((success) => {
        setPage(page + 1);
        setUsers([...users, ...success.data]);
      })
      .catch((err) => {
        console.log({ err });
      });
  }

  return (
    <div className="follow-peoples">
      <div className="header-section">
        <span className="title">Quem seguir</span>
      </div>
      <div className="body-section scrollbar scrollbar-style-2">
        {users.map((user) => (
          <CardOtherUser key={user.id} user={user} />
        ))}
      </div>
      <div className="footer-section">
        <Link to="#" onClick={getUsersApi} className="show-more">
          Ver mais
        </Link>
      </div>
    </div>
  );
}

export default memo(FollowPeople);
