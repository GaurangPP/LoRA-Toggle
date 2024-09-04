import React, { useEffect } from 'react'
import './Account.css';
import axios from 'axios';
import { useState } from 'react';
import { Button } from './Button';

const Account = ({setUser}: {setUser: React.Dispatch<React.SetStateAction<any>>}) => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");

    const checkSession = async () => {
        try{
            const response = await axios.get('http://127.0.0.1:5000/info', {
                withCredentials: true,
            });

            console.log("A user is logged in");
            setUsername(response.data.username);
            setEmail(response.data.email);
        }
        catch(error:any) {
            console.log("No user is logged in");
            console.log(error.response.data.error);
            //Send user to login page if no user is signed in
            window.location.href = "/login";
        }
    }

    const handleLogout = async () => {
        try{
            const response = await axios.post('http://127.0.0.1:5000/logout', {}, {
                withCredentials: true,
            });
            setUser(null);
            console.log(response.data.message)
        }
        catch(error:any){
            console.log("No user was signed in to logout")
        }
    }

    //Check at the beginning of the component loading
    useEffect(() => {
        checkSession();
    },[]);

    return (
        <div className="container">
            <div className="card">
                <h2 className="heading">Account Details</h2>
                <p className="info"><strong>Username:</strong> {username}</p>
                <p className="info"><strong>Email:</strong> {email}</p>
                <Button buttonStyle="btn--outline" to='/' onClick={handleLogout}>
                    LOG OUT
                </Button>
            </div>
        </div>
    )

}

export default Account;
