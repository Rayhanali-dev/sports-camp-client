import React from 'react';
import fourOfourImg from '../../assets/images/fourOfour/fourOfour.png';
import fourOfourBgImg from '../../assets/images/fourOfour/fourOfour-bg.jpg';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';

function FourOFour() {
    return (
        <>
            <Helmet>
                <title>404 | Sports Camp</title>
            </Helmet>
            <div className="hero min-h-screen bg-base-200" style={{ backgroundImage: `url(${fourOfourBgImg})` }}>
                <div className="hero-overlay bg-opacity-60"></div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-xl bg-base-100">
                    <div className="card-body">
                        <div className='text-center'>
                            <img src={fourOfourImg} className='w-full' />
                            <h3 className='text-5xl font-bold p-4'>404,Sorry!</h3>
                            <p>We Can't Find That page. It might be an old link or maybe it moved</p>
                        </div>
                        <div className="form-control mt-6">
                            <button className="btn bg-green-500 hover:bg-green-800 text-white"><Link to="/">Go Home</Link></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default FourOFour;