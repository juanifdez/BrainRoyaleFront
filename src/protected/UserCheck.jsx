import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

import axios from 'axios';

function UserCheck(){
    const {token} = useContext(AuthContext);
    const [msg, setMsg] = useState("");

    const config = {
        'method': 'get',
        'url': `${import.meta.env.REACT_APP_SERVER_URL }/protecteduser`,
        'headers': {
            'Authorization': `Bearer ${token}`
        }
    }

    useEffect(() => {
        axios(config)
        .then((response) => {
            console.log("Valid token");
            console.log(response);
            setMsg(response.data.message);
        })
        .catch((error) => {
            console.log("Error con token");
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