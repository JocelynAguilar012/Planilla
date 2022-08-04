//importando direcion mas version de config-------------
import { basePath, apiVersion } from './config';
//importando direcion mas version de config-------------



//api ver productos---------------------------------------
export function getordersApi(token){
    const url=`${basePath}/${apiVersion}/orders-get`;
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
export function deleteOrdersApi(token,userId){
    const url=`${basePath}/${apiVersion}/deleteorders/${userId}`;

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
export function updateOrdersApi(token,user,userId){
    const url=`${basePath}/${apiVersion}/updateOrders/${userId}`;

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
export function productsorderUpApi(data) {
    const url = `${basePath}/${apiVersion}/products-ordeerup`;
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
            if (result.order) {
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



