const fs = require("fs");
const path = require("path");
const Products = require("../models/products");

// FUNCION DE INSERTAR--------------------------
function productsUp(req, res) {
    const products = new Products();
    const { title, price, category, description, iduser, name, phone, avatar,active } = req.body;

    products.title = title;
    products.price = price;
    products.category = category;
    products.description = description;
    products.iduser = iduser;
    products.name = name;
    products.phone = phone;
    products.avatar = avatar;
    products.active = active;

    products.save((err, productsStored) => {

        if (err) {
            res.status(500).send({ message: "error del servidor" });
        }
        else {


            if (!productsStored) {
                res.status(404).send({ message: "error al crear productos" });
            }
            else {
                res.status(200).send({ products: productsStored });

            }
        }


    })

}


//mostrando productos----------------------------
function getproducts(req, res) {
    Products.find().then(products => {
        if (!products) {
            res.status(404).send({ message: "No hay productos" });

        }
        else {
            res.status(200).send({ products });
        }
    });

}

//mostrando user activos----------------------------
function getProductsActive(req, res) {
    const query = req.query;
    Products.find({ active: query.active }).then(product => {
        if (!product) {
            res.status(404).send({ message: "No hay productosactivos" });

        }
        else {
            res.status(200).send({product});
        }
    });

}


//funcion de actualizar avatar  
function uploadAvatarProducts(req, res) {
    const params = req.params;
    //console.log("actualizando avatar");
    Products.findById({ _id: params.id }, (err, userData) => {
        if (err) {
            res.status(500).send({ message: "error del servidor" });

        }
        else {
            if (!userData) {
                res.status(404).send({ message: "No hay usuario encontrado" });

            }
            else {
                let user = userData;
                //console.log(user);
                //console.log(req.files);
                if (req.files) {
                    console.log(req.files);
                    let filePath = req.files.avatar.path;
                    let fileSplit = filePath.split("\\");
                    let flleName = fileSplit[2];
                    console.log(flleName);
                    let extSplit = flleName.split(".");
                    let fileExit = extSplit[1];
                    console.log(fileExit);
                    if (fileExit !== "png" && fileExit !== "jpg" && fileExit !== "jpeg") {
                        res.status(404).send({ message: "laextensiondelaimagen no esvalidad" });
                    }
                    else {
                        user.avatar = flleName;
                        Products.findByIdAndUpdate({ _id: params.id }, user,
                            (err, userResult) => {
                                if (err) {
                                    res.status(500).send({ message: "error del servidor" });

                                }
                                else {
                                    if (!userResult) {
                                        res.status(404).send({ message: "nose ha encontrado ningun usuario" });

                                    }
                                    else {
                                        res.status(200).send({ user: userResult });
                                    }
                                }
                            })

                    }

                }

            }
        }

    });

}

//obtener la imagen -----------------------
function getAvatarProduct(req, res) {
    const avatarName = req.params.avatarName;
    const filePath = "./uploads/products/"+avatarName;
    console.log(filePath);
    fs.exists(filePath,exists =>{
        if (!exists) {
            res.status(404).send({ message: "el avatar que buscas no existe" });

        }
        else {
          res.sendFile(path.resolve(filePath));
        }

    })
}

//funcion de activar ususarios 
async function activateProduct(req, res) {
    
    const {id} = req.params;
    const {active} = req.body;

 
    Products.findByIdAndUpdate(id,{active}, (err,userStored)=>{
        if (err) {
            
            res.status(500).send({ message: "error del servidor" });
        }
        else{
            if (!userStored) {
            
                res.status(404).send({ message: "no se encontro ningun PRODUCTO" });
            }
            else{
                if (active===true) {
            
                    res.status(200).send({ message: "usuario activado" });
                }
                else{
                    res.status(200).send({ message: "usuario desactivado" });
                }
            }

        }
    });
}

//funcion de activar ususarios 
async function deleteProduct(req, res) {
    
    const {id} = req.params;

 
    Products.findByIdAndRemove(id, (err,userDelete)=>{
        if (err) {
            
            res.status(500).send({ message: "error del servidor" });
        }
        else{
            if (!userDelete) {
            
                res.status(404).send({ message: "no se encontro ningun usuario" });
            }
            else{
                    res.status(200).send({ message: "usuario eliminado correctamente" });

            }

        }
    });
}

//funcion de actualizar avatar  
async function updateProduct(req, res) {
    let userData = req.body;
    const params = req.params;

  
    Products.findByIdAndUpdate({_id: params.id},userData, (err,userUpdate)=>{
        if (err) {
            
            res.status(500).send({ message: "error del servidor" });
        }
        else{
            if (!userUpdate) {
            
                res.status(404).send({ message: "no se encontro ningun Producto" });
            }
            else{
                res.status(200).send({ message: "Producto actualizado correctamente" });
            }

        }
    })
   

}


function getProductsCategory(req, res) {
    const query = req.query;
    Products.find({ category: query.category }).then(product => {
        if (!product) {
            res.status(404).send({ message: "No hay producto de esta categoria" });

        }
        else {
            res.status(200).send({product});
        }
    });

}




// FUNCION DE INSERTAR--------------------------
module.exports = {
    productsUp,
    getproducts,
    getProductsActive,
    getAvatarProduct,
    activateProduct,
    deleteProduct,
    uploadAvatarProducts,
    updateProduct,
    getProductsCategory

};