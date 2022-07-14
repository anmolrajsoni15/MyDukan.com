import React from 'react'
import "./NewProduct.css"
import AccountTree from "@mui/icons-material/AccountTree";
import Description from '@mui/icons-material/Description'
import Storage from '@mui/icons-material/Storage'
import Spellcheck from '@mui/icons-material/Spellcheck'
import AttachMoney from '@mui/icons-material/AttachMoney'
import Sidebar from './Sidebar';
import MetaData from '../layout/MetaData';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { useEffect } from 'react';
import { clearErrors, updateProduct, getProductDetails } from '../../actions/productAction';
import { UPDATE_PRODUCT_RESET } from '../../constants/productConstants';
import { Button } from '@mui/material';


function UpdateProduct() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const {id} = useParams();

    const {error, product} = useSelector((state) => state.productDetails);
    const {loading, error: updateError, isUpdated} = useSelector((state) => state.product);

    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [Stock, setStock] = useState(0);
    const [images, setImages] = useState([]);
    const [oldImages, setOldImages] = useState([]);
    const [imagesPreview, setImagesPreview] = useState([]);

    const categories = [
        "Laptop",
        "Footwear",
        "Bottom",
        "Tops",
        "Attire",
        "Camera",
        "SmartPhones",
    ];

    const productId = id;

    useEffect(()=>{
        if(product && product._id !== productId){
            dispatch(getProductDetails(productId));
        }
        else{
            setName(product.name);
            setDescription(product.description);
            setPrice(product.price);
            setCategory(product.category);
            setStock(product.Stock);
            setOldImages(product.images);
        }
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(updateError){
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if(isUpdated){
            alert.success("Product Updated Successfully");
            navigate("/admin/products");
            dispatch({type: UPDATE_PRODUCT_RESET});    
        }
    },[dispatch, alert, error, updateError, isUpdated, navigate, productId, product]);

    const updateProductSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("price", price);
        myForm.set("description", description);
        myForm.set("category", category);
        myForm.set("Stock", Stock);  
        
        images.forEach((image) => {
            myForm.append("images", image);
        });
        dispatch(updateProduct(productId, myForm));
    };

    const updateProductImagesChange = (e) => {
        const files = Array.from(e.target.files);
    
        setImages([]);
        setImagesPreview([]);
        setOldImages([]);
    
        files.forEach((file) => {
            const reader = new FileReader();
            
            reader.onload = () => {
              if (reader.readyState === 2) {
                setImagesPreview((old) => [...old, reader.result]);
                setImages((old) => [...old, reader.result]);
              }
            };
          
            reader.readAsDataURL(file);
        });
    };

    return (
        <>
            <MetaData title="Update Product" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    <form
                        className="createProductForm"
                        encType="multipart/form-data"
                        onSubmit={updateProductSubmitHandler}
                    >
                        <h1>Update Product</h1>

                        <div>
                            <Spellcheck />
                            <input
                                type="text"
                                placeholder="Product Name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <AttachMoney />
                            <input
                                type="number"
                                placeholder="Price"
                                required
                                onChange={(e) => setPrice(e.target.value)}
                                value={price}
                            />
                        </div>

                        <div>
                            <Description />

                            <textarea
                                placeholder="Product Description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                cols="30"
                                rows="1"
                            ></textarea>
                        </div>

                        <div>
                            <AccountTree />
                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                <option value="">Choose Category</option>
                                {categories.map((cate) => (
                                    <option key={cate} value={cate}>
                                        {cate}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <Storage />
                            <input
                                type="number"
                                placeholder="Stock"
                                required
                                onChange={(e) => setStock(e.target.value)}
                                value={Stock}
                            />
                        </div>

                        <div id="createProductFormFile">
                            <input
                                type="file"
                                name="avatar"
                                accept="image/*"
                                onChange={updateProductImagesChange}
                                multiple
                            />
                        </div>

                        <div id="createProductFormImage">
                            {oldImages && oldImages.map((image, index) => (
                                <img key={index} src={image.url} alt="Old Product Preview" />
                            ))}
                        </div>

                        <div id="createProductFormImage">
                            {imagesPreview.map((image, index) => (
                                <img key={index} src={image} alt="Product Preview" />
                            ))}
                        </div>

                        <Button
                            id="createProductBtn"
                            type="submit"
                            disabled={loading ? true : false}
                        >
                            Update
                        </Button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateProduct