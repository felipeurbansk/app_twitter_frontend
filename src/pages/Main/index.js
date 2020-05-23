import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";

import { ReactComponent as ReactLogo } from "../../assets/images/icon.svg";
import FormRegister from "../../components/FormRegister";
import Loading from "../../components/Loading";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import api from "../../service/api";

import "./style.css";

export default function Index() {
  const [email, setEmail] = useState("felipe@gmail.com");
  const [password, setPassword] = useState("123");
  const [loadingVisible, setLoadingVisible] = useState(true);
  const [showModalRegisterUser, setShowModalRegisterUser] = useState(false);

  const MySwal = withReactContent(Swal);

  const history = useHistory();

  async function submitLogin(e) {
    e.preventDefault();
    setLoadingVisible(true);

    if (email && password) {
      await api
        .post("login", { email, password })
        .then(async (success) => {
          if (success.status === 200) {
            try {
              const { token } = success.data;

              await localStorage.setItem("TOKEN_KEY", token);

              history.push("/profile");
            } catch (err) {
              console.log({ err });
            }
          }
        })
        .catch((err) => {
          setLoadingVisible(false);
          if (err.request && err.request.status === 401) {
            MySwal.fire({
              onOpen: () => {
                MySwal.clickConfirm();
              },
            }).then(() => {
              return MySwal.fire(<p>{err.response.data[0].message}</p>);
            });
          }
        });
    }
  }

  return (
    <div className="content">
      <Loading visible={loadingVisible} />
      <ReactLogo className="icon" />
      <h1 className="title">Entrar no Twitter</h1>
      <form className="form" onSubmit={submitLogin}>
        <div className="group-fields">
          <span className="field-title">E-mail</span>
          <input
            type="email"
            className="input-field"
            value={email}
            onChange={(email) => {
              setEmail(email.target.value);
            }}
          />
        </div>
        <div className="group-fields">
          <span className="field-title">Senha</span>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(password) => {
              setPassword(password.target.value);
            }}
          />
        </div>

        <button className="button" type="submit">
          Entrar
        </button>
      </form>
      <div className="group-links">
        <Link to="/" className="link">
          Esqueceu sua senha?
        </Link>
        <span className="separator">.</span>
        <Link
          to=""
          onClick={() => setShowModalRegisterUser(true)}
          className="link"
        >
          Inscrever-se no Twitter
        </Link>
      </div>
      <FormRegister
        show={showModalRegisterUser}
        onHide={() => {
          setShowModalRegisterUser(false);
        }}
      />
    </div>
  );
}
