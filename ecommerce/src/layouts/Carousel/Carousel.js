import React from 'react'
import './Carousel.scss'
import img1 from '../../assets/img/jpg/carouse1.jpg'
import img2 from '../../assets/img/jpg/carouse2.jpg'
import img3 from '../../assets/img/jpg/carouse3.jpg'
import img4 from '../../assets/img/jpg/carouse4.jpg'
import img5 from '../../assets/img/jpg/carouse5.jpg'
import img6 from '../../assets/img/jpg/carouse6.jpg'
import img8 from '../../assets/img/jpg/carouse8.jpg'
import img9 from '../../assets/img/jpg/carouse9.jpg'

//*AGREGANDO DIRECCIONAMIENTO PARA LOS BOTONES DEL CARUSEL-------------------------
//*AGREGANDO DIRECCIONAMIENTO PARA LOS BOTONES DEL CARUSEL-------------------------

// AGREGANDO CARUSEL -------------------------------
import CarouselStyle from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
// AGREGANDO CARUSEL -------------------------------


export default function Carousel() {


    return (
        // AGREGANDO CARUSEL -------------------------------
        <div >
           
            <CarouselStyle className='caroucel_main'>
                <CarouselStyle.Item interval={800}>
                    <div>
                    <div className="caroucel_main_car1">
                        <img
                            src={img1}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car2">
                        <img
                            src={img2}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car3">
                        <img
                            src={img3}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car4">
                        <img
                            src={img4}
                            alt="First slide"
                        />
                    </div>
                    </div>
                    <div>
                   
                    </div>
                </CarouselStyle.Item>
                <CarouselStyle.Item interval={800}>
                    <div>
                    <div className="caroucel_main_car1">
                        <img
                            src={img5}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car2">
                        <img
                            src={img6}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car3">
                        <img
                            src={img2}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car4">
                        <img
                            src={img8}
                            alt="First slide"
                        />
                    </div>
                    </div>
                  
                </CarouselStyle.Item>
                <CarouselStyle.Item interval={800}>
                    <div>
                    <div className="caroucel_main_car1">
                        <img
                            src={img9}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car2">
                        <img
                            src={img1}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car3">
                        <img
                            src={img2}
                            alt="First slide"
                        />
                    </div>
                    <div className="caroucel_main_car4">
                        <img
                            src={img3}
                            alt="First slide"
                        />
                    </div>
                    </div>
                   
                </CarouselStyle.Item>
               
            </CarouselStyle>
            
            {/*AGREGANDO DIRECCIONAMIENTO PARA LOS BOTONES DEL CARUSEL-------------------------*/}
         
            {/*AGREGANDO DIRECCIONAMIENTO PARA LOS BOTONES DEL CARUSEL-------------------------*/}
           
           
        </div>
       

        // AGREGANDO CARUSEL -------------------------------
    );
}
