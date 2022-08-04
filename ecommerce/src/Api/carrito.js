//importando direcion mas version de config-------------
import { basePath, apiVersion } from './config';
//importando direcion mas version de config-------------


//exportamos el metodo de insertar de postman -------------

export function productscarritoUpApi(data) {
    const url = `${basePath}/${apiVersion}/products-carritoup`;
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
            if (result.carrito) {
                return {
                    ok: true,
                    message: "Agregado al carrito "
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



//api ver prodrutos activos---------------------------------------
export function getProductcarritoApi(token,status){

    const url=`${basePath}/${apiVersion}/product-carrito?iduser=${status}`;
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

//api eliminar activos---------------------------------------
export function deletecarritoApi(token,userId){
    const url=`${basePath}/${apiVersion}/deletecarrito-user/${userId}`;

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

//api eliminar activos---------------------------------------
export function deleteAllcarritoApi(token,userId){
    const url=`${basePath}/${apiVersion}/deleteallcarrito-user/${userId}`;

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