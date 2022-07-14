import React from 'react'
import { DataGrid } from "@mui/x-data-grid"
import "./ProductList.css"
import { Button } from "@mui/material"
import Edit from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useEffect } from 'react';
import { clearErrors, deleteProduct, getAdminProduct } from '../../actions/productAction';
import { Link, useNavigate } from 'react-router-dom';
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';


function ProductList() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();

    const { error, products } = useSelector((state) => state.products);
    const { error: deleteError, isDeleted } = useSelector((state) => state.product);

    const deleteProductHandler = (id) => {
        dispatch(deleteProduct(id));
    }

    useEffect(()=>{
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        if(deleteError){
            alert.error(deleteError);
            dispatch(clearErrors());
        }
        if(isDeleted){
            alert.success("Product Deleted Successfully");
            navigate("/admin/products");
            dispatch({type: DELETE_PRODUCT_RESET});
        }
        dispatch(getAdminProduct());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        { field: "id", headerName: "Product ID", minWidth: 200, flex: 0.5 },

        {
            field: "name",
            headerName: "Name",
            minWidth: 350,
            flex: 1,
        },
        {
            field: "stock",
            headerName: "Stock",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },

        {
            field: "price",
            headerName: "Price",
            type: "number",
            minWidth: 270,
            flex: 0.5,
        },

        {
            field: "actions",
            flex: 0.3,
            headerName: "Actions",
            minWidth: 150,
            type: "number",
            sortable: false,
            renderCell: (params) => {
                return (
                    <>
                        <Link to={`/admin/product/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteProductHandler(params.getValue(params.id, "id"))
                            }
                        >
                            <Delete />
                        </Button>
                    </>
                );
            },
        },
    ];

    const rows = [];

    products &&
        products.forEach((item) => {
            rows.push({
                id: item._id,
                stock: item.Stock,
                price: item.price,
                name: item.name,
            });
        });

    return (
        <>
            <MetaData title={`All PRODUCTS - ADMIN`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id='productListHeading'>ALL PRODUCTS</h1>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        pageSize={10}
                        disableSelectionOnClick
                        className="productListTable"
                        autoHeight
                    />
                </div>
            </div>
        </>
    )
}

export default ProductList