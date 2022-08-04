
import React, { useState, useEffect } from 'react';
import { EditOutlined } from '@ant-design/icons';
import NoAvatar from "../../../../assets/img/png/no-avatar.jpg"
import Button from 'react-bootstrap/Button';
import {  Image, List } from 'antd';
import Modal from '../../../Modal/Modal';
import EditCategory from '../EditcategoryForm/EditCategory';
import { getAvatarProductApi } from "../../../../Api/products"

export default function LstCategoty(props) {

    const { usersActive, serReloadUsers } = props;



    const [isVisibleModal, setIsVisibleModal] = useState(false);

    const [modalTitle, setModalTitle] = useState("");

    const [modalContent, setModalContent] = useState(null);
    // console.log(usersActive);
    // console.log(usersInactive);
    return (

        <div>
  
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
      setModalTitle(`Editar ${user.title ? user.title : "..."}`);
      setModalContent(<EditCategory user={user} serReloadUsers={serReloadUsers} 
        setIsVisibleModal={setIsVisibleModal}></EditCategory>)
  
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
    const { user, editUser } = props;
  
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
          
          <Button type='primary' variant="warning"
            onClick={() => editUser(user)}
          ><EditOutlined /> </Button>
  
  
        </div>
        <br></br>
  
      </div>
  
    )
  
  }
  //mostrar los usuarios activos y sus fotos--------------
  
  
  
  
  