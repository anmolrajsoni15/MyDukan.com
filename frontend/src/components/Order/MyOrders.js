import React from 'react'
import "./MyOrders.css"
import { DataGrid } from '@mui/x-data-grid';
import Launch from "@mui/icons-material/Launch"
import MetaData from '../layout/MetaData';
import Loader from '../layout/Loader/Loader';
import { Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { useEffect } from 'react';
import { clearErrors, myOrders } from '../../actions/orderAction';
import { Link } from 'react-router-dom';

function MyOrders() {

    const dispatch = useDispatch();
    const alert = useAlert();
    
    const {loading, error, orders} = useSelector((state) => state.myOrders);
    const {user} = useSelector((state) => state.user);

    const columns = [
        {
            field: "id",
            headerName: "Order ID",
            minWidth: 300,
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
            minWidth: 270,
            flex: 0.5,
        },
        {
            field: "actions",
            headerName: "Actions",
            type: "number",
            minWidth: 150, 
            flex: 0.3,
            sortable: false,
            renderCell: (params) => {
                return (
                    <Link to={`/order/${params.getValue(params.id, "id")}`}>
                        <Launch/>
                    </Link>
                )
            }
        },
    ];
    const rows = [];

    orders && orders.forEach((item, index) => {
        rows.push({
            itemsQty: item.orderItems.length,
            id: item._id,
            status: item.orderStatus,
            amount: item.totalPrice,
        });
    })

    useEffect(() => {
      if(error){
        alert.error(error);
        dispatch(clearErrors);
      }
      dispatch(myOrders());
    }, [dispatch, alert, error]);
    

  return (
    <>
        <MetaData title ={`${user.name} - Orders`}/>

        {loading ? (<Loader/>) : (
            <div className="myOrdersPage">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    pageSize={10}
                    disableSelectionOnClick
                    className='myOrdersTable'
                    autoHeight
                />
                <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
            </div>
        )}
    </>
  )
}

export default MyOrders