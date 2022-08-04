import React from 'react'
import './SingIn.scss'
import {Redirect} from 'react-router-dom'
import Login from '../../components/Admin/LoginForm/Login'
import CheckIn from '../../components/Admin/RegisterForm/CheckIn'
import Footers from '../../layouts/Footer/Footer'
import Header from '../../layouts/Header/Header'
import logo from '../../assets/img/png/logo.png'
import {getAccessTokenApi} from '../../Api/auth'

//agregamos layout-------------------------
import { Layout,Tabs } from 'antd';
const {  Content } = Layout;
//agregamos layout-------------------------

//colocando el tabs-------------------------
const { TabPane } = Tabs;
//colocando el tabs-------------------------

//funcions tabs-------------------------
const onChange = (key) => {
};
//funcion tabs------------------------- 


export default function SingIn() {
  
  if (getAccessTokenApi()) {

    return <Redirect to="/admin"/>
    
  }
  return (
    <div>
      {/*----------------------------- inicio de layout------------------------ */}

      <Layout className='singn_layout'>
      <Layout.Header className='header_main'>
                <div className='header_logos'>
                <a title="Los Tejos" href="/">
                <img src={logo}  alt="ecommerce"></img>
                </a>
                    
                </div>
                 
                <div className='header_contenido'>
                </div>
            </Layout.Header>
        <Content
          className="site-layout"
          style={{
            padding: '0 20px', marginTop: 20,
          }}
        >

            {/*agregando el tabs  -------------------------------------*/}

            <Tabs defaultActiveKey="1" onChange={onChange} className='Style_tabs'>
             
              <TabPane tab="login"  key="1" className='tabpane_login'>
                  <Login></Login>
              </TabPane>
              
              <TabPane tab="Registra" key="2" className='tabpane_login'>
              <CheckIn></CheckIn>
              </TabPane>
            </Tabs>
            {/*agregando el tabs -------------------------------------*/}
          
        </Content>
        <br></br>
        <br></br>
       <Footers></Footers>
      </Layout>

      {/*----------------------------- fin de layout------------------------ */}
    </div>
  )
}
