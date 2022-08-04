//importando direcion mas version de config-------------
import { basePath, apiVersion } from './config';
//importando direcion mas version de config-------------


//exportamos el metodo de insertar de postman -------------

export function signUpApi(data) {
    const url = `${basePath}/${apiVersion}/sign-up`;
    const params = {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type": "application/json"
        }
    };
//exportamos el metodo de insertar de postman -------------


    return fetch(url, params)
        .then(response => {
            return response.json();
        })

        .then(result => {
            if (result.user) {
                return {
                    ok: true,
                    message: "usuario creado correctamente"
                };


            }
            return {
                ok: false,
                message: result.message
            };
        })


        .catch(err => {
            return {
                ok: false,
                message: err.message
            };
        });


}


//api login---------------------------------------
export function signInApi(data){
    const url=`${basePath}/${apiVersion}/sign-in`;
    const params={
        method:"POST",
        body: JSON.stringify(data),
        headers:{
            "Content-Type":"application/json"
        }
    };
    return fetch(url,params)
    .then(response=>{
        //console.log(response);
        return response.json();
    })
    .then(result=>{
       // aca se muestar el token console.log(result);
        return result;
    })
    .catch(err=>{
        return err.message;
    });
}
//api login---------------------------------------


//api ver ususarios---------------------------------------
export function getUserApi(token){
    const url=`${basePath}/${apiVersion}/users`;
    const params={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        }
    };
    return fetch(url,params)
    .then(response=>{
        //console.log(response);
        return response.json();
    })
    .then(result=>{
       // aca se muestar el token console.log(result);
        return result;
    })
    .catch(err=>{
        return err.message;
    });
}
//api ver ususarios---------------------------------------


//api ver ususarios activos---------------------------------------
export function getUserApiActive(token,status){

    const url=`${basePath}/${apiVersion}/users-active?active=${status}`;
    const params={
        method:"GET",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        }
    };
    return fetch(url,params)
    .then(response=>{
        //console.log(response);
        return response.json();
    })
    .then(result=>{
       // aca se muestar el token console.log(result);
        return result;
    })
    .catch(err=>{
        return err.message;
    });
}
//api ver ususarios activos---------------------------------------

//api actualizando avatar ----------------------------------------
export function updloadAvatarApi(token,avatar,userId){
    const url=`${basePath}/${apiVersion}/upload-avatar/${userId}`;
    const formData = new FormData();
    formData.append("avatar",avatar,avatar.name);

    const params={
        method:"PUT",
        body: formData,
        headers:{
            Authorization: token
        }
    };
    return fetch(url,params)
    .then(response=>{
        //console.log(response);
        return response.json();
    })
    .then(result=>{
       // aca se muestar el token console.log(result);
        return result;
    })
    .catch(err=>{
        return err.message;
    });

}
//api actualizando avatar ----------------------------------------

//api obtener avatar ----------------------------------------
export function getAvatarApi(avatarName){
    const url=`${basePath}/${apiVersion}/get-avatar/${avatarName}`;
   
    return fetch(url)
    .then(response=>{
        //console.log(response);
        return response.url;
    })
    .catch(err=>{
        return err.message;
    });

}
//api obtener avatar ----------------------------------------

//api actualizando avatar ----------------------------------------
export function updateUserApi(token,user,userId){
    const url=`${basePath}/${apiVersion}/update-user/${userId}`;

    const params={
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        },
        body: JSON.stringify(user)
    };
    return fetch(url,params)
    .then(response=>{
        //console.log(response);
        return response.json();
    })
    .then(result=>{
       // aca se muestar el token console.log(result);
        return result;
    })
    .catch(err=>{
        return err.message;
    });

}
//api actualizando avatar ----------------------------------------

//api activar o desactivar usuarios ---------------------------------------
export function activateUserApi(token,userId,status){
    const url=`${basePath}/${apiVersion}/activate-user/${userId}`;

    const params={
        method:"PUT",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        },
        body: JSON.stringify({
            active: status
        })
    };
    return fetch(url,params)
    .then(response=>{
        //console.log(response);
        return response.json();
    })
    .then(result=>{
       // aca se muestar el token console.log(result);
        return result.message;
    })
    .catch(err=>{
        return err.message;
    });

}
//api ver ususarios activos---------------------------------------

export function deleteUserApi(token,userId){
    const url=`${basePath}/${apiVersion}/delete-user/${userId}`;

    const params={
        method:"DELETE",
        headers:{
            "Content-Type":"application/json",
            Authorization: token
        },
      
    };
    return fetch(url,params)
    .then(response=>{
        //console.log(response);
        return response.json();
    })
    .then(result=>{
       // aca se muestar el token console.log(result);
        return result.message;
    })
    .catch(err=>{
        return err.message;
    });

}
//api ver ususarios activos---------------------------------------