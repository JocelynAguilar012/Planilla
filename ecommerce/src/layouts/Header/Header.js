import React from 'react'
import { Layout } from 'antd';
import Button from 'react-bootstrap/Button';
import logo from '../../assets/img/png/logo.png'
import './Header.scss'

export default function Header() {
    return (
        <div>
            <Layout.Header className='header_main'>
                <div className='header_logos'>
                <a title="Los Tejos" href="/">
                <img src={logo}  alt="ecommerce"></img>
                </a>
                    
                </div>
                 
                <div className='header_contenido'>
                <Button href="/admin" variant="primary">Registrate</Button>{' '}
                </div>
            </Layout.Header>
        </div>
    )
}
