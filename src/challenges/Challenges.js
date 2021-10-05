import React, {useState} from 'react';
import {CreateChallenge} from './CreateChallenge';
import {Modal} from '../Modal';
import {ChallengeView} from './ChallengeView';
import '../css/Modal.css';

export function Challenges(props){
    const [showCreate, setShowCreate] = useState(false);
    const [numChallenges, setNumChallenges] = useState(props.account.challenges.length);


    return (<div>
            <h1>Challenges</h1>
            {numChallenges > 0 && <ChallengeView chal = {props.account.challenges[0]} account = {props.account}/>}
            <button onClick = {()=> setShowCreate(true)}>Create Challenge</button>
            <Modal 
                title = "Create a Challenge" 
                show = {showCreate} 
                onClose = {() => setShowCreate(false)} 
                close = "Cancel" >
                <CreateChallenge 
                    account = {props.account} 
                    wb = {props.wb}
                    submit = {() => {setShowCreate(false); setNumChallenges((prev) => prev + 1);} }
                    />
            </Modal>
        </div>)
}