import React, { useEffect, useState } from 'react'
import {  Form, Col, Row, Input, Button, notification } from 'antd'
import {
  UserAddOutlined, DollarCircleOutlined 
} from '@ant-design/icons';
//import jwtDecode from 'jwt-decode';


import './EditOrders.scss'
import { updateOrdersApi } from '../../../../Api/Order'
import { getAccessTokenApi } from "../../../../Api/auth"

//const {tokens} = jwtDecode(getAccessTokenApi);
export default function EditOrders(props) {

  const { user, setIsVisibleModal, serReloadUsers } = props;


  const [userData, setUserData] = useState({});


  useEffect(() => {
    setUserData({

      description: user.description,
      priceoforders: user.priceoforders,
      iduser: user.iduser,

    });
  }, [user]);






  //  console.log(avatar);



  const updateUser = e => {
    e.preventDefault();

    const token = getAccessTokenApi();
    let userUpdate = userData;

    if (!userUpdate.description || !userUpdate.priceoforders) {
      notification["error"]({
        message: "los datos son obligatorios"
      });
      return;
    }
    else {
      updateOrdersApi(token, userUpdate, user._id).then(Result => {
       
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
      <EditForm
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      ></EditForm>

    </div>
  )
}






function EditForm(props) {
  const { userData, setUserData, updateUser } = props;

  return (
    <Form className='form-edit' onSubmitCapture={updateUser}>
      <Row gutter={24}>
        <Col span={16} >
          <Form.Item>
            <Input
              prefix={<UserAddOutlined />}
              placeholder="Detalles"
              value={userData.description}
              onChange={e => setUserData({ ...userData, description: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={8} >
          <Form.Item>
            <Input
              prefix={<DollarCircleOutlined  />}
              placeholder="precio"
              value={userData.priceoforders}
              onChange={e => setUserData({ ...userData, priceoforders: e.target.value })}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item className='button_forma'>
        <Button className='button_form' type='primary' htmlType="submit" variant="success">Editar</Button>
      </Form.Item>

    </Form>
  )

}