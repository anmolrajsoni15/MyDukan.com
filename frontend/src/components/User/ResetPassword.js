import React, { useState, useEffect } from 'react'
import "./ResetPassword.css"
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';
import Lock from "@mui/icons-material/Lock";


function ResetPassword({match}) {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();
    const {token} = useParams;

    const { error, success, loading } = useSelector((state) => state.forgotPassword);

    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const resetPasswordSubmit = (e) => {
        e.preventDefault();

        const myForm = new FormData();

        myForm.set("password", password);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(resetPassword(token, myForm));
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (success) {
            alert.success("Password Updated Successfully");
            navigate("/login");
        }
    }, [dispatch, error, alert, navigate, success])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Reset Password" />
                    <div className="resetPasswordContainer">
                        <div className="resetPasswordBox">
                            <h2 className='resetPasswordHeading'>Reset Password</h2>
                            <form
                                className="resetPasswordForm"
                                onSubmit={resetPasswordSubmit}
                            >
                                <div>
                                    <LockOpenRounded />
                                    <input
                                        type="password"
                                        placeholder="New Password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>

                                <div className="signUpPassword">
                                    <Lock />
                                    <input
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>

                                <input type="submit" value="Update" className="resetPasswordBtn" />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ResetPassword