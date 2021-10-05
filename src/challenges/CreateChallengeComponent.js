import React from 'react';

export function CreateChallengeComponent(props) {
    return (<div>
        <label>Name</label>
        <input type = "text" onChange = {props.onChangeName}></input>
        <br></br>
        <label>Start Date</label>
        <input type = "date" onChange = {props.onChangeStart}></input>
        <br></br>
        <label>End Date</label>
        <input type = "date" onChange = {props.onChangeEnd}></input>
        
        <button onClick = {props.onSubmit}>Submit</button>
    </div>);
}