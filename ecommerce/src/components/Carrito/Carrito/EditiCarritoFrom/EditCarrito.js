
import './EditCarrito.scss'
import React, { useState } from 'react'
import { Select, Form, Button, notification, Modal as ModalAntd } from 'antd'

import { deletecarritoApi } from '../../../../Api/carrito'
import { getAccessTokenApi } from "../../../../Api/auth"

const { confirm } = ModalAntd;
export default function EditCarrito(props) {

  const { user, setIsVisibleModal, serReloadUsers } = props;


  const [userData, setUserData] = useState({});


  const updateUser =  e => {
    e.preventDefault();
    const accesToken = getAccessTokenApi();


    confirm({
      title: "eliminando pedido",
      content: `¿Estas seguro de eliminar a ${user.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {

        deletecarritoApi(accesToken, user._id)
          .then(response => {
            notification["success"]({
              message: response

            });

          })
          .catch(err => {
            notification["error"]({
              message: err

            });
          });
        serReloadUsers(true);
        setIsVisibleModal(false);

      }

    })

  };


  return (
    <div>
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      ></EditForm>

    </div>
  )
}




function EditForm(props) {
  const { updateUser } = props;

  return (
    <Form className='form-edit' onSubmitCapture={updateUser}>

      <Form.Item className='button_forma'>
        <Button className='button_form' type='primary' htmlType="submit" variant="success">Eliminar del carrito</Button>
      </Form.Item>

    </Form>
  )

}