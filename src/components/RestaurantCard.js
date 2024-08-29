import { CDN_URL } from "../utils/constants";

const RestaurantCard =(props)=>{
    const {resData}=props;
    const {cloudinaryImageId, 
      name,
      cuisines,
      avgRating,
      costForTwo,
      sla}=resData?.info;
  
  
      return(
          <div className="res-card m-4 p-4 w-[240px] rounded-lg bg-gray-100 hover:bg-gray-200" >
              <img className="res-logo rounded-lg"
               alt="res-logo" 
               src={CDN_URL + resData.info.cloudinaryImageId }
               />
              <h3 className="font-bold py-3 text-lg">{name}</h3>
              <h4>{cuisines.join(", ")}</h4>
              <h4>{avgRating} stars</h4>
              <h4>{costForTwo}</h4>  
              <h4>{sla.deliveryTime} mins</h4>          
          </div>
      );
  }

  export const withTopRatedLabel=(RestaurantCard)=>{
    return(props)=>{
        return(
            <div>
                <label className="absolute bg-black text-white m-2 p-2 rounded-md">Top Rated</label>
                <RestaurantCard {...props}/>
            </div>
        )
    }
}

  export default RestaurantCard;