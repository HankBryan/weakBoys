import React from 'react';

export class NavBar extends React.Component{
    constructor(props){
        super(props);
    }
    handleClick(){
        return "Home";
    }
    render(){
        return (
            <div>
                <button onClick = {this.handleClick}>Home</button>
                <button>Log Workout</button>
                <button>Friends</button>
                <button>Account</button>
                <button>Merch</button>
            </div>
          
            );
    }
}