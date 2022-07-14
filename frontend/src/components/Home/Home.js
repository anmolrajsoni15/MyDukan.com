import React, { useEffect } from 'react';
import "./Home.css";
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData';
import { clearErrors, getProduct } from '../../actions/productAction';
import { useSelector, useDispatch } from 'react-redux';
import Loader from '../layout/Loader/Loader';
import { useAlert } from 'react-alert';


function Home() {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products)

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);

    
    return (
        <>
            {loading ? (<Loader/>) : (
                <>
                    <MetaData title="MyDukan.com" />
                    <div className="banner">
                        <p>Welcome to MyDukan.com</p>
                        <h1>FIND AMAZING PRODUCTS BELOW</h1>
                        <a href="#container">
                            <button>
                                Scroll
                            </button>
                        </a>
                    </div>
                    <h2 className="homeHeading" id="container">Featured Product</h2>
                    <div className="container">
                        {products && products.map(product => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                </>
            )}
        </>
    )
}

export default Home