import React, { useRef } from "react";
import * as Yup from "yup";
import api from "../../service/api";

import { Form } from "@unform/web";
import Input from "../../components/Fields/Input";
import { ReactComponent as ReactLogo } from "../../assets/images/icon.svg";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import { Modal, Button } from "react-bootstrap";

export default function FormRegister(props) {
  const formRef = useRef(null);
  const MySwal = withReactContent(Swal);

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

      await api
        .post("/users", data)
        .then((success) => {
          console.log({ success });
        })
        .catch((err) => {
          console.log({ err });
          if (err.request && err.request.status === 401) {
            MySwal.fire({
              onOpen: () => {
                MySwal.clickConfirm();
              },
            }).then(() => {
              return MySwal.fire(<p>{err.response.data[0].message}</p>);
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
          <Modal.Footer class="group-button-submit">
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
