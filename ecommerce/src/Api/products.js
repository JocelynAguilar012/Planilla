//importando direcion mas version de config-------------
import { basePath, apiVersion } from './config';
//importando direcion mas version de config-------------


//exportamos el metodo de insertar de postman -------------

export function productsUpApi(data) {
    const url = `${basePath}/${apiVersion}/products-up`;
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
            console.log(result.products);
            if (result.products) {
                return {
                    ok: true,
                    message: "Producto registrado "
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



//api ver productos---------------------------------------
export function getProductsApi(token){
    const url=`${basePath}/${apiVersion}/product`;
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


//api ver prodrutos activos---------------------------------------
export function getProductApiActive(token,status){

    const url=`${basePath}/${apiVersion}/product-active?active=${status}`;
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


//api actualizando avatar ----------------------------------------
export function updloadProductApi(token,avatar,userId){
    const url=`${basePath}/${apiVersion}/uploadproduct-avatar/${userId}`;
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
export function getAvatarProductApi(avatarName){
    const url=`${basePath}/${apiVersion}/getproduct-avatar/${avatarName}`;
   
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

//api activar o desactivar usuarios ---------------------------------------
export function activateProductApi(token,userId,status){
    const url=`${basePath}/${apiVersion}/activateProduct-user/${userId}`;

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
export function deleteProductApi(token,userId){
    const url=`${basePath}/${apiVersion}/deleteProduct-user/${userId}`;

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

//api actualizando avatar ----------------------------------------
export function updateProductApi(token,user,userId){
    const url=`${basePath}/${apiVersion}/updateProduct-user/${userId}`;

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


//api ver prodrutos activos---------------------------------------
export function getProductcategoryApi(token,status){

    const url=`${basePath}/${apiVersion}/product-category?category=${status}`;
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



