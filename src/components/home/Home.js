import React from 'react'
import HomeCarousel from '../carousel/HomeCarousel'

const Home = () => {
  return (
    <div>
      <h1 className='text-center display-3 fw-bold' style={{color: "#6C63FF"}}>Project Pulse</h1>
      <hr></hr>
      <div className='ms-3'>
      <h2 className='mb-3 fs-1'>Description</h2>
      <p className=''>This product will serve as tracking tool for projects and portfolio for each GDO and overall
      organisation.</p>
      </div>
      <div className='row mb-5 mt-3' style={{height:"50%"}}>
      <div className='col'>
      <HomeCarousel />
    </div>
    </div>
    </div>
  )
}

export default Home