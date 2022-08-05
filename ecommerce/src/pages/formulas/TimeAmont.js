import React from 'react';
import { Time } from './Time';
import { Amount } from './Amount';
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
//funcions tabs-------------------------

export const TimeAmont = () => {
  return (
    <>
      {/*agregando el tabs  -------------------------------------*/}

      <Tabs defaultActiveKey="1" onChange={onChange} className='Style_tabs'>
             
             <TabPane tab="Time"  key="1" className='tabpane_login'>
                 <Time></Time>
             </TabPane>
             
             <TabPane tab="Amount" key="2" className='tabpane_login'>
             <Amount></Amount>
             </TabPane>
           </Tabs>
           {/*agregando el tabs -------------------------------------*/}
    </>
  )
}
