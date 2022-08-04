import React, { useState, useEffect } from 'react';
import './ListUser.scss'
import { EditOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import NoAvatar from "../../../../assets/img/png/no-avatar.png"
import Button from 'react-bootstrap/Button';
import { Avatar, List, Switch, notification, Modal as ModalAntd } from 'antd';
import Modal from '../../../Modal/Modal';
import EditUserForm from '../EditUserForm/EditUserForm';
import { getAvatarApi, activateUserApi, deleteUserApi } from "../../../../Api/user"
import { getAccessTokenApi } from "../../../../Api/auth"



const { confirm } = ModalAntd;

export default function ListUser(props) {




  const { usersActive, usersInactive, serReloadUsers } = props;

  const [viewUserActives, setViewUserActives] = useState(true);


  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);
  // console.log(usersActive);
  // console.log(usersInactive);

  return (
    <div>
      <div className='switch_users'>

        <Switch onChange={() => setViewUserActives(!viewUserActives)} checkedChildren="Usuarios Activos" unCheckedChildren="Usuarios Inactivos" defaultChecked />
      </div><br></br>

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
  )
}

//mostrar los usuarios activos y sus fotos--------------
function UsersActive(props) {
  const { usersActive, setIsVisibleModal, setModalTitle,
    setModalContent, serReloadUsers } = props;

  const editUser = user => {
    setIsVisibleModal(true);
    setModalTitle(`Editar ${user.name ? user.name : "..."}`);
    setModalContent(<EditUserForm user={user} serReloadUsers={serReloadUsers} setIsVisibleModal={setIsVisibleModal}></EditUserForm>)

  }

  return (
    <List
      className='users'
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
      getAvatarApi(user.avatar).then(response => {
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
    console.log(user.email);
    if (user.email==="edwinsantos74447@gmail.com") 
    {  notification["error"]({
      message: "No podemos desactivar al Administrador "

    });
    }
    else{
    activateUserApi(accesToken, user._id, false)
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
  };
  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();
    console.log(user.email);
    if (user.email==="edwinsantos74447@gmail.com") 
    {  notification["error"]({
      message: "No podemos eliminar al Administrador "

    });
    }
    else{
      confirm({
        title: "elimnando Usuario",
        content: `¿Estas seguro de eliminar a ${user.email}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          deleteUserApi(accesToken, user._id)
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

    }

  };


  return (
    <List.Item
      actions={[


      ]}
    >
      <div className='list_iten-main1'>
        <Avatar className='avatar_style' src={avatar ? avatar : NoAvatar} />
      </div>
      <div className='list_iten-main2'>

        <h2 className='title_user'>Nombre: {user.name ? user.name : '...'}</h2>
        <h2 className='title_user'>Apellido: {user.lastname ? user.lastname : '...'}</h2>
        <h2 className='title_user'>Celular: {user.phone ? user.phone : '...'}</h2>
        <h2 className='title_user'>Dui: {user.dui ? user.dui : '...'}</h2>
        <h2 className='title_user'>Email: {user.email ? user.email : '...'}</h2>
      </div>
      <div className='list_iten-main3'>
        <Button type='primary' variant="warning"
          onClick={() => editUser(user)}
        ><EditOutlined /> </Button>,
        <Button onClick={desactivateUser} type='1' variant="success">

          <CloseOutlined /></Button>

        <Button type='second' onClick={showDeleteConfirm}
          variant="danger"><DeleteOutlined /></Button>
      </div>



    </List.Item>
  )

}
//mostrar los usuarios activos y sus fotos--------------



//mostrar los usuarios inactivos y sus fotos--------------
function UsersInactive(props) {
  const { usersInactive, serReloadUsers } = props;

  return (
    <List
      className='users'
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
      getAvatarApi(user.avatar).then(response => {
        setAvatar(response);
      })


    }
    else {
      setAvatar(null);
    }

  }, [user])

  const showDeleteConfirm = () => {
    const accesToken = getAccessTokenApi();
    console.log(user.email);
    if (user.email==="edwinsantos74447@gmail.com") 
    {  notification["error"]({
      message: "No podemos eliminar al Administrador "

    });
    }
    else{
      confirm({
        title: "elimnando Usuario",
        content: `¿Estas seguro de eliminar a ${user.email}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
          deleteUserApi(accesToken, user._id)
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

    }

  };


  //funcion de activar usuarios----------------------
  const activarUser = () => {

    const accesToken = getAccessTokenApi();
    activateUserApi(accesToken, user._id, true)
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
    <List.Item
      actions={[


      ]}
    >
      <div className='list_iten-main1'>
        <Avatar className='avatar_style' src={avatar ? avatar : NoAvatar} />
      </div>
      <div className='list_iten-main2'>

        <h2 className='title_user'>Nombre: {user.name ? user.name : '...'}</h2>
        <h2 className='title_user'>Apellido: {user.lastname ? user.lastname : '...'}</h2>
        <h2 className='title_user'>Celular: {user.phone ? user.phone : '...'}</h2>
        <h2 className='title_user'>Dui: {user.dui ? user.dui : '...'}</h2>
        <h2 className='title_user'>Email: {user.email ? user.email : '...'}</h2>
      </div>
      <div className='list_iten-main3'>
        <Button onClick={activarUser} type='1' variant="success">

          <CloseOutlined /></Button>

        <Button type='second' onClick={showDeleteConfirm}
          variant="danger"><DeleteOutlined /></Button>
      </div>


    </List.Item>

  )

}
//mostrar los usuarios inactivos y sus fotos--------------
