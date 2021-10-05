import React, {useState} from 'react';

export function FriendRequests(props){
    const [friendRequests, setFriendRequests] = useState(props.account.friendRequests);
    
    const handleAdd = (e) => {
        props.account.acceptRequest(e.target.value);
        //setFriendRequests(props.account.friendRequests);
        props.handleUpdate();
    }
    return (<ul>
        <h4>Friend Requests ({props.numRequests})</h4>
        <div>{props.account.friendRequests.received.map((acct, index) => <li>{acct.name}<button value = {index} onClick = {handleAdd}>Accept</button></li>)}</div>
    </ul>);
}