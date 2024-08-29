import { useEffect, useState } from "react"

const useOnlineStatus=()=>{
    const [onlineStatus, setOnlineStatus]=useState(true);

    useEffect(()=>{
        window.addEventListener("offline",()=>{
            setOnlineStatus(false);
        })

        window.addEventListener("online",()=>{
            setOnlineStatus(true);
        })

    },[]);
     return onlineStatus;
}

export default useOnlineStatus;


// This is a custom hook that returns the online status. window object provides the listeners for that. Using those listeners in our custom hook