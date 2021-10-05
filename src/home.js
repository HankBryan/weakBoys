import React from 'react';
import {WorkoutTable} from './WorkoutTable';
import logo from './WEAKBOYS .png';

export class Home extends React.Component{
    render(){
        return (<div className="App" style = {{backgroundColor: 'white'}}>
                <img src={logo} className="App-logo" alt="logo" />
                <h1>
                    Hi {this.props.account.name}
                </h1>

                <WorkoutTable workouts = {this.props.account.getWorkouts()} title = "My Workouts" className="App"/>
            </div>)
    }
}