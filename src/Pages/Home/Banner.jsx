import React from 'react';
import 'swiper/swiper.min.css';
import img1 from '../../assets/images/slider/slider1.jpg'
import img2 from '../../assets/images/slider/slider4.jpg'


function Banner() {
    return (
        <div className="carousel w-full">
            <div id="slide1" className="carousel-item relative w-full min-h-[60vh] ">
                <div className="hero" style={{ backgroundImage: `url(${img2})` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Hello Learner</h1>
                            <p className="mb-5 text-3xl">We provide Learning course for summer vacation.</p>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide4" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❮</a>
                    <a href="#slide2" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❯</a>
                </div>
            </div>
            <div id="slide2" className="carousel-item relative w-full max-h-[60vh] ">
                <div className="hero" style={{ backgroundImage: `url(${img1})` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Enroll Today</h1>
                            <p className="mb-5 text-3xl">We provide Learning course for summer vacation.</p>
                           
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide1" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❮</a>
                    <a href="#slide3" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❯</a>
                </div>
            </div>
            <div id="slide3" className="carousel-item relative w-full max-h-[60vh] ">
                <div className="hero" style={{ backgroundImage: `url(${img2})` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">It's a time for you</h1>
                            <p className="mb-5 text-3xl">We provide Learning course for summer vacation.</p>
                            
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide2" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❮</a>
                    <a href="#slide4" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❯</a>
                </div>
            </div>
            <div id="slide4" className="carousel-item relative w-full max-h-[60vh] ">
                <div className="hero" style={{ backgroundImage: `url(${img1})` }}>
                    <div className="hero-overlay bg-opacity-60"></div>
                    <div className="hero-content text-center text-neutral-content">
                        <div className="max-w-md">
                            <h1 className="text-5xl font-bold">Start Learning, Start Exploring</h1>
                            <p className="mb-5 text-3xl">We provide Learning course for summer vacation.</p>
                            <button className="btn bg-green-500 text-white hover:bg-green-800 ">Get Started</button>
                        </div>
                    </div>
                </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                    <a href="#slide3" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❮</a>
                    <a href="#slide1" className="btn btn-circle bg-green-500 text-white hover:bg-green-800">❯</a>
                </div>
            </div>
        </div>
    )
}

export default Banner