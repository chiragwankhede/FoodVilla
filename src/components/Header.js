import { useContext, useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";


const Header=()=>{

    const onlineStatus=useOnlineStatus();
    const [btnName, setBtnName]=useState("Login")

    const data=useContext(UserContext);
    const {loggedInUser}=data;

    //Subscribing to the store using selector
    const cartItems=useSelector((store)=>store.cart.items) //subscribing to the store's item
    console.log(cartItems);

    // const btnHandler=()=>{
    //     if(btnName==="Login"){
    //         setBtnName("Logout")
    //     }
    //     else if(btnName==="Logout"){
    //         setBtnName("Login")
    //     }
    // }

    return(
        <div className="flex justify-between bg-pink-100 shadow-lg ">
            <div className="logo-container">
                <img className="w-56" src={LOGO_URL} />
            </div>
            
            <div className="flex items-center">
                <ul className="flex p-4 m-4 ">
                    <li className="px-4">
                        Online Status :{onlineStatus ? `🟢`: `🔴`}
                    </li>
                    <li className="px-4">
                        <Link to="/">Home</Link>
                    </li>
                    <li className="px-4">
                        <Link to="/about">About Us</Link>    
                    </li>
                    <li className="px-4">
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li className="px-4 font-bold text-xl">
                        <Link to='/cart' >Cart - ({cartItems.length} Items)</Link>
                    </li>
                    <button className="login font-bold"
                    onClick={()=>{
                        btnName==="Login"?setBtnName("Logout"):setBtnName("Login");
                    }
                        
                        
                    }
                    >{loggedInUser}</button>
                    
                </ul>
            </div>

        </div>
    )
}

export default Header;