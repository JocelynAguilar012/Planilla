import './ListProducts.scss'
import React, { useState, useEffect } from 'react';
import { EditOutlined, DeleteOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import NoAvatar from "../../../../assets/img/png/no-avatar.jpg"
import Button from 'react-bootstrap/Button';
import { Image, List, Switch, notification, Modal as ModalAntd } from 'antd';
import Modal from '../../../Modal/Modal';
import EditProdructForm from '../EditProdructForm/EditProdructForm';
import { getAvatarProductApi, activateProductApi, deleteProductApi } from "../../../../Api/products"
import { getAccessTokenApi } from "../../../../Api/auth"

const { confirm } = ModalAntd;


export default function ListProducts(props) {

  const { usersActive, usersInactive, serReloadUsers } = props;

  const [viewUserActives, setViewUserActives] = useState(true);


  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);
  // console.log(usersActive);
  // console.log(usersInactive);



  return (
    <div>
      <div >

        <Switch onChange={() => setViewUserActives(!viewUserActives)} checkedChildren="Productos Actvos" unCheckedChildren="Productos inactvos" defaultChecked />
      </div><br></br>
      <div className='container_product' >
      {viewUserActives ? <UsersActive usersActive={usersActive}
        setIsVisibleModal={setIsVisibleModal}
        setModalTitle={setModalTitle}
        setModalContent={setModalContent}
        serReloadUsers={serReloadUsers}
      />
        : <UsersInactive usersInactive={usersInactive}
          serReloadUsers={serReloadUsers}

        />}


      <Modal title={modalTitle} isVisible={isVisibleModal}
        setIsVisible={setIsVisibleModal}>
        {modalContent}
      </Modal>
      </div>
    </div>
  )
}


//mostrar los usuarios activos y sus fotos--------------
function UsersActive(props) {
  const { usersActive, setIsVisibleModal, setModalTitle,
    setModalContent, serReloadUsers } = props;

  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${user.title ? user.title : "..."}`);
    setModalContent(<EditProdructForm user={user} serReloadUsers={serReloadUsers} setIsVisibleModal={setIsVisibleModal}></EditProdructForm>)

  }

  return (
    <List
      className='products'
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => <UserActive user={user} editUser={editUser} serReloadUsers={serReloadUsers} />}
    />
  )

}
function UserActive(props) {
  const { user, editUser, serReloadUsers } = props;

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarProductApi(user.avatar).then(response => {
        setAvatar(response);
      })


    }
    else {
      setAvatar(null);
    }

  }, [user])

  //funcion de desactivar usuarios----------------------
  const desactivateUser = () => {
    const accesToken = getAccessTokenApi();
    activateProductApi(accesToken, user._id, false)
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
  };

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();
    confirm({
      title: "elimnando Producto",
      content: `¿Estas seguro de eliminar a ${user.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(accesToken, user._id)
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

      <div className='ShowProducts_main_logo'>
        <Image src={avatar ? avatar : NoAvatar} />
      </div>
      <div className='ShowProducts_main_texto'>
        <p className='ShowProducts_main_texto1'>{user.title}</p>
        <p className='ShowProducts_main_texto2'>${user.price}</p>
      </div>
      <div className='ShowProducts_main_botones'>
        <Button onClick={desactivateUser} type='1'
          variant="success"><CloseOutlined /></Button>,

        <Button type='primary' variant="warning"
          onClick={() => editUser(user)}
        ><EditOutlined /> </Button>,

        <Button type='second'
          onClick={showDeleteConfirm}
          variant="danger"><DeleteOutlined /></Button>

      </div>
      <br></br>

    </div>

  )

}
//mostrar los usuarios activos y sus fotos--------------



//mostrar los usuarios inactivos y sus fotos--------------
function UsersInactive(props) {
  const { usersInactive, serReloadUsers } = props;

  return (
    <List
      className='products'
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => <UserInActive user={user} serReloadUsers={serReloadUsers}></UserInActive>}
    />
  )



}


function UserInActive(props) {
  const { user, serReloadUsers } = props;

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarProductApi(user.avatar).then(response => {
        setAvatar(response);
      })


    }
    else {
      setAvatar(null);
    }

  }, [user])

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();
    confirm({
      title: "elimnando Producto",
      content: `¿Estas seguro de eliminar a ${user.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteProductApi(accesToken, user._id)
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


  //funcion de activar usuarios----------------------
  const activarUser = () => {

    const accesToken = getAccessTokenApi();
    activateProductApi(accesToken, user._id, true)
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
  };
  return (

    <div className='ShowProducts_main'>

    <div className='ShowProducts_main_logo'>
      <Image src={avatar ? avatar : NoAvatar} />
    </div>
    <div className='ShowProducts_main_texto'>
      <p className='ShowProducts_main_texto1'>{user.title}</p>
      <p className='ShowProducts_main_texto2'>${user.price}</p>
    </div>
    <div className='ShowProducts_main_botones'>
    <Button type='1' onClick={activarUser} variant="success"><CheckOutlined /></Button>,
    <Button type='2' onClick={showDeleteConfirm} variant="danger"><DeleteOutlined /></Button>

    </div>
    <br></br>
  </div>
   

  )

}
//mostrar los usuarios inactivos y sus fotos--------------
