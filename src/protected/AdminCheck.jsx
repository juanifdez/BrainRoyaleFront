import { useState, useEffect, useContext } from "react";
import { AuthContext } from '../auth/AuthContext';
import axios from 'axios';

function AdminCheck(){
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    const config = {
        'method': 'get',
        'url': `${import.meta.env.VITE_BACKEND_URL}/protectedadmin`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios(config)
        .then((response) => {
            console.log("Valid admin token");
            console.log(response);
            setMsg(response.data.message);
        })
        .catch((error) => {
            console.log("Error con admin token");
            console.log(error);
            setMsg(error.message);
        });
    }, []);

    return (
        <div>
            <h1>{msg}</h1>
        </div>
    );
} 


export default UserCheck;