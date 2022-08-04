const fs = require("fs");
const path = require("path");
const Carrito = require("../models/carrito");

// FUNCION DE INSERTAR--------------------------
function productsUpcaarrto(req, res) {
    const carrito = new Carrito();
    
    const { title, price, category, iduser, name } = req.body;

    carrito.title = title;
    carrito.price = price;
    carrito.category = category;
    carrito.iduser = iduser;
    carrito.name = name;

   console.log(carrito);

    carrito.save((err, productsStored) => {

        if (err) {
            res.status(500).send({ message: "error del servidor" });
        }
        else {


            if (!productsStored) {
                res.status(404).send({ message: "error al crear productos" });
            }
            else {
                res.status(200).send({ carrito: productsStored });

            }
        }


    })

}


//mostrando productos----------------------------


function getProductsCarrito(req, res) {
    const query = req.query;
    Carrito.find({ iduser: query.iduser }).then(product => {
        if (!product) {
            res.status(404).send({ message: "No hay producto de esta categoria" });

        }
        else {
            res.status(200).send({product});
        }
    });

}


//funcion eliminar
async function deletecarrito(req, res) {
    
    const {id} = req.params;
 
    Carrito.findByIdAndRemove(id, (err,userDelete)=>{
        if (err) {
            
            res.status(500).send({ message: "error del servidor" });
        }
        else{
            if (!userDelete) {
            
                res.status(404).send({ message: "no se encontro ningun dato" });
            }
            else{
                    res.status(200).send({ message: "Pedido eliminado correctamente" });

            }

        }
    });
}

//funcion eliminar
async function deleteAllcarrito(req, res) {
    Carrito.deleteMany({iduser: req.params.id}, (err,userDelete)=>{
        if (err) {
            
            res.status(500).send({ message: "error del servidor" });
        }
        else{
            if (!userDelete) {
            
                res.status(404).send({ message: "no se encontro ningun dato" });
            }
            else{
                    res.status(200).send({ message: "carrito limpiado" });

            }

        }
    });
}


// FUNCION DE INSERTAR--------------------------
module.exports = {
    productsUpcaarrto,
    getProductsCarrito,
    deletecarrito,
    deleteAllcarrito

};