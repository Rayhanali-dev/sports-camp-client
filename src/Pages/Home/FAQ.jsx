import React, { useState } from 'react';

const FAQ = () => {
    return (
        <div>
            <div className='max-w-7xl mx-auto'>
                <div className="collapse collapse-arrow mb-7 bg-teal-600">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        Why Sports Camp is best?
                    </div>
                    <div className="collapse-content">
                        <p>Our instructor are athletic, they know hidden secret to win.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow mb-7 bg-teal-600">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        What is our refund policy?
                    </div>
                    <div className="collapse-content">
                        <p>Our refund policy is very easy.  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Hic fugit eaque deleniti, aut nulla aliquam.</p>
                    </div>
                </div>
                <div className="collapse collapse-arrow mb-7 bg-teal-600">
                    <input type="checkbox" />
                    <div className="collapse-title text-xl font-medium">
                        What is our payment system?
                    </div>
                    <div className="collapse-content">
                        <p>We accept any type of payment method like visa, mastercard, mobile banking etc. sit amet consectetur adipisicing elit.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FAQ;