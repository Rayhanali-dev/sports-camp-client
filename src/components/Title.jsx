import React from 'react'

function Title({heading, subHeading}) {
  return (
    <div>
        <h2 className="text-3xl text-center font-semibold">{heading}</h2>
        <p className='text-xl text-center'>{subHeading}</p>
    </div>
  )
}

export default Title