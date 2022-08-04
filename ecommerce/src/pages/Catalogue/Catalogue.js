import './Catalogue.scss'
import React,{useState,useEffect} from 'react'
import {getAccessTokenApi}from '../../Api/auth'
//import {getUserApi} from '../../Api/user'
import {getProductcategoryApi} from '../../Api/products'
import LstCategoty from '../../components/Categoty/Categorys/ListCategory/LstCategoty'
export default function Catalogue(props) {
  const {category} = props;

  const [usersActive,setUsersActive]=useState([]);
  const [usersInactive,setUsersInactive]=useState([]);
  const [reloadUser,serReloadUsers]=useState(false);
  const token =getAccessTokenApi();

  //console.log('usersActive',usersActive);
 // console.log('usersInactive',usersInactive);

  useEffect(()=>{
    getProductcategoryApi(token,category).then(response =>{
      setUsersActive(response.product);
      console.log(response.product);
    });

    serReloadUsers(false);

  },[token,reloadUser]);




  return (
    <div><LstCategoty 
    usersActive={usersActive} 
    serReloadUsers={serReloadUsers} 
    usersInactive={usersInactive}>
      </LstCategoty></div>

    
  )
}
