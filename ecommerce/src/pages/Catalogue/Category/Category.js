import React from 'react'
import Catalogue from '../Catalogue';
//agregamos layout-------------------------
import { Layout,Tabs } from 'antd';
import './Category.scss'
const {  Content } = Layout;
//agregamos layout-----


//colocando el tabs-------------------------
const { TabPane } = Tabs;
//colocando el tabs-------------------------

//funcions tabs-------------------------
const onChange = (key) => {
};
//funcion tabs------------------------- 

export default function Category() {
  return (
    <div>
    {/*----------------------------- inicio de layout------------------------ */}

    <Layout className="site-layou">
      <Content
       
      >
          {/*agregando el tabs  -------------------------------------*/}

          <Tabs defaultActiveKey="1" onChange={onChange} >
           
            <TabPane tab="Electrodomesticos"  key="1" >
            <Catalogue category={"Electro"}></Catalogue>
            </TabPane>
            
            <TabPane tab="Muebles" key="2" >
            <Catalogue category={"Muebles"}></Catalogue>
            </TabPane>
            <TabPane tab="Ropa y calzado"  key="3" >
            <Catalogue category={"Ropa"}></Catalogue>
             </TabPane>
             
             <TabPane tab="Juguetes" key="4" >
             <Catalogue category={"Juguetes"}></Catalogue>
             </TabPane>
             <TabPane tab="Peliculas"  key="5" >
             <Catalogue category={"Pelicula"}></Catalogue>
             </TabPane>
             
             <TabPane tab="Juegos" key="6" >
             <Catalogue category={"Juegos"}></Catalogue>
             </TabPane>
          </Tabs>
          {/*agregando el tabs -------------------------------------*/}
        
      </Content>
    </Layout>

    {/*----------------------------- fin de layout------------------------ */}
  </div>
  )
}
