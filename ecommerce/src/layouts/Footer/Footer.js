import React from 'react'
import { Layout } from 'antd';
import './Footer.scss'

export default function Footer() {
    return (
        <div>
            <Layout.Footer className="site-footer">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-6">
                            <h6>¿Qué queremos?</h6>
                            <p className="text-justify">Queremos que obtengas los mejores presion de productos con solo visitarnos </p>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Categories</h6>
                            <ul className="footer-links">


                                <li><a href="/admin">Ropa</a></li>

                                <li><a href="/admin">Tecnologia</a></li>

                                <li><a href="/admin">Hogar</a></li>


                            </ul>
                        </div>

                        <div className="col-xs-6 col-md-3">
                            <h6>Referencias</h6>
                            <ul className="footer-links">
                                <li><a >Sobre Nosotros</a></li>
                                <li><a >Contactos</a></li>

                            </ul>
                        </div>
                    </div>
                </div>
                <div className="key">
                    <h6>El tipo de Licencias Creative Commons implementada</h6>
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                        <img alt="Licencia Creative Commons" src={"https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png"} />
                    </a>
                    <br></br>
                    Esta obra está bajo una
                    <br></br>
                    <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">
                        Licencia Creative Commons Atribución-NoComercial-CompartirIgual 4.0 Internacional</a>.

                    <ul className="social-icons">

                    </ul>


                </div>
            </Layout.Footer >
        </div>
    )
}
