import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import banner1 from '../../../assets/banner1.jpg';
import banner2 from '../../../assets/banner2.jpg';
import banner3 from '../../../assets/banner3.jpg';

const Banner = () => {
    return (
        <Carousel className='text-center mx-auto'>
            <div>
                <img  src={banner1} />
            </div>
            <div>
                <img src={banner2} />
            </div>
            <div>
                <img src={banner3} />
            </div>
        </Carousel>
    );
};

export default Banner;