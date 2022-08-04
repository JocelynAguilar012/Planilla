
import React, {  useEffect, useState } from 'react'
import { Image, Form, Button, notification } from 'antd'
import { getAvatarProductApi, } from '../../../../Api/products'
import { productscarritoUpApi } from '../../../../Api/carrito'
import NoAvatar from "../../../../assets/img/png/no-avatar.jpg"
import { getAccessTokenApi } from "../../../../Api/auth"
import jwtDecode from 'jwt-decode';
import './EditCategory.scss'

const accesToken = getAccessTokenApi();

export default function EditCategory(props) {
  

  const { user } = props;

  const [avatar, setAvatar] = useState(null);

  const [userData, setUserData] = useState({});
  const tokens = jwtDecode(accesToken);

  useEffect(() => {
      setUserData({
          title: user.title,
          price: user.price,
          category: user.category,
          iduser: tokens.id,
          description: user.description

         

      });
  }, [user]);


  useEffect(() => {
      if (user.avatar) {
        getAvatarProductApi(user.avatar).then(response => {
              setAvatar(response);

          })
      }
      else {
          setAvatar(null);
      }
  }, [user]);



  //  console.log(avatar);


  useEffect(() => {
      if (avatar) {
          setUserData({ ...userData, avatar: avatar.file })

      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);








  const updateUser = async e => {
      e.preventDefault();

      const result = await productscarritoUpApi(userData);
      if (!result.ok) {
          notification["error"]({
              message: result.message
          });
      }
      else {
          notification["success"]({

              message: result.message

          });

      }
      

  };

  return (
    <div>
    <UploadAvatar
        avatar={avatar}
        userData={userData}
        setAvatar={setAvatar}
    >

    </UploadAvatar>
    <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
    ></EditForm>

</div>
  )
}



function UploadAvatar(props) {

  const { avatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);
  useEffect(() => {
      if (avatar) {
          if (avatar.preview) {
              setAvatarUrl(avatar.preview)

          }
          else {
              setAvatarUrl(avatar)
          }

      }
      else {
          setAvatarUrl(null)

      }

  }, [avatar]);


  return (
      <div className='upload-avata'>
          <div>
              
                 <Image size={150} src={avatarUrl ? 
              avatarUrl : NoAvatar} />

          </div>
          
          <div className='tex_add_img'>
          </div>

      </div>

  )

}


function EditForm(props) {
  const { userData, updateUser } = props;

  return (

    <Form className='form-edit' onSubmitCapture={updateUser}>
    <div className=''>
          <p className='texos'>Titulo: {userData.title}</p>
          <p className='texos'>Precio: ${userData.price}</p>
          <p className='texos'>Detalles: {userData.description}</p>
          <p className='texos'>Nombre del vendedor: {userData.name}</p>
        </div>
    <Form.Item className='button_forma'>
        <Button className='button_form' type='primary' htmlType="submit" variant="success">Agregar al carrito</Button>
    </Form.Item>

</Form>
      
  )

}