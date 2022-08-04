
import './Carrito.scss'
import React,{useState,useEffect} from 'react'
import {getAccessTokenApi}from '../../Api/auth'
//import {getUserApi} from '../../Api/user'
import {getProductcarritoApi} from '../../Api/carrito'
import ListCarrito from '../../components/Carrito/Carrito/ListCarrito/ListCarrito'
import jwtDecode from 'jwt-decode';

const accesToken = getAccessTokenApi();

export default function Carrito() {

  const [usersActive,setUsersActive]=useState([]);
  const [usersInactive,setUsersInactive]=useState([]);
  const [reloadUser,serReloadUsers]=useState(false);
  const token =getAccessTokenApi();
  const tokens = jwtDecode(accesToken);
  console.log(tokens.id);
  //console.log('usersActive',usersActive);
 // console.log('usersInactive',usersInactive);

  useEffect(()=>{
    getProductcarritoApi(token,tokens.id).then(response =>{
      setUsersActive(response.product);
    });

   

    serReloadUsers(false);

  },[token,reloadUser]);

  return (
    <div><ListCarrito 
    usersActive={usersActive} 
    serReloadUsers={serReloadUsers} 
    usersInactive={usersInactive}>
      </ListCarrito></div>
  )
}
