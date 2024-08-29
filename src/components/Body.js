import RestaurantCard ,{withTopRatedLabel} from "./RestaurantCard";
// import resList from "../utils/mockData";
import { useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";


const Body =()=>{
    let [listOfRestaurants, setListOfRestaurants]=useState([]);
    const [filteredRestaurants, setFilteredRestaurants]=useState([]);
    const [searchText, setSearchText]=useState("");
    const [rated, setRated]=useState(false);

    const RestaurantCardTopRated=withTopRatedLabel(RestaurantCard)

    console.log("Body Rendered...", listOfRestaurants);
    
    useEffect(()=>{
        fetchData();
        console.log("useEffect is called...");
    },[]);

    const fetchData=async()=>{
        const data= await fetch(
            "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
        );
        const json=await data.json();
        console.log(json);
        setListOfRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurants(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        console.log("listOfRestaurants:", listOfRestaurants);
        console.log("FilteredRestaurants:", filteredRestaurants);
    }

    const onlineStatus=useOnlineStatus();
    if(onlineStatus===false)
        <h1>Looks like you're offline!!! Please check your internet connection</h1>
    // if(listOfRestaurants){}

    
    //Conditional rendering
    // if(listOfRestaurants.length===0){
    //     return 
    // }
    
    // OR conditional rendering by using ternary operator

    //We can also receive function from a context. Receiving setUserName function that will set the username directly from input box
    const {setUserName}=useContext(UserContext);
    const {loggedInUser}=useContext(UserContext);


    return listOfRestaurants.length===0 ?<Shimmer /> :  (
        <div className="body">
            <div className="filter flex">
                <div className="search m-4 p-4">
                    <input type="text" className="search-box border border-solid border-black"
                     value={searchText} 
                     onChange={(e)=>{
                        setSearchText(e.target.value)
                     }}/>
                    <button className="px-4 py-2 bg-green-100 m-4 rounded-lg"
                     onClick={()=>{
                        //Filter restaurant cards according to the search & update the UI
                        console.log(searchText);
                        const filteredRestaurants=listOfRestaurants.filter(
                            (res)=>res.info.name.toLowerCase().includes(searchText.toLowerCase())
                        )
                        setFilteredRestaurants(filteredRestaurants);
                    }}
                    >Search</button>
                </div>
                
                <div className="search m-6 p-6 flex item-centre">
                    

                    <button className="px-4 py-2 bg-gray-100 rounded-lg"
                    onClick={()=>{
                        const filteredList=listOfRestaurants.filter(
                            (res) =>res.info.avgRating>4.5
                        );
                        // setListOfRestaurants(filteredList);
                        setFilteredRestaurants(filteredList);
                        console.log("Button is Clicked...");
                        console.log(filteredList);
                    }} >
                    Top Rated Restaurants</button> 
                    {/* When the button is clicked, it filters a list of restaurants (listOfRestaurants) to include only those with an average rating (avgRating) greater than 4.
                    The filtered list is then set as the new state for the restaurants. */}

                    
                </div>

                <div className="search m-6 p-6 flex item-centre">
                    <label>Username:  </label>
                    <input className="border border-black rounded-md mx-2 p-2"
                    value={loggedInUser}
                     onChange={(e)=>setUserName(e.target.value)}></input>

                </div>

                
            </div>
            <div className="res-container flex flex-wrap justify-center border gap-2">
                {filteredRestaurants.map((restaurant)=>(
                    <Link
                     key={restaurant.info.id}
                     to={'/restaurants/' + restaurant.info.id}
                    >
                        <RestaurantCard resData={restaurant}/>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default Body;



// {restaurant.info.avgRating>4.5}?(
//     <RestaurantCardTopRated resData={restaurant} />
// ):(
//     <RestaurantCard  resData={restaurant} />
// )} 