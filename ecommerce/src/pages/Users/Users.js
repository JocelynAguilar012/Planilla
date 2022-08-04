import React,{useState,useEffect} from 'react'
import {getAccessTokenApi}from '../../Api/auth'
//import {getUserApi} from '../../Api/user'
import {getUserApiActive} from '../../Api/user'
import './Users.scss'
import ListUser from '../../components/Admin/Users/ListUser/ListUser'
export default function Users() {

  const [usersActive,setUsersActive]=useState([]);
  const [usersInactive,setUsersInactive]=useState([]);
  const [reloadUser,serReloadUsers]=useState(false);
  const token =getAccessTokenApi();

  //console.log('usersActive',usersActive);
 // console.log('usersInactive',usersInactive);

  useEffect(()=>{
    getUserApiActive(token,true).then(response =>{
      setUsersActive(response.users);
    });

    getUserApiActive(token,false).then(response =>{
      setUsersInactive(response.users);
    });
    serReloadUsers(false);

  },[token,reloadUser]);


  return (
    <div className='main'><ListUser  usersActive={usersActive} serReloadUsers={serReloadUsers} usersInactive={usersInactive}></ListUser></div>
  )
}
