import React, { useState, useEffect } from 'react'
import "./UpdatePassword.css"
import Loader from '../layout/Loader/Loader'
import MetaData from '../layout/MetaData';
import { useAlert } from 'react-alert';
import Visibility from "@mui/icons-material/Visibility"
import VisibilityOff from "@mui/icons-material/VisibilityOff"
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, updatePassword } from "../../actions/userAction";
import { useNavigate } from 'react-router-dom';
import { UPDATE_PASSWORD_RESET } from '../../constants/userConstants';
import LockOpenRounded from '@mui/icons-material/LockOpenRounded';
import Lock from "@mui/icons-material/Lock";
import VpnKey from "@mui/icons-material/VpnKey";

function UpdatePassword() {
    const dispatch = useDispatch();
    const alert = useAlert();
    const navigate = useNavigate();

    const { error, isUpdated, loading } = useSelector((state) => state.profile);

    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(<VisibilityOff/>);

    const showPassword = () => {
        if(type === 'password'){
          setIcon(<Visibility/>);
          setType('text');
        }
        else{
          setIcon(<VisibilityOff/>);
          setType('password');
        }
    }

    const updatePasswordSubmit = (e) => {
        // e.preventDefault();

        const myForm = new FormData();

        myForm.set("oldPassword", oldPassword);
        myForm.set("newPassword", newPassword);
        myForm.set("confirmPassword", confirmPassword);
        dispatch(updatePassword(myForm));
    };

    useEffect(() => {

        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Profile Updated Successfully");
            navigate("/account");

            dispatch({
                type: UPDATE_PASSWORD_RESET,
            })
        }
    }, [dispatch, error, alert, navigate, isUpdated])

    return (
        <>
            {loading ? <Loader /> : (
                <>
                    <MetaData title="Change Password" />
                    <div className="updatePasswordContainer">
                        <div className="updatePasswordBox">
                            <h2 className='updatePasswordHeading'>Update Password</h2>
                            <form
                                className="updatePasswordForm"
                                onSubmit={updatePasswordSubmit}
                            >

                                <div className="signUpPassword">
                                    <VpnKey />
                                    <input
                                        type={type}
                                        placeholder="Old Password"
                                        required
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                    />
                                    <span onClick={showPassword}>{icon}</span>
                                </div>

                                <div className="signUpPassword">
                                    <LockOpenRounded />
                                    <input
                                        type={type}
                                        placeholder="New Password"
                                        required
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                    />
                                    <span onClick={showPassword}>{icon}</span>
                                </div>

                                <div className="signUpPassword">
                                    <Lock />
                                    <input
                                        type={type}
                                        placeholder="Confirm Password"
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                    <span onClick={showPassword}>{icon}</span>
                                </div>

                                <input type="submit" value="Change" className="updatePasswordBtn" />
                            </form>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default UpdatePassword