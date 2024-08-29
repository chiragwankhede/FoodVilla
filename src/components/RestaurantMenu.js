import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu=()=>{
    const {resId}=useParams();
    const resInfo = useRestaurantMenu(resId);
    // const params=useParams();
    // console.log(params);

    const [showIndex, setShowIndex]=useState(null);
    


    if(resInfo===null) return <Shimmer />
    const {name, cuisines, costForTwoMessage}=resInfo?.cards[0]?.card?.card?.info;
    const {itemCards}= resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards[1]?.card?.card;
    // console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);

    // console.log("Displaying itemCards");
    // console.log(itemCards);

    const categories = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (c)=>
        c.card?.["card"]?.["@type"]===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
    console.log(categories);

    return (
        <div className="text-center">
            <h1 className="font-bold my-6 text-2xl">{name}</h1>
            <p className="font-bold">
                {cuisines.join(", ")} - {costForTwoMessage}
            </p>
            {/* Categories Accordions, each accordion has a header and a title*/}
            {categories.map((category, index)=>(
                <RestaurantCategory 
                    key={category?.card?.card?.title} 
                    data={category?.card?.card}
                    showItems={index===showIndex?true:false}
                    setShowIndex={()=>setShowIndex(index)}/>
            ))}
        </div>
    )
    
}

export default RestaurantMenu;



// RestaurantMenu.js
// Initialization:

// The RestaurantMenu component is initially rendered.
// The showIndex state is initialized with null using useState, indicating that initially, no category should be displayed.
// Fetching Restaurant Information:

// The useParams hook extracts the resId parameter from the URL.
// The useRestaurantMenu hook is used to fetch information about the restaurant using the resId.
// Conditional Rendering:

// If resInfo is null, indicating that the restaurant information is still being fetched, a Shimmer component is rendered to show a loading state.
// Rendering Restaurant Information and Categories:

// Once the restaurant information (resInfo) is available, the restaurant name, cuisines, and cost for two are extracted.
// Categories are filtered from the resInfo data.
// Mapping Through Categories:

// The component maps through the categories, rendering a RestaurantCategory component for each category.
// The showIndex state is passed down as a prop to each RestaurantCategory component.
// RestaurantCategory.js
// Initialization and Props:

// The RestaurantCategory component is rendered for each category in RestaurantMenu.
// It receives props: data (category information), showItems (boolean indicating whether to display items), and setShowIndex (function to update the showIndex state in RestaurantMenu).
// Rendering Category Header:

// Renders a div containing the header of the accordion, displaying the category title and the number of items in that category.
// Adds a click event listener to the div to handle the click event.
// Handling Click Event:

// When the div is clicked, the handleClick function is triggered.
// handleClick calls the setShowIndex function received as a prop. This function is responsible for updating the showIndex state in the parent RestaurantMenu.
// Conditional Rendering of Items:

// Conditionally renders the ItemList component based on the showItems prop. If showItems is true, the items for the category are displayed.
// Flow Summary:
// The RestaurantMenu component fetches restaurant information and renders categories.
// For each category, it renders a RestaurantCategory component, passing down the category information (data), the boolean indicating whether to show items (showItems), and the function to update the state (setShowIndex).
// The RestaurantCategory component renders the category header, handles click events, and conditionally displays items based on the showItems prop.
// When a category header is clicked, the setShowIndex function is called, updating the showIndex state in the RestaurantMenu component.
// The state change triggers a re-render of RestaurantMenu, causing the categories to re-render with updated showItems prop values.
// This flow allows for communication and state management between the parent (RestaurantMenu) and child (RestaurantCategory) components. The use of props for passing data and functions promotes modularity and separation of concerns.

// Controlled Components:
// In the context of React:

// A controlled component is a component where its state is controlled by its parent component. The state is passed down as props, and any state changes are handled by callback functions passed down as well.
// RestaurantMenu.js (Parent Component):
// Controlled State (showIndex):

// showIndex state is initialized and managed in the RestaurantMenu component.
// It is passed down as a prop (showItems) to each RestaurantCategory component, making them controlled.
// Communication with Child Components:

// When mapping through categories, each RestaurantCategory component receives showItems and setShowIndex as props.
// showItems is used for conditional rendering in RestaurantCategory.
// setShowIndex is a function that allows child components to communicate back to the parent (RestaurantMenu) to update the controlled state.
// RestaurantCategory.js (Child Component):
// Receiving Props:

// RestaurantCategory receives showItems and setShowIndex as props.
// Controlled Component Behavior:

// showItems is used for conditional rendering in RestaurantCategory. The component displays items based on the value received as a prop.
// When the category header is clicked, setShowIndex is called. This function is provided by the parent (RestaurantMenu), allowing the child component to communicate back and update the controlled state.
// Uncontrolled Components:
// In React:

// An uncontrolled component is a component where its state is maintained internally, and the parent doesn't have direct control over it. Uncontrolled components manage their own state using useState or other state management mechanisms.
// RestaurantCategory.js (Uncontrolled Component Example):
// State Initialization:

// There is a commented-out useState hook for showItems in the RestaurantCategory component.
// If uncommented, this would make showItems an uncontrolled component because it would manage its own state internally.
// Potential Uncontrolled Component Behavior:

// If uncommented, showItems would be local to RestaurantCategory, and the parent (RestaurantMenu) would not directly control it.
// This might lead to potential inconsistencies if both parent and child components independently manage the same state.
// Lifting State Up:
// Lifting state up refers to the practice of managing state in a common ancestor (parent) component, and passing down state and functions as props to child components.
// Communication Between Components:
// Parent to Child:

// RestaurantMenu communicates with RestaurantCategory by passing down controlled state (showItems) and a function (setShowIndex) as props.
// Child to Parent:

// RestaurantCategory communicates with RestaurantMenu by calling the provided function (setShowIndex) when the category header is clicked. This allows the child component to update the state in the parent component.
// State Management:

// The state (showIndex) is managed in the parent (RestaurantMenu), creating a single source of truth.
// Child components receive state and functions as props, making them controlled components.
// In summary, the RestaurantMenu component serves as a controlled component managing the state (showIndex), and RestaurantCategory components are controlled by receiving state and functions as props. This architecture promotes 
// a clear flow of data and actions between parent and child components. The use of controlled components and lifting state up enhances predictability and maintainability in React applications.