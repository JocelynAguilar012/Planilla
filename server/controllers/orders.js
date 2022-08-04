const fs = require("fs");
const path = require("path");
const Orders = require("../models/orders");




//mostrando productos----------------------------
function getOrders(req, res) {
    Orders.find().then(order => {
        if (!order) {
            res.status(404).send({ message: "No hay pedidos" });

        }
        else {
            res.status(200).send({order});
        }
    });

}


//funcion de activar ususarios 
async function deleteOrders(req, res) {
    
    const {id} = req.params;

 
    Orders.findByIdAndRemove(id, (err,userDelete)=>{
        if (err) {
            
            res.status(500).send({ message: "error del servidor" });
        }
        else{
            if (!userDelete) {
            
                res.status(404).send({ message: "no se encontro ningun usuario" });
            }
            else{
                    res.status(200).send({ message: "pedido eliminado correctamente" });

            }

        }
    });
}

//funcion de actualizar avatar  
async function updateOrders(req, res) {
    let userData = req.body;
    const params = req.params;

  
    Orders.findByIdAndUpdate({_id: params.id},userData, (err,userUpdate)=>{
        if (err) {
            
            res.status(500).send({ message: "error del servidor" });
        }
        else{
            if (!userUpdate) {
            
                res.status(404).send({ message: "no se encontro ningun Producto" });
            }
            else{
                res.status(200).send({ message: "pedido actualizado correctamente" });
            }

        }
    })
   

}

function productsUpcaarrto(req, res) {
    const order = new Orders();
    
    const { description, priceoforders, iduser } = req.body;

    order.description = description;
    order.priceoforders = priceoforders;
    order.iduser = iduser;

console.log(order);
    order.save((err, productsStored) => {

        if (err) {
            res.status(500).send({ message: "error del servidor" });
        }
        else {


            if (!productsStored) {
                res.status(404).send({ message: "error al crear orden" });
            }
            else {
                res.status(200).send({order: productsStored });

            }
        }


    })

}





// FUNCION DE INSERTAR--------------------------
module.exports = {
    getOrders,
    updateOrders,
    deleteOrders,
    productsUpcaarrto
};