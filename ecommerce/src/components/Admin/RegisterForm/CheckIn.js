import React, { useState } from 'react'
import './CheckIn.scss'
//agregando login--------------------------------
import { LockOutlined, UserOutlined, UserAddOutlined, SoundOutlined, IdcardOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, notification } from 'antd';
import { emailValidation, minLegthValidation } from '../../../utils/formValidation'
//agregando login--------------------------------

import { signUpApi } from '../../../Api/user'


export default function CheckIn() {



  //guardando el estado de los inputs____________________________
  const [inputs, setInputs] = useState({
    email: "",
    name: "",
    lastname: "",
    phone: "",
    dui: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false
  });


  const [formValid, SetFormValid] = useState({
    email: false,
    name: false,
    lastname: false,
    phone: false,
    dui: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false

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
      name: "",
      lastname: "",
      phone: "",
      dui: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false

    })

    SetFormValid({
      email: false,
      name: false,
      lastname: false,
      phone: false,
      dui: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false

    });

  }

  //guardando el estado de los inputs____________________________


  //validacion de escritura de inputs-------------------------------
   const inputValidation =  e => {
console.log(e.target);
    const { type, name } = e.target;

    console.log(name);
    if (type === "email") {
      SetFormValid({
        ...formValid,
        [name]: emailValidation(e.target)
      });

    };

    if (name === "name") {
      SetFormValid({
        ...formValid,
        [name]: minLegthValidation(e.target, 6)
      });

    };
    if (name === "lastname") {
      SetFormValid({
        ...formValid,
        [name]: minLegthValidation(e.target, 6)
      });

    };
    if (name === "phone") {
      SetFormValid({
        ...formValid,
        [name]: minLegthValidation(e.target, 8)
      });

    };
    if (name === "dui") {
      SetFormValid({
        ...formValid,
        [name]: minLegthValidation(e.target, 9)
      });

    };

    if (name === "password") {
      SetFormValid({
        ...formValid,
        [name]: minLegthValidation(e.target, 6)
      });

    };
    if (name === "repeatPassword") {
      SetFormValid({
        ...formValid,
        [name]: minLegthValidation(e.target, 6)
      });

    };

    if (name === 'privacyPolicy') {
      SetFormValid({
        ...formValid,
        [name]: e.target.checked
      });

    };
  }


  //validacion de escritura de inputs-------------------------------


  //funcion que captura cualquier movimiento del form-----------------
  const changeForm = e => {
    if (e.target.name === "privacyPolicy") {

      setInputs({
        ...inputs, [e.target.name]: e.target.checked
      });

    }
    else {

      setInputs({
        ...inputs, [e.target.name]: e.target.value
      });

    }

  }
  //funcion que captura cualquier movimiento del form-----------------



  //al precionar registart login--------------------------------

  const register = async e => {

    e.preventDefault();
  

    if (!inputs.email || !inputs.password || !inputs.repeatPassword
      || !inputs.name || !inputs.lastname || !inputs.phone || !inputs.dui) {

      notification["error"]({
        message: "todos los campos son obligatorios"
      });
    }
    else {
      if (inputs.password !== inputs.repeatPassword) {

        notification["error"]({
          message: "las contraseñas son diferentes "
        });
      }
      else {
        if (inputs.privacyPolicy === false) {
          notification["error"]({
            message: "Acepte las politicas "
          });
        }
        else{

          const result = await signUpApi(inputs);
          if (!result.ok) {
            notification["error"]({
              message: result.message
            });
            ;
          }
  
          else {
            notification["success"]({
  
              message: result.message
  
            });
  
          }
          resetForm();

        }
       
      }
    };
  };

  //al precionar registart login--------------------------------

  return (
    <div >

      {/*iniciando con el login -------------------------------------- */}

      <div>
        <UserOutlined className='logo_login_main' ></UserOutlined>
      </div>
      <div className='text_login_main'>
        <p>Registro</p>
      </div>
      <Form
        name="normal_login"
        className="login-form"
        onChange={changeForm}
        onSubmitCapture={register}
      >
        <Form.Item    >
          <Input prefix={<MailOutlined className="site-form-item-icon" />}
            placeholder="Correo"
            type="email"
            name="email"
            className='imputs_bordes'
            value={inputs.email}
            onChange={inputValidation}
          />
        </Form.Item>
        <Form.Item >
          <Input prefix={<UserAddOutlined className="site-form-item-icon" />}
            placeholder="Nombre"
            type="name"
            name="name"
            value={inputs.name}
            className='imputs_bordes'
            onChange={inputValidation}
          />
        </Form.Item>
        <Form.Item >
          <Input prefix={<UserAddOutlined className="site-form-item-icon" />}
            placeholder="Apellido"
            type="lastname"
            name="lastname"
            className='imputs_bordes'
            value={inputs.lastname}
            onChange={inputValidation}
          />
        </Form.Item>
        <Form.Item >
          <Input prefix={<IdcardOutlined className="site-form-item-icon" />}
            placeholder="Dui"
            type="number"
            name="dui"
            className='imputs_bordes'
            value={inputs.dui}
            onChange={inputValidation}
          />
        </Form.Item>
        <Form.Item >
          <Input prefix={<SoundOutlined className="site-form-item-icon" />}
            placeholder="Telefono"
            type="number"
            name="phone"
            className='imputs_bordes'
            value={inputs.phone}
            onChange={inputValidation}
          />

        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Contraseña"
            type="password"
            name="password"
            className='imputs_bordes'
            value={inputs.password}
            onChange={inputValidation}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirme contraseña"
            type="password"
            name="repeatPassword"
            className='imputs_bordes'
            value={inputs.repeatPassword}
            onChange={inputValidation}
          />
        </Form.Item>


        <Form.Item>
          <Form.Item name="remember" checked={inputs.privacyPolicy} valuePropName="checked" noStyle>
            <Checkbox
              name='privacyPolicy'
              className='imputs_bordes'
              checked={inputs.privacyPolicy}
              onChange={inputValidation}
            >He leido y acepto la politica de privacidad.</Checkbox>
          </Form.Item>

        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Registrar
          </Button>
        </Form.Item>
      </Form>
      {/*final login -------------------------------------- */}

    </div>

  )

}
