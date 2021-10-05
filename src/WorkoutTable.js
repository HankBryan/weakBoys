import React from 'react';
import {formatDate} from './utilities';
export class WorkoutTable extends React.Component{
    constructor(props){
        super(props);
        this.workouts = this.props.workouts;
        this.displayWorkouts = this.displayWorkouts.bind(this);
    }
    displayWorkouts(){
        let counter = () => {let start = -1; let go = () => {start = start + 1; return start}};
        let count = counter();
        let arr = this.workouts.map(w => w.stats);
        return arr.map(w => <tr><td key = {w.id}>{w.date && formatDate(w.date)}</td>{Object.keys(w).slice(1, -2).map(key => <td key = {w.id+key}>{w[key][1]} </td>)}<td key = {count}>{w.total}</td></tr>);
 
    }

    render(){
        return (
            <table rules = 'all' border = '1'>
                <colgroup span = "8"></colgroup>
                
                    <th colSpan = '8'>{this.props.title}</th>
                
                <tbody>
                    <tr>
                        <th>Date</th>
                        <th>Upper</th>
                        <th>Abs</th>
                        <th>Legs</th>
                        <th>Run</th>
                        <th>Hike</th>
                        <th>Bike</th>
                        <th>Total</th>
                    </tr>
                    {this.displayWorkouts()}
                </tbody>
                
            </table>
        );
        }
}