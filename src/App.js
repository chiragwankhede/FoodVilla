import React, { useEffect, useState } from "react";
import  ReactDOM  from "react-dom/client";
import "../index.css"
import Header from "./components/Header";
import Body from "./components/Body";
import About from "./components/About";
import Contact from "./components/Contact";
import Error from "./components/Error";
import RestaurantMenu from "./components/RestaurantMenu";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";

const AppLayout =()=>{
  const [userName, setUserName]=useState("");
  useEffect(()=>{
    const data={
      name:"Pavan Rathod"
    };
    setUserName(data.name);

  },[])
    return(
      // We want our whole app to use Provider provided by react-redux so wrapping up whole app inside it
      <Provider store={appStore}>
        {/* // We want our whole app to use Context.Provider so wrapping up whole app inside it */}
        <UserContext.Provider value={{loggedInUser:userName, setUserName}}>
          <div className="app">
              <Header />
              <Outlet />
              {/* <Outlet /> The place where the content of a matched route is rendered */}
          </div>
        </UserContext.Provider>
      // </Provider>
        
    );
}

const appRouter=createBrowserRouter([
  {
    path:'/',
    element:<AppLayout />,
    children:[
      {
        path:'/',
        element:<Body />,        
      },
      {
        path:'/about',
        element:<About />,
      },
      {
        path:'/contact',
        element:<Contact />,
      },
      {
        path: '/restaurants/:resId' , //Way to create dynamic routes. Here resId will be dynamic
        element : <RestaurantMenu />
      },
      {
        path:"/cart",
        element: <Cart />
      }

    ],
    errorElement: <Error />
  }
  
])

const root= ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />)