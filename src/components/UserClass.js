import React from "react";

class UserClass extends React.Component{
    constructor(props){
        super(props);
        console.log("Parent Constructor");
    }
    render(){
        console.log("Parent Render");
        const {name, loaction}=this.props;
        console.log("Props are :", name,loaction);
        return(
            <div className="user-card">
                <h2>Name : {name}</h2>
                <h3>loaction : {loaction}</h3>
                <h4>Contact: @chirag20wankhede</h4>
            </div>
        );
    }        
}
export default UserClass;