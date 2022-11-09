import React, { useEffect, useState } from "react";
import axios from "axios";

export default function getUserIp(){
    
    let ip = '';
    const [userIp, setUserIp] = useState(null);
    axios.get("https://api.ipify.org/?format=json")
        .then((res) => {
            setUserIp(res.data.ip);
        })
        .catch((error) => {
            console.error(error);
        })
    
    useEffect(() => {
        ip += userIp;
    }, [userIp]);


    return ip;
}