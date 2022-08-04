import React,{ useState,useEffect,createContext } from 'react';
import jwtDecode from "jwt-decode";
import {getAccessTokenApi,getRefreshTokenApi,refreshAccessTokenApi,logout} from '../Api/auth';

export const AuthContext=createContext();

export default function AuthProvider(props){
    const {children}=props;
    const [user, setUser] = useState({
        user:null,
        isLoading:true
    });
  
    useEffect(() => {
        checkUserLogin(setUser) }, [])
   
    //devuelve el contexto de toda la pagina web
    return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function checkUserLogin(setUser){
    //obteniendo el token
  const accessToken=getAccessTokenApi();
  //si el token es nulo
  if (!accessToken) {
    //refrezcando el token
    const refreshToken=getRefreshTokenApi();
    //si el token ha caducado
    if (!refreshToken) {
        logout();
        setUser({
            user:null,
            isLoading:false
        });
    } else{
        refreshAccessTokenApi(refreshToken);
    }
}else{
    setUser({
        isLoading:false,
        user:jwtDecode(accessToken)
    });
   /*const{isLoading,user}=setUser;
   console.log(user);*/
} 

}
