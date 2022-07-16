import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import "./Sidebar.css"
import logo from "../../images/logo.png"
import {TreeView, TreeItem} from "@material-ui/lab"
import ExpandMore from "@mui/icons-material/ExpandMore"
import PostAdd from "@mui/icons-material/PostAdd"
import Add from "@mui/icons-material/Add"
import ImportExport from "@mui/icons-material/ImportExport"
import ListAlt from "@mui/icons-material/ListAlt"
import Dashboard from "@mui/icons-material/Dashboard"
import People from "@mui/icons-material/People"
import RateReview from "@mui/icons-material/RateReview"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import {AnimatePresence, motion} from "framer-motion"

function Sidebar() {

    const [isOpen, setIsOpen] = useState(false);
    const [shift, setShift] = useState("collapse");

    const shifting ={
        collapses:{
            left: "57px",
        },
        expands:{
            left: "200px",
        },
    }

    const move = ()=>{
        if(shift === "expand"){
            setShift("collapse")
        }
        else{
            setShift("expand");
        }
        setIsOpen(!isOpen)
    }

  return (
    <motion.div animate={{
        width: isOpen?"200px":"57px", 
        transition: {
            duration: 0.6,
            type: 'inertia',
        }
    }} className='sidebar'>
        <motion.button animate={{
        left: isOpen?"200px":"57px", 
        transition: {
            duration: 0.6,
            type: 'inertia',
        }
    }} className={shift} onClick={move}>
            <ArrowForwardIosIcon />
        </motion.button>        
        <Link to="/">
            {isOpen && <img src={logo} alt="Ecommerce" />}
        </Link>
        <Link to="/admin/dashboard">
            <span>
                <Dashboard/> Dashboard
            </span>
        </Link>
        <Link to="#">
        <span>
            <TreeView
                defaultCollapseIcon={<ExpandMore/>}
                defaultExpandIcon={<ImportExport/>}
            >
                <TreeItem nodeId='1' label="Products">
                    <Link className='productLink' to="/admin/products">
                        <TreeItem nodeId='2' label="All" icon={<PostAdd/>}/>
                    </Link>

                    <Link className='productLink' to="/admin/product">
                        <TreeItem nodeId='3' label="Create" icon={<Add/>} />
                    </Link>
                </TreeItem>
            </TreeView>
        </span>
        </Link>
        <Link to= "/admin/orders">
            <span>
                <ListAlt/>  Orders
            </span>
        </Link>
        <Link to= "/admin/users">
            <span>
                <People/>  Users
            </span>
        </Link>
        <Link to= "/admin/reviews">
            <span>
                <RateReview/>  Reviews
            </span>
        </Link>
        

    </motion.div>
  )
}

export default Sidebar