import React, { useCallback, useEffect, useState } from 'react'
import { Image, Select, Form, Col, Row, Input, Button, notification } from 'antd'
import {
    UserAddOutlined, PhoneOutlined, ContactsOutlined
    , LockOutlined
} from '@ant-design/icons';




import { useDropzone } from 'react-dropzone'
import './EditUserForm.scss'
import { getAvatarApi, updateUserApi, updloadAvatarApi } from '../../../../Api/user'
import NoAvatar from "../../../../assets/img/png/no-avatar.png"
import { getAccessTokenApi } from "../../../../Api/auth"



export default function EditUserForm(props) {
    const { user, setIsVisibleModal,serReloadUsers } = props;

    const [avatar, setAvatar] = useState(null);

    const [userData, setUserData] = useState({});


    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            phone: user.phone,
            dui: user.dui,
            email: user.email,
            avatar: user.avatar,
            role: user.role,
            password: "",
            repeatPassword: ""

        });
    }, [user]);



    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);

            })
        }
        else {
            setAvatar(null);
        }
    }, [user]);



    //  console.log(avatar);


    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file })

        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [avatar]);








    const updateUser = e => {
        e.preventDefault();

        const token = getAccessTokenApi();
        let userUpdate = userData;

        if (!userUpdate.password || !userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {


                notification["error"]({
                    message: "las contraseñas deben ser iguales y no ser vacias"
                });
                return;
            }
            else{
            delete userUpdate.repeatPassword;
            }

            
        }
        if (!userUpdate.name || !userUpdate.email || !userUpdate.phone
            || !userUpdate.lastname || !userUpdate.dui) {
            notification["error"]({
                message: "los datos son obligatorios"
            });   
             return;
        }          
        if (typeof userData.avatar === "object") {
            console.log(avatar);
            console.log(userUpdate.avatar);
            updloadAvatarApi(token,userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName;
                updateUserApi(token,userUpdate,user._id).then(Result =>{
                    console.log(userUpdate);
                    notification["success"]({
                        message: Result.message
                      });
                      setIsVisibleModal(false);
                      serReloadUsers(true);
                });
            });
            
          }
          else {

            updateUserApi(token,userUpdate,user._id).then(Result =>{
                notification["success"]({
                    message: Result.message
                  });
                  setIsVisibleModal(false);
                  serReloadUsers(true);
            });

          }

    };


    return (
        <div>
            <UploadAvatar
                avatar={avatar}
                setAvatar={setAvatar}
            >

            </UploadAvatar>
            <EditForm
                userData={userData}
                setUserData={setUserData}
                updateUser={updateUser}
            ></EditForm>

        </div>
    )
}

function UploadAvatar(props) {

    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);
    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview)

            }
            else {
                setAvatarUrl(avatar)
            }

        }
        else {
            setAvatarUrl(null)

        }

    }, [avatar]);



    const onDrop = useCallback(
        accepteFiles => {
            const file = accepteFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) });
        }, [setAvatar]

    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg,image/png,image/jpg",
        noKeyboard: true,
        onDrop

    });


    return (
        <div className='upload-avat' {...getRootProps()}>
            <div>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <Image size={150} src={NoAvatar} />
                ) : (<Image size={150} src={avatarUrl ? avatarUrl : NoAvatar} />)}
            </div>
            <div className='tex_add_img'>
                +Add
            </div>

        </div>

    )

}


function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;

    return (
        <Form className='form-edite' onSubmitCapture={updateUser}>
            <Row gutter={24}>
                <Col span={12} >
                    <Form.Item>
                        <Input className='form-edite'
                            prefix={<UserAddOutlined />}
                            placeholder="Nombre"
                            value={userData.name}
                            onChange={e => setUserData({ ...userData, name: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12} >
                    <Form.Item>
                        <Input className='form-edite'
                            prefix={<UserAddOutlined />}
                            placeholder="Apellido"
                            value={userData.lastname}
                            onChange={e => setUserData({ ...userData, lastname: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12} >
                    <Form.Item>
                        <Input className='form-edite'   type="number"
                            prefix={<PhoneOutlined />}
                            placeholder="Telefono"
                            value={userData.phone}
                            onChange={e => setUserData({ ...userData, phone: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12} >
                    <Form.Item>
                        <Input   type="number" className='form-edite'
                            prefix={<ContactsOutlined />} 
                            placeholder="Dui"
                            value={userData.dui}
                            onChange={e => setUserData({ ...userData, dui: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Row gutter={24}>
                <Col span={12} >
                    <Form.Item>
                        <Input className='form-edite'
                            prefix={<LockOutlined />}
                            placeholder="Contraseña"
                            type="password"
                            onChange={e => setUserData({ ...userData, password: e.target.value })}
                        />
                    </Form.Item>
                </Col>
                <Col span={12} >
                    <Form.Item>
                        <Input className='form-edite'
                            prefix={<LockOutlined />}
                            type="password"
                            placeholder="Confirmar Contraseña"
                            onChange={e => setUserData({ ...userData, repeatPassword: e.target.value })}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item className='button_forma'>
                <Button className='button_form' type='primary' htmlType="submit" variant="success">Editar</Button>
            </Form.Item>

        </Form>
    )

}