import React, {useState} from 'react';
import {FriendRequests} from './FriendRequests';
import {AddFriends} from './AddFriends';
export function Friends(props){
    const[friends, setFriends] = useState(props.account.getFriends());
    const[numFriends, setnumFriends] = useState(props.account.getFriends().length);
    const[numRequests, setNumRequests] = useState(props.account.friendRequests.received.length);
    const[numSentRequests, setNumSentRequests] = useState(props.account.friendRequests.sent.length);

    const handleUpdate = () =>{
        setFriends(props.account.friends);
        setnumFriends(props.account.getFriends().length);
        setNumRequests(props.account.friendRequests.received.length);
        setNumSentRequests(props.account.friendRequests.sent.length);
    }
    return (<div>
        <h1>
            Friends ({numFriends})
        </h1>
        <ul>
            {friends.map(fr => <li>{fr.name}</li>)}
        </ul>
        <AddFriends wb = {props.wb} 
            account = {props.account} 
            handleUpdate = {handleUpdate}
            numSentRequests = {numSentRequests}/>
        <FriendRequests account = {props.account} 
            handleUpdate = {handleUpdate} 
            friendRequests = {props.account.friendRequests.recieved}
            numRequests = {numRequests} />
    </div>);
}