import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { Carousel, Image } from 'react-bootstrap'
import Notification from '../components/Notification';
import Loader from '../components/Loader';
import { getTopProducts } from '../actions/productActions'
import '../index.css';


function ProductCarousel() {
    const dispatch = useDispatch()

    const productLatest = useSelector(state => state.productTop)
    const {error, loading, products} = productLatest
    useEffect(() =>{
        dispatch(getTopProducts())
    }, [dispatch])
    console.log(products)

    return (loading ? <Loader />
        : error
            ? <Notification variant='danger'>{error}</Notification>
            : (
        <Carousel pause='hover' className='bg-dark my-carousel'>
                {products && products.map(product => (
                    <Carousel.Item key={product._id}>
                        <Link to={`/product/${product._id}`}>
                            <Image src={product.image} alt={product.name} fluid />
                            <Carousel.Caption className='carousel.caption'>
                                <h4>{product.name} (${product.price})</h4>
                            </Carousel.Caption>
                        </Link>
                    </Carousel.Item>
                ))}
            </Carousel>
            )

    )
}

export default ProductCarousel
