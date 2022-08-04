import React,{useState,useEffect} from 'react'
import {getAccessTokenApi}from '../../Api/auth'
//import {getUserApi} from '../../Api/user'
import {getProductApiActive} from '../../Api/products'
import './ShowProducts.scss'
import ListProducts from '../../components/Products/Product/ListProduct/ListProducts'
export default function ShowProducts() {

  const [usersActive,setUsersActive]=useState([]);
  const [usersInactive,setUsersInactive]=useState([]);
  const [reloadUser,serReloadUsers]=useState(false);
  const token =getAccessTokenApi();

  //console.log('usersActive',usersActive);
 // console.log('usersInactive',usersInactive);

  useEffect(()=>{
    getProductApiActive(token,true).then(response =>{
      setUsersActive(response.product);
    });

    getProductApiActive(token,false).then(response =>{
      setUsersInactive(response.product);
    });
    serReloadUsers(false);

  },[token,reloadUser]);

  return (
    <div className='ListProducts'><ListProducts  usersActive={usersActive} serReloadUsers={serReloadUsers} usersInactive={usersInactive}></ListProducts></div>
  )
}
