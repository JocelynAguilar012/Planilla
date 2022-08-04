

import React, { useState } from 'react';
import { EditOutlined } from '@ant-design/icons';
import Button from 'react-bootstrap/Button';
import { List, notification} from 'antd';
import Modal from '../../../Modal/Modal';
import EditCarrito from '../EditiCarritoFrom/EditCarrito';
import { deleteAllcarritoApi } from '../../../../Api/carrito'
import { productsorderUpApi } from '../../../../Api/Order'
import { getAccessTokenApi } from "../../../../Api/auth"
import jwtDecode from 'jwt-decode';
import './ListCarrto.scss'

export default function ListCarrito(props) {

  const { usersActive, serReloadUsers } = props;

  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const [modalTitle, setModalTitle] = useState("");

  const [modalContent, setModalContent] = useState(null);

  const [inputs] = useState({
    description: "",
    priceoforders: "",
    iduser: ""
  });

  function sumarValoresPropiedades(datos, fn) {
    return datos.map(typeof fn === 'function' ? fn : d => d[fn]).reduce((a, v) => Number(a) + Number(v), 0);
  }
  function sumarValoresStng(datos, fn) {
    return datos.map(typeof fn === 'function' ? fn : d => d[fn]).reduce((a, v) => a +" , "+ v);
  }


  console.log(sumarValoresPropiedades(usersActive, "price"));

  const deletecarrito = async e => {
    const accesToken = getAccessTokenApi();
    const userid = jwtDecode(accesToken).id;
    let datos = inputs;
    datos.description = "ordeno :" + sumarValoresStng(usersActive, "title");
    datos.priceoforders = String(sumarValoresPropiedades(usersActive, "price"));
    datos.iduser = userid;

    e.preventDefault();
    const result = await productsorderUpApi(datos);
    if (!result.ok) {
      notification["error"]({
        message: result.message
      });
     

    }
    else {
      notification["success"]({

        message: result.message

      });
      await   deleteAllcarritoApi(accesToken, userid)
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


    };

    // console.log(usersActive);
    // console.log(usersInactive);
    return (

      <div>
        <div>
          <h1 className='price_carrito'>Precio a cancelar </h1>
          <h2 className='price_carrito2'>${sumarValoresPropiedades(usersActive, "price")}</h2>
          <Button onClick={deletecarrito} variant="success">Terminar proceso</Button>
        </div>
<br></br>
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
      setModalContent(<EditCarrito user={user} serReloadUsers={serReloadUsers}
        setIsVisibleModal={setIsVisibleModal}></EditCarrito>)

    }

    return (
      <List
        className='user'
        itemLayout="horizontal"
        dataSource={usersActive}
        renderItem={(user) => <UserActive user={user} editUser={editUser} serReloadUsers={serReloadUsers} />}
      />
    )

  }
  function UserActive(props) {
    const { user, editUser, } = props;



    return (

      <div className='ShowProducts_main'>

        <div className=''>
          <p className='price_carrito3'>Ordeno: {user.title}</p>


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




