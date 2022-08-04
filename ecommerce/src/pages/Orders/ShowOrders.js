
import React,{useState,useEffect} from 'react'
import {getAccessTokenApi}from '../../Api/auth'
//import {getUserApi} from '../../Api/user'
import {getordersApi} from '../../Api/Order'
import './ShowOrders.scss'
import ListOrders from '../../components/Orders/Orders/ListOrders/ListOrders'
export default function  ShowOrders() {

  const [usersActive,setUsersActive]=useState([]);
  const [reloadUser,serReloadUsers]=useState(false);
  const token =getAccessTokenApi();

 
  useEffect(()=>{

    async function fetchData(props) {
      const  setUsersActive  = props;
      const response = await getordersApi(token);
      setUsersActive(response.order);
      
    }

   fetchData(setUsersActive); 

  serReloadUsers(false);

},[token,reloadUser]);
 

  return (
    <div><ListOrders usersActive={usersActive}
     serReloadUsers={serReloadUsers}
      ></ListOrders></div>
  )
}
