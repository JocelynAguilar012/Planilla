import React, {  useState  } from 'react'
import './RegisterProducts.scss'
import {Select, Form, Col, Row, Input, Button, notification } from 'antd'
import {
    UserAddOutlined,DollarCircleOutlined ,CopyOutlined 
} from '@ant-design/icons';
import { getAccessTokenApi } from "../../../Api/auth"
import { productsUpApi } from '../../../Api/products'
import jwtDecode from 'jwt-decode';

const accesToken = getAccessTokenApi();

const { Option } = Select;


export default function RegisterProducts() {

    const tokens = jwtDecode(accesToken);




    //guardando el estado de los inputs____________________________
    let [inputs, setInputs] = useState({
        title: "",
        price: "",
        category: "Categorias",
        description: "",
        iduser: tokens.id,
        name: tokens.name,
        phone: tokens.phone,
        avatar: "",
        active: false

    });



    //funcion reseteo de imputs-----------------------------------
    const resetForm = () => {

        setInputs({

            title: "",
            price: "",
            category: "Categorias",
            description: "",
            iduser: tokens.id,
            name: tokens.name,
            phone: tokens.phone,
            avatar: "",
            active:false


        })



    }


    //funcion que captura cualquier movimiento del form-----------------
    const changeForm = e => {
        setInputs({
            ...inputs, [e.target.name]: e.target.value
        });

    }
    //funcion que captura cualquier movimiento del form-----------------

    //funcion de registrar
    const register = async e => {
        e.preventDefault();

console.log(inputs);
        if (!inputs.title || !inputs.price || !inputs.category
            || !inputs.description) {

            notification["error"]({
                message: "todos los campos son obligatorios"
            });
        }
        else {
            const result = await productsUpApi(inputs);
            if (!result.ok) {
                notification["error"]({
                    message: result.message
                });
            }
            else {
                notification["success"]({

                    message: result.message

                });

            }
            resetForm();
        };
    };




    return (

        <div className='Register_products'>
            <h1 className='title_product'>Ingresando propuestas de pedidos</h1>
            <Form className='form-edit' onChange={changeForm}
                onSubmitCapture={register}>
                <Row gutter={24}>
                    <Col span={12} >
                        <Form.Item>
                            <Input 
                                prefix={<UserAddOutlined />}
                                placeholder="Titulo del producto"
                                type="title"
                                name="title"
                                value={inputs.title}
                            />
                        </Form.Item>
                    </Col>

                    <Col span={6} >
                        <Form.Item>
                            <Input
                                prefix={<DollarCircleOutlined  />}
                                type="number"
                                placeholder="Precio"
                                name="price"
                                value={inputs.price}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={6} >
                        <Form.Item>

                            <Select
                                placeholder="Seleccione la categoria"
                                type="category"
                                name="category"

                                onChange={e => setInputs({ ...inputs, category: e })}
                                value={inputs.category}
                            >
                                <Option value="Electro">Electrodomesticos</Option>
                                <Option value="Muebles">Muebles</Option>
                                <Option value="Ropa">Ropa y calzado</Option>
                                <Option value="Juguetes">juguetes</Option>
                                <Option value="Pelicula">Peliculas</Option>
                                <Option value="Juegos">juegos</Option>

                            </Select>
                        </Form.Item>

                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={24} >
                        <Form.Item>
                            <Input
                                prefix={<CopyOutlined  />}
                                placeholder="Descripcion"
                                type="description"
                                name="description"
                                value={inputs.description}
                            />
                        </Form.Item>
                    </Col>


                </Row>

                <Form.Item className='button_forma'>
                    <Button className='button_form' type='primary' htmlType="submit" variant="success">Agregar</Button>
                </Form.Item>

            </Form>



        </div>
    )
}
