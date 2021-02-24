import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import getparams from './../../../../utils/getparams';
import {getproductPage} from '../../../../actions/product.action'
import Card from './../../../../components/Header/UI/Card';
import { Helmet } from 'react-helmet';
/**
* @author
* @function ProductPage
**/
const ProductPage = (props) => {

    const dispatch = useDispatch();
    const product = useSelector(state => state.product);
    const { page } = product;

    useEffect(() => {
        const params = getparams(props.location.search);
       console.log(params)
        const payload = {
            params
        }
        dispatch(getproductPage(payload));
    }, []);


    return (
        <div style={{ margin: '0 10px' }}>
            <Helmet>
        <title> reclam page </title>
             </Helmet> 
            <h3>{page.title}</h3>
            <Carousel
                autoPlay
                interval="2500"
                transitionTime="800"
                infiniteLoop
                showThumbs
                stopOnHover
            >
                {
                    page.banners && page.banners.map((banner, index) => 
                        <div 
                            key={index}
                            style={{ display: 'block' }}
                            
                        >
                            <img src={banner.img} alt="" />
                        </div>
                    )
                }
            </Carousel>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '10px 0'
            }}>
                {
                    page.products && page.products.map((product, index) => 
                        <Card 
                            key={index}
                            style={{
                                width: '400px',
                                maxHeight: '200px',
                                margin: '5px',
                                overflow:"hidden"
                            }}
                        >
                            <img style={{
                                maxWidth: '100%',
                               
                                objectFit:"contain"
                            }} src={product.img} alt="" />
                        </Card>
                    )
                }
            </div>
        </div>
    )

}

export default ProductPage