import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import api from "../../service/api";

import withReactContent from "sweetalert2-react-content";
import { Modal, Button } from "react-bootstrap";
import { Form } from "@unform/web";
import Swal from "sweetalert2";
import Input from "../../components/Fields/Input";
import Loading from "../../components/Loading";

import { ReactComponent as ReactLogo } from "../../assets/images/icon.svg";

export default function FormRegister(props) {
  const MySwal = withReactContent(Swal);
  const formRef = useRef(null);
  const history = useHistory();
  const [loadingVisible, setLoadingVisible] = useState(false);

  async function handleSubmit(data) {
    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string("Esse campo é do tipo texto").required(
          "O campo nome é obrigatório"
        ),
        username: Yup.string("Esse campo é do tipo texto").required(
          "O campo username é obrigatório"
        ),
        email: Yup.string("Esse campo é do tipo texto")
          .email("Informe um e-mail válido")
          .required("O campo e-mail é obrigatório"),
        password: Yup.string("Esse campo é do tipo texto")
          .min(5, "A senha deve ter no minimo 5 caracteres")
          .required("O campo senha é obrigatório"),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      setLoadingVisible(true);

      await api
        .post("/users", data)
        .then((success) => {
          if (!success.data && !success.data.token) return false;

          localStorage.setItem("TOKEN_KEY", success.data.token);
          history.push("/profile");
        })
        .catch((err) => {
          setLoadingVisible(false);
          if (
            (err.request && err.request.status === 400) ||
            err.request.status === 401
          ) {
            MySwal.fire({
              title: "Ocorreu um erro...",
              html: (
                <p className="message-sweetalert">
                  {err.response.data[0].message}
                </p>
              ),
              icon: "error",
            });
          } else {
            if (err.request && err.request.status === 404) {
              MySwal.fire({
                onOpen: () => {
                  MySwal.clickConfirm();
                },
              }).then(() => {
                return MySwal.fire(<p>{err.response.data.error.message}</p>);
              });
            }
          }
        });
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  }
  return (
    <Modal
      {...props}
      className="body-modal-dark"
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Loading visible={loadingVisible} />
      <Modal.Header>
        <Modal.Title>
          <ReactLogo className="icon" />
          <h1 className="title">Criar sua conta</h1>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} ref={formRef} className="form">
          <Input type="text" title="Nome completo" id="name" name="name" />
          <Input type="text" title="Username" id="username" name="username" />
          <Input type="text" title="E-mail" id="email" name="email" />
          <Input type="password" title="Senha" id="password" name="password" />
          <Modal.Footer className="group-button-submit">
            <Button
              variant="light"
              className="button-light"
              onClick={props.onHide}
            >
              Cancelar
            </Button>
            <Button className="button" type="submit">
              Cadastrar
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
