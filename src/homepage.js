import React from 'react';
import ReactDOM from 'react-dom';
import {WorkoutTable} from './WorkoutTable';
import {Home} from './home';
import {NavBar} from './NavBar';
import logo from './WEAKBOYS .png';
import {LogWorkout} from './LogWorkout';
export class HomePage extends React.Component{
    constructor(props){
        super(props);
        this.state = {page: "Home", 
            directory: {Home: <Home account = {this.props.account}/>,
                        LogWorkout: <LogWorkout account = {this.props.account}></LogWorkout>}}
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick(destination){
        this.setState({page: destination});
    }
    
    render() {
        
        return (
        <div>
            {NavBar}
            <br></br>
            <img src={logo} className="App-logo" alt="logo" />
            {this.state.directory[this.state.page]}

        </div>);
    }
}