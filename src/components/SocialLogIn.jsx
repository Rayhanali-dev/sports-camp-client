import React, { useContext } from 'react';
import { FaGoogle } from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { toast } from 'react-hot-toast';


function SocialLogIn() {
    const { user, googleSignIn } = useContext(AuthContext);
    const location = useLocation();
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || "/";
    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            const loggedInUser = result.user;
            const saveUser = { name: loggedInUser.displayName, email: loggedInUser.email, role: "student" , image: loggedInUser.photoURL}
            axios.post('http://localhost:5000/users', saveUser)
            .then(data => {
                toast.success('LoggedIn Successfully')
                navigate(from, { replace: true });
            })
        })
    }

    return (
        <div>
            <div className="divider">or</div>
            <div className="w-full text-center my-4">
                <button onClick={handleGoogleSignIn} className="btn btn-circle btn-outline border-green-500 hover:bg-green-800 hover:border-green-800">
                    <FaGoogle></FaGoogle>
                </button>
            </div>

        </div>
    )
}

export default SocialLogIn;