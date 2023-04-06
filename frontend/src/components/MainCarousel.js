import React, {useEffect} from 'react'
import carousel1 from '../resources/carousel1.png';
import carousel2 from '../resources/carousel2.png';
import carousel3 from '../resources/carousel3.png';
import { Carousel, Image } from 'react-bootstrap'



function MainCarousel() {

    return (
        <Carousel pause='hover' className='bg-dark'>
            <Carousel.Item>
                <Image src= {carousel1} style={{height: '100%', width: '100%', objectFit: 'contain'}} />
            </Carousel.Item>
            <Carousel.Item>
                <Image src= {carousel2} style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
            </Carousel.Item>
            <Carousel.Item>
                <Image src= {carousel3} style={{height: '100%', width: '100%', objectFit: 'contain'}}/>
            </Carousel.Item>
        </Carousel>
    )
}

export default MainCarousel
