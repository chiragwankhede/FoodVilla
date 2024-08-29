import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory=({data, showItems,setShowIndex})=>{
    console.log(data);

    //handleClick functionality now we trying to manage bu controlled component which is in RestaurantMenu.js
    //And in Restaurantcategory component 
    // const [showItems, setShowItems]=useState(false);
    const handleClick=()=>{
        setShowIndex();
    }
    return(
       <div>
        {/* Header of Accordion  */}
        <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
            <div className="flex justify-between cursor-pointer"
                onClick={handleClick}
            >
                <span className="font-bold text-lg">
                  {data.title} ({data.itemCards.length})
                </span>
                <span>⬇</span>
            </div>

            {showItems && <ItemList items={data.itemCards}/>}
        </div>
       
       
       </div>
    )
}

export default RestaurantCategory;