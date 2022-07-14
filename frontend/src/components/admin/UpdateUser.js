import React from 'react'
import "./NewProduct.css"
import Mail from '@mui/icons-material/Mail'
import Person from '@mui/icons-material/Person'
import VerifiedUser from '@mui/icons-material/VerifiedUser'
import MetaData from '../layout/MetaData';
import Sidebar from './Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAlert } from 'react-alert';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { UPDATE_USER_RESET } from '../../constants/userConstants';
import { getUserDetails, updateUser, clearErrors } from '../../actions/userAction';
import Loader from '../layout/Loader/Loader'


function UpdateUser() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const alert = useAlert();
    const { id } = useParams();

    const { loading, error, user } = useSelector((state) => state.userDetails);
    const { loading: updateLoading, error: updateError, isUpdated } = useSelector((state) => state.profile);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("");

    const userId = id;

    useEffect(() => {
        if (user && user._id !== userId) {
            dispatch(getUserDetails(userId));
        }
        else {
            setName(user.name);
            setEmail(user.email);
            setRole(user.role);
        }
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("User Role Updated Successfully");
            navigate("/admin/users");
            dispatch({ type: UPDATE_USER_RESET });
        }
    }, [dispatch, alert, error, navigate, isUpdated, updateError, user, userId]);

    const updateUserSubmitHandler = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("role", role);

        dispatch(updateUser(userId, myForm));
    };

    return (
        <>
            <MetaData title="Update User Role" />
            <div className="dashboard">
                <Sidebar />
                <div className="newProductContainer">
                    {loading ? <Loader /> : (
                        <form
                            className="createProductForm"
                            onSubmit={updateUserSubmitHandler}
                        >
                            <h1>Update User Role</h1>

                            <div>
                                <Person />
                                <input
                                    type="text"
                                    placeholder="Name"
                                    required
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div>
                                <Mail />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

                            <div>
                                <VerifiedUser />
                                <select value={role} onChange={(e) => setRole(e.target.value)}>
                                    <option value="">Select Role</option>
                                    <option value="admin">Admin</option>
                                    <option value="user">User</option>
                                </select>
                            </div>

                            <Button
                                id="createProductBtn"
                                type="submit"
                                disabled={updateLoading ? true : false || role === "" ? true : false}
                            >
                                Update
                            </Button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default UpdateUser