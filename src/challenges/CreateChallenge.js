import React, {useState} from 'react';
import {Challenge} from '../wb (2)';
import {CreateChallengeComponent} from './CreateChallengeComponent';
export function CreateChallenge(props){
    const [owner, setOwner] = useState(props.account);
    const [start, setStart] = useState();
    const [end, setEnd] = useState()
    const [name, setName] = useState('');
    

    const onChangeName = (e) => {
        setName(e.target.value);
    }
    const onChangeStart = (e) => {
        setStart(new Date(e.target.value));
    }
    const onChangeEnd = (e) => {
        setEnd(new Date(e.target.value))
    }
    const onSubmit = (e) => {
        let newChallenge = new Challenge(name, start, end, owner);
        props.wb.createChallenge(newChallenge);
        props.submit();
        setStart();
        setEnd();
        setName('');
    }

    return <CreateChallengeComponent 
        name = {name} 
        onChangeName = {onChangeName}
        start = {start}
        onChangeStart = {onChangeStart}
        end = {end}
        onChangeEnd = {onChangeEnd}
        onSubmit = {onSubmit}
        />;
}