import React, {useState} from 'react';
import {WorkoutTable} from './WorkoutTable';
import {WorkOut} from './wb (2)';

export function LogWorkout(props){
    const [wrk, setWorkout] = useState(new WorkOut());
    const [category, setCategory] = useState("upper");
    const [exercise, setExercise] = useState(0);
    const [date, setDate] = useState();
    const [total, setTotal] = useState(0);
    const handleChange = (event) => {setCategory(event.target.value)}
    
    const handleClick = (event) => {
      event.preventDefault()
      wrk.addExercise(category, exercise);
      setTotal((prev) => (prev + exercise));
  }
    const handleReps = (event) => {
        event.preventDefault();
        if (event.target.value !== ""){
            let num = parseInt(event.target.value);
            setExercise(num); }
        if(event.target.value === ""){
            setExercise(0);
        }
    }
    const handleDate = (event) => {
        let d = new Date(event.target.value);
        wrk.setDate(d);
        setDate(d);
    }
  const onSubmit = (event) => {
      event.preventDefault(); 
      if(wrk.stats.total > 0 && wrk.stats.date !== undefined){
        props.account.logWorkout(wrk);
        setWorkout(new WorkOut());
        setDate(Date.now());}
      else{ 
          wrk.stats.total === 0? alert("You gotta workout still") : alert("You forgot the date bro");}
    }
        return (<div>
            <h1>Log Workout</h1>
            <form>
                <label>Date</label>    <input
                type="date"
                name="date"
                value={date}
                onChange={handleDate}
              />
                <br></br>
                <select onChange = {handleChange}>
                    <option value = "upper" >Upper</option>
                    <option value = "abs" >Abs</option>
                    <option value = "legs" >Legs</option>
                    <option value = "run" >Run</option>
                    <option value = "hike" >Hike</option>
                    <option value = "bike" >Bike</option>
                </select>
                <input type = "text" onChange = {handleReps}></input><button onClick = {handleClick}>Add</button>
                <br></br>
                <button onClick = {onSubmit}>Finish Workout</button>
                <br></br>
                <WorkoutTable key = {wrk.stats.total} workouts = {[wrk]} title = "Today's Workout" />
                <br></br>
                <br></br>
                <WorkoutTable key ={wrk.stats.total + 1} workouts = {props.account.getWorkouts()} title = "All Workouts" />

            </form>
            
        </div>);
    
}