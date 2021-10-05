import React, {useState} from 'react';
import {WorkoutTable} from '../WorkoutTable';
import {getProperty} from '../wb (2)';
export function ChallengeView(props) {
   
   
   return (<div>
            <h1>{props.chal.name}</h1>
            <WorkoutTable workouts = {Object.getOwnPropertyDescriptor(props.chal.leaderboard, props.account.name).value}/>
        </div>);
}