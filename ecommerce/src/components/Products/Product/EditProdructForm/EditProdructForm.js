
import React, { useCallback, useEffect, useState } from 'react'
import { Image, Select, Form, Col, Row, Input, Button, notification } from 'antd'
import {
    UserAddOutlined, CopyOutlined ,DollarCircleOutlined
} from '@ant-design/icons';
//import jwtDecode from 'jwt-decode';



import { useDropzone } from 'react-dropzone'
import './EditProdructForm.scss'
import { getAvatarProductApi, updateProductApi, updloadProductApi } from '../../../../Api/products'
import NoAvatar from "../../../../assets/img/png/no-avatar.jpg"
import { getAccessTokenApi } from "../../../../Api/auth"

//const {tokens} = jwtDecode(getAccessTokenApi);
export default function EditProdructForm(props) {

  const { user, setIsVisibleModal,serReloadUsers } = props;

  const [avatar, setAvatar] = useState(null);

  const [userData, setUserData] = useState({});


  useEffect(() => {
      setUserData({
          
          title: user.title,
          price: user.price,
          category: user.category,
          description: user.description,
          avatar: user.avatar

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








  const updateUser = e => {
      e.preventDefault();

      const token = getAccessTokenApi();
      let userUpdate = userData;
      
      if (!userUpdate.title || !userUpdate.price || !userUpdate.category
          || !userUpdate.description ) {
          notification["error"]({
              message: "los datos son obligatorios"
          });   
           return;
      }          
      if (typeof userData.avatar === "object") {
          console.log(userUpdate.avatar);
          updloadProductApi(token,userUpdate.avatar, user._id).then(response => {
              userUpdate.avatar = response.avatarName;
              updateProductApi(token,userUpdate,user._id).then(Result =>{
                  console.log(userUpdate);
                  notification["success"]({
                      message: Result.message
                    });
                    setIsVisibleModal(false);
                    serReloadUsers(true);
              });
          });
          
        }
        else {

            updateProductApi(token,userUpdate,user._id).then(Result =>{
              notification["success"]({
                  message: Result.message
                });
                setIsVisibleModal(false);
                serReloadUsers(true);
          });

        }

  };

  return (
    <div>
    <UploadAvatar
        avatar={avatar}
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

  const { avatar, setAvatar } = props;
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



  const onDrop = useCallback(
      accepteFiles => {
          const file = accepteFiles[0];
          setAvatar({ file, preview: URL.createObjectURL(file) });
      }, [setAvatar]

  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: "image/jpeg,image/png,image/jpg",
      noKeyboard: true,
      onDrop

  });


  return (
      <div className='upload-avatar2' {...getRootProps()}>
          <div>
              <input {...getInputProps()} />
              {isDragActive ? (
                  <Image size={150} src={NoAvatar} />
              ) : (<Image size={150} src={avatarUrl ? avatarUrl : NoAvatar} />)}
          </div>
          <div className='tex_add_img'>
              +Add
          </div>

      </div>

  )

}


function EditForm(props) {
  const { userData, setUserData, updateUser } = props;
  const { Option } = Select;

  return (
      <Form className='form-edit' onSubmitCapture={updateUser}>
          <Row gutter={24}>
              <Col span={16} >
                  <Form.Item>
                      <Input
                          prefix={<UserAddOutlined />}
                          placeholder="title"
                          value={userData.title}
                          onChange={e => setUserData({ ...userData, title: e.target.value })}
                      />
                  </Form.Item>
              </Col>
              <Col span={8} >
                  <Form.Item>
                      <Input
                          prefix={<DollarCircleOutlined />}
                          placeholder="precio"
                          value={userData.price}
                          onChange={e => setUserData({ ...userData, price: e.target.value })}
                      />
                  </Form.Item>
              </Col>
          </Row>
         
          <Row gutter={24}>
          <Col span={18} >
                  <Form.Item>
                      <Input
                          prefix={<CopyOutlined  />}
                          placeholder="Descripcion"
                          value={userData.description}
                          onChange={e => setUserData({ ...userData, description: e.target.value })}
                      />
                  </Form.Item>
              </Col>
              <Col span={6} >
                  <Form.Item>

                      <Select
                          placeholder="Categoria"
                          onChange={e => setUserData({ ...userData, category: e })}
                          value={userData.category}
                      >
                                <Option value="Electro">Electrodomesticos</Option>
                                <Option value="Muebles">Muebles</Option>
                                <Option value="Ropa">Ropa y calzado</Option>
                                <Option value="Juguetes">juguetes</Option>
                                <Option value="Pelicula">Peliculas</Option>
                                <Option value="Juegos">juegos</Option>

                      </Select>
                  </Form.Item>

              </Col>
          </Row>
          
          <Form.Item className='button_forma'>
              <Button className='button_form' type='primary' htmlType="submit" variant="success">Editar</Button>
          </Form.Item>

      </Form>
  )

}