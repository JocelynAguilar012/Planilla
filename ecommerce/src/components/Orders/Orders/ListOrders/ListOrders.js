import './ListOrders.scss'
import React, { useState } from 'react';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import Button from 'react-bootstrap/Button';
import {  List, notification, Modal as ModalAntd } from 'antd';
import Modal from '../../../Modal/Modal';
import EditOrders from '../EditiOrdersFrom/EditOrders';

import { deleteOrdersApi } from "../../../../Api/Order"
import { getAccessTokenApi } from "../../../../Api/auth"

const { confirm } = ModalAntd;


export default function ListOrders(props) {

  const { usersActive, serReloadUsers } = props;



  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);
  // console.log(usersActive);
  // console.log(usersInactive);



  return (
    <div>

      <h1 className='title_order'>Pedidos</h1>

       <UsersActive usersActive={usersActive}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        serReloadUsers={serReloadUsers}
      />
      <Modal title={modalTitle} isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
    </div>
  )
}


//mostrar los usuarios activos y sus fotos--------------
function UsersActive(props) {
  const { usersActive, setIsVisibleModal, setModalTitle,
    setModalContent, serReloadUsers } = props;

  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${user.description ? user.description : "..."}`);
    setModalContent(<EditOrders user={user} serReloadUsers={serReloadUsers} setIsVisibleModal={setIsVisibleModal}></EditOrders>)
 
  }

  return (
    <List
      className='products'
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive user={user} 
      editUser={editUser} serReloadUsers={serReloadUsers} />}
    />
  )

}
function UserActive(props) {
  const { user, editUser, serReloadUsers } = props;


  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();
    confirm({
      title: "elimnando Orden",
      content: `¿Estas seguro de eliminar a ${user.description}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteOrdersApi(accesToken, user._id)
          .then(response => {
            notification["success"]({
              message: response

            });
            serReloadUsers(true);

          })
          .catch(err => {
            notification["error"]({
              message: err

            });
          });
      }

    })


  };

  return (

    <div className='ShowProducts_main'>

      <div className='ShowProducts_main_texto'>
        <p className='ShowProducts_main_texto1'>{user.description}</p>
        <p className='ShowProducts_main_texto2'>${user.priceoforders}</p>
      </div>
      <div className='ShowProducts_main_botones'>
  

        <Button type='primary' variant="warning"
          onClick={() => editUser(user)}
        ><EditOutlined /> </Button><p></p>

        <Button type='second'
          onClick={showDeleteConfirm}
          variant="danger"><DeleteOutlined /></Button>

      </div>
      <br></br>

    </div>

  )

}
//mostrar los usuarios activos y sus fotos--------------




