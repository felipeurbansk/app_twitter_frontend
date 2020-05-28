import React, { memo } from "react";
import { Link, useHistory } from "react-router-dom";
import { Card } from "react-bootstrap";
import PhotoDefault from "../../assets/images/profile.png";

import "./style.css";

function CardUser({ user }) {
  const history = useHistory();

  function hundleLogout() {
    try {
      localStorage.clear();

      history.push("/");
    } catch (err) {
      console.log({ err });
    }
  }

  return (
    <div className="card-user">
      <Card>
        <div className="photo">
          {user.photo ? (
            <Card.Img variant="top" src={user.photo} />
          ) : (
            <Card.Img variant="top" src={PhotoDefault} />
          )}
        </div>
        <Card.Body>
          <Card.Title className="name">
            {user.name}
            <Card.Text className="username"> {`@${user.username}`}</Card.Text>
          </Card.Title>
          <div className="actions-user">
            <Link to="" className="btn btn-primary">
              Ver perfil
            </Link>
            <Link to="" className="logout" onClick={hundleLogout}>
              Sair
            </Link>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

export default memo(CardUser);
