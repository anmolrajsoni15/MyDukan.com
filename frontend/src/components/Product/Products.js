import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from '../layout/Loader/Loader';
import ProductCard from "../Home/ProductCard";
import "./Products.css"
import { useParams } from 'react-router-dom';
import Pagination from "react-js-pagination";
import { useState } from 'react';
import {useAlert} from "react-alert";
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import MetaData from "../layout/MetaData";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "Headphones"
];

function Products({ match }) {

  const dispatch = useDispatch();
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1)
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState([0, 2500000]);
  const [ratings, setRatings] = useState(0);
  const [show, setShow] = useState(false);
  
  const { products, loading, error, productsCount, resultPerPage } = useSelector((state) => state.products)
  
  const { keyword } = useParams();
  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  }

  useEffect(() => {
    if(error){
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error]);

  return (
    <>
      {loading ? <Loader /> : (
      <>
        <MetaData title = "PRODUCTS - MyDukan.com"/>
        <h2 className='productsHeading'>Products</h2>
        <div className="products">
          {products && products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
        
        {
          show ? (
            <div className="filterBox">
          <Typography>Price</Typography>
          <Slider
            value={price}
            onChange={priceHandler}
            valueLabelDisplay="auto"
            size='small'
            aria-labelledby='range-slider'
            min={0}
            max={2500000}
          />
          <Typography>Categories</Typography>
          <ul className="categoryBox">
            {categories.map((category) => (
              <li
                className="category-link"
                key={category}
                onClick={() => setCategory(category)}
              >
                {category}
              </li>
            ))}
          </ul>

          <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                size="small"
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
        </div>
          ) : null
        }
        <div className="filtericon" onClick={()=>setShow(!show)}>
          <FilterAltIcon/>
          Apply Filters
        </div>
        {resultPerPage < productsCount &&
          (<div className="paginationBox">
            <Pagination
              activePage={currentPage}
              itemsCountPerPage={resultPerPage}
              totalItemsCount={productsCount}
              onChange={setCurrentPageNo}
              nextPageText="Next"
              prevPageText="Prev"
              firstPageText="1st"
              lastPageText="Last"
              itemClass='page-item'
              linkClass='page-link'
              activeClass='pageItemActive'
              activeLinkClass='pageLinkActive'
            />
          </div>)

        }
      </>)}
    </>
  )
}

export default Products