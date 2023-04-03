import React from 'react'
import Carousel from "react-bootstrap/Carousel";
import "./HomeCarousel.css"

const HomeCarousel = () => {
  return (
    <div className="carou  bg-dark ">
      <Carousel>
        <Carousel.Item interval={4000}>
            <div>
              <img
                className="d-block w-75 h-50 imgs mx-auto " 
                src="https://pbs.twimg.com/profile_images/1098828723871088640/88Kjvp6w_400x400.png"
                alt="First slide"
              />
            </div>
          <div>
          </div>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-75 imgs mx-auto"
            src="https://pbs.twimg.com/media/CcAwVRDUMAAESx_.jpg:large"
            alt="Second slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item interval={4000}>
          <img
            className="d-block w-75 imgs mx-auto"
            src="https://pbs.twimg.com/media/D7qW6VZXYAA4Abp.jpg"
            alt="Third slide"
          />
          <Carousel.Caption>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  )
}

export default HomeCarousel