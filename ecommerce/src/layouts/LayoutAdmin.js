import React, { useState } from 'react';
import './LayoutAdmin.scss'
import SingIn from '../pages/SingIn/SingIn';
import Button from 'react-bootstrap/Button';
import Footer from '../layouts/Footer/Footer';
import useAuth from "../hooks/useAuth"
import { logout } from '../Api/auth'
//import {getAccessTokenApi,getRefreshTokenApi} from "../Api/auth"



//agregamos rutas dinamicas al contenido-----------
import { Route, Switch, Redirect, Link, withRouter } from 'react-router-dom'
//agregamos rutas dinamicas al contenido-----------



//agregamos layout-------------------------
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    PicCenterOutlined ,
    PicRightOutlined ,
    FormOutlined ,
    ShoppingCartOutlined
} from '@ant-design/icons';
import { Layout, Menu as MENUS } from 'antd';

const { Header, Sider, Content } = Layout;
//agregamos layout-------------------------





//agregamos rutas dinamicas ala el contenido-----------
function LoandRouter({ routes }) {

    return (
        <Switch>

            {routes.map((route, index) => (
                <Route
                    key={index}
                    path={route.path}
                    exact={route.exact}
                    component={route.component} />

            ))}
        </Switch>
    );
}
//agregamos rutas dinamicas al contenido-----------


function LayoutAdmin(props) {




    //trraer el token----------------------------

    //const token = getAccessTokenApi();
    //console.log(token);
    //const refresh = getRefreshTokenApi();
    //console.log(refresh);
    //trraer el token----------------------------

    //agregamos rutas dinamicas al contenido-----------
    const { routes, location } = props;
    //agregamos rutas dinamicas al contenido-----------


    //agregamos layout-------------------------------
    const [collapsed, setCollapsed] = useState(false);
    //agregamos layout-------------------------------

    const logoutUser = () => {
        logout();
        window.location.reload();

    }



    //redirecciona la pagina antes de loguear-------------------
    const { user, isLoading } = useAuth();

    if (!user && !isLoading) {
        return (
            <>
                <Route path="/admin/login" component={SingIn}></Route>
                <Redirect to="/admin/login"></Redirect>
            </>
        )

    }
    //redirecciona la pagina antes de loguear-------------------


    if (user && !isLoading) {
        return (
            <div>
                {/*----------------------------- inicio de layout------------------------ */}

                <div className='content1'>
                    <Layout>
                        <Sider className='sider_layoutAdmin' trigger={null} collapsible collapsed={collapsed}>
                            <div className='logo'>
                                <a title="ADMIN" href="/">
                                    <div className='logo_admin'></div>
                                </a>
                            </div>
                            <MENUS
                                theme="dark"
                                mode="inline"
                                defaultSelectedKeys={[location.pathname]}
                            >
                                <MENUS.Item key="/admin/users">
                                    <Link to={"/admin/users"}>
                                        <UserOutlined></UserOutlined>
                                        <span className='label_menu'>Usuarios</span>
                                    </Link>
                                </MENUS.Item>
                            </MENUS>

                        </Sider>
                        <Layout className="site-layout">
                            <Header className="header-site-layout">
                                <div className="header-site-layout_icon">
                                    {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                                        className: 'trigger',
                                        onClick: () => setCollapsed(!collapsed),
                                    })}
                                </div>

                                <div className='button_off'>
                                    <Button onClick={logoutUser} variant="primary">cerrar sesión</Button>
                                </div>

                            </Header>
                            <Content
                                className="site-layout-background"
                                style={{
                                    padding: 34,
                                    minHeight: 280,
                                }}
                            >

                                {/*agregamos rutas dinamicas al contenido-----------*/}
                                <LoandRouter user={user} routes={routes}></LoandRouter>
                                { /*agregamos rutas dinamicas al contenido-----------*/}

                            </Content>

                        </Layout>
                    </Layout>

                </div>
                <div className='content2'>
                    <Footer ></Footer>

                </div>



                {/*----------------------------- fin de layout----------------------------- */}
            </div>

        )
    }
    return null;
}
export default withRouter(LayoutAdmin);

