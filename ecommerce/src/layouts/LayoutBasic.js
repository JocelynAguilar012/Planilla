import React from 'react';
import './LayoutBasic.scss'
import Footer from '../layouts/Footer/Footer';
import Header from '../layouts/Header/Header';
import Carousel from './Carousel/Carousel';
//agregamos rutas dinamicas al contenido-----------
//agregamos rutas dinamicas al contenido-----------



//agregamos layout-------------------------
import { Layout } from 'antd';
const { Content } = Layout;
//agregamos layout-------------------------


//agregamos rutas dinamicas ala el contenido-----------

//agregamos rutas dinamicas al contenido-----------


export default function LayoutBasic(props) {


  //agregamos rutas dinamicas al contenido-----------
  //agregamos rutas dinamicas al contenido-----------

  return (
    <div>
      {/*----------------------------- inicio de layout------------------------ */}

      <Layout className='layout_main'>
        <Header />
        <h1 className='Title'>ECOMMERCE</h1>
        <h3 className='SubTitle'>Compra rapido y seguro</h3>
        <Content
          className="site-layout"
          style={{
            padding: '0 20px', marginTop: 20,
          }}
        >
          <div className='Carousel_styls'>
          <a title="ADMIN" href="/admin">
          <Carousel></Carousel>
            </a>
          </div>
          <br></br>
          <br></br>
          <div className='contaner_main'>
          <a title="ADMIN" href="/admin">
            <div className='container_calss1'>

            </div>
            </a>
            <a title="ADMIN" href="/admin">
            <div className='container_calss2'>

            </div>
            </a>
            <a title="ADMIN" href="/admin">
            <div className='container_calss3'>

            </div>
            </a>
            <a title="ADMIN" href="/admin">
            <div className='container_calss4'>

            </div>
            </a>

          </div>
          <br></br>
          <br></br>
          <div className='contaner_main'>
          <a title="ADMIN" href="/admin">
            <div className='container_calss5'>

            </div>
            </a>
            <a title="ADMIN" href="/admin">
            <div className='container_calss6'>

            </div>
            </a>
            <a title="ADMIN" href="/admin">
            <div className='container_calss7'>

            </div>
            </a>
            <a title="ADMIN" href="/admin">
            <div className='container_calss8'>

            </div>
            </a>

          </div>

        </Content>
        <br></br>
        <Footer></Footer>
      </Layout>

      {/*----------------------------- fin de layout------------------------ */}

    </div>
  )
}





