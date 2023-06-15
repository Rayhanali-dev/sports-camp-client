import React from 'react'
import { Helmet } from 'react-helmet-async';
import Banner from './Banner';
import Pclasses from './Pclasses';
import PIntructors from './PIntructors';
import FAQ from './FAQ';
import { Slide, Fade } from 'react-awesome-reveal';


function Home() {
  return (
    <>
      <Helmet>
        <title>Home | Sports Camp</title>
      </Helmet>
      <Fade>
        <Banner />
      </Fade>
      <Slide>
        <Pclasses />
      </Slide>
      <PIntructors />
      <FAQ />
    </>
  )
}

export default Home;