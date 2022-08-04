//agregando login--------------------------------
import { LockOutlined, KeyOutlined, MailOutlined } from '@ant-design/icons';
import './Login.scss'
import React, { useState } from 'react'
//agregando login--------------------------------
import { Button, Form, Input, notification } from 'antd';
import { emailValidation, minLegthValidation } from '../../../utils/formValidation'
//agregando login--------------------------------
import { signInApi } from '../../../Api/user'
//agregando login--------------------------------

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../../utils/constants'

export default function Login() {

  //guardando el estado de los inputs____________________________
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [formValid, SetFormValid] = useState({
    email: false,
    password: false

  });

  //funcion reseteo de imputs-----------------------------------
  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].classList.remove("success");
      inputs[i].classList.remove("error");

    }

    setInputs({
      email: "",
      password: ""

    })

    SetFormValid({
      email: false,
      password: false

    });

  }

  //validacion de escritura de inputs-------------------------------
  const inputValidation = e => {
    console.log(e.target);
    const { type, name } = e.target;

    console.log(name);
    if (type === "email") {
      SetFormValid({
        ...formValid,
        [name]: emailValidation(e.target)
      });

    };

    if (name === "password") {
      SetFormValid({
        ...formValid,
        [name]: minLegthValidation(e.target, 6)
      });

    };


  }


  //funcion que captura cualquier movimiento del form-----------------
  const changeForm = e => {
    setInputs({
      ...inputs, [e.target.name]: e.target.value
    });


  }
  //funcion que captura cualquier movimiento del form-----------------


  //al precionar registart login--------------------------------

  const register = async e => {

    e.preventDefault();



    if (!inputs.email || !inputs.password) {

      notification["error"]({
        message: "todos los campos son obligatorios"
      });
    }
    else {

      const result = await signInApi(inputs);
      if (result.message) {
        notification["error"]({
          message: result.message
        });
        ;
      }

      else {
        const { accessToken, refreshToken } = result;

        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);

        notification["success"]({

          message: "Bienvenido........."

        });
        window.location.href = "/admin"


      }
      resetForm();

    }

  };

  //al precionar registart login--------------------------------



  return (

    <div >

      {/*iniciando con el login -------------------------------------- */}

      <div>
        <KeyOutlined className='logo_login_main' ></KeyOutlined >
      </div>
      <div className='text_login_main'>
        <p>Check In</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        onChange={changeForm}
        onSubmitCapture={register}
      >
        <Form.Item >
          <Input prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Email"
            type="email"
            name="email"
            className='imputs_bordes'
            value={inputs.email}
            onChange={inputValidation} />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
            type="password"
            name="password"
            className='imputs_bordes'
            value={inputs.password}
            onChange={inputValidation}
          />
        </Form.Item>
        <Form.Item>

        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
        </Form.Item>
      </Form>
      {/*final login -------------------------------------- */}

    </div>
  )
}
