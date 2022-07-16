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
import { Link, useNavigate } from 'react-router-dom';
import { deleteOrder, getAllOrders, clearErrors } from '../../actions/orderAction';
import { DELETE_ORDERS_RESET } from '../../constants/orderConstants';

function OrderList() {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const alert = useAlert();

    const { error, orders } = useSelector((state) => state.allOrders);
    const { error: deleteError, isDeleted } = useSelector((state) => state.order);

    const deleteOrderHandler = (id) => {
        dispatch(deleteOrder(id));
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
            alert.success("Order Deleted Successfully");
            navigate("/admin/orders");
            dispatch({type: DELETE_ORDERS_RESET});
        }
        dispatch(getAllOrders());
    }, [dispatch, alert, error, deleteError, navigate, isDeleted]);

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 270,
            flex: 1,
        },
        {
            field: "status",
            headerName: "Status",
            minWidth: 150,
            flex: 0.5,
            cellClassName: (params) => {
                return params.getValue(params.id, "status") === "Delivered"
                ? "greenColor" : "redColor";
            }
        },
        {
            field: "itemsQty",
            headerName: "Items Qty",
            type: "number",
            minWidth: 150,
            flex: 0.3,
        },
        {
            field: "amount",
            headerName: "Amount",
            type: "number",
            minWidth: 200,
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
                        <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                            <Edit />
                        </Link>

                        <Button
                            onClick={() =>
                                deleteOrderHandler(params.getValue(params.id, "id"))
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

    orders &&
    orders.forEach((item) => {
            rows.push({
                id: item._id,
                itemsQty: item.orderItems.length,
                amount: item.totalPrice,
                status: item.orderStatus,
            });
        });

    return (
        <>
            <MetaData title={`All ORDERS - ADMIN`} />
            <div className="dashboard">
                <Sidebar />
                <div className="productListContainer">
                    <h1 id='productListHeading'>ALL ORDERS</h1>
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

export default OrderList