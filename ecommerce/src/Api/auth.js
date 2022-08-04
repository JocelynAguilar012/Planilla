import { basePath,apiVersion } from "./config";
import {ACCESS_TOKEN,REFRESH_TOKEN} from '../utils/constants';
import jwtDecode from "jwt-decode";

export function getAccessTokenApi(){
 //aca retorna los acces token que tenemos actualmente ---------   
 const accessToken=localStorage.getItem(ACCESS_TOKEN);
  //aca retorna los acces token que tenemos actualmente ---------  
 if (!accessToken||accessToken==="null") {
    return null;
 }
 return  willExpireToken(accessToken) ? null:accessToken;
}
//comprobamos que el refresh token no expire 
export function getRefreshTokenApi(){
    const refreshToken=localStorage.getItem(REFRESH_TOKEN);
    if (!refreshToken||refreshToken==="null") {
        return null; 
    }
    return willExpireToken(refreshToken)?null:refreshToken;
}

//refrescar token
export function refreshAccessTokenApi(refreshToken){
    const url=`${basePath}/${apiVersion}/refresh-access-token`;
    const bodyObj={
        refreshToken: refreshToken
    };
    const params={
        method: "POST",
        body:JSON.stringify(bodyObj),
        headers:{
            "Content-Type":"application/json"
        }
    };
    fetch(url,params)
    .then(response=>{
        if (response.status!==200) {
            return null
        }
        return response.json();
    })
    .then(result=>{
        if (!result) {
            //Deslogear usuarioo cuando el refresh token ha caducado
            logout();

        }else{
            const{accessToken,refreshToken}=result;
            localStorage.setItem(ACCESS_TOKEN,accessToken);
            localStorage.setItem(REFRESH_TOKEN,refreshToken);
        }
    })
}

//funcion desloguear
export function logout(){
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(REFRESH_TOKEN);
}

//comprobar que acces toke no haya expirado
function willExpireToken(token){
    const seconds=60;
    const metaToken=jwtDecode(token);
    const{exp}=metaToken;
    //fecha de hoy
    const now=(Date.now()+seconds)/1000;
    return now>exp;

}