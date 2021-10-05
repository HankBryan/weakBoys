import React, {useState} from 'react';

export function AddFriends(props){
    const[query, setQuery] = useState('');
    const[accounts, setAccounts] = useState([]);
    const[pending, setPending] = useState(props.account.friendRequests.sent);
    const filterAccounts = (q) => {
        return props.wb.showAccounts().
            filter(acct => acct.name.startsWith(query) && 
                acct !== props.account);
    }
    const handleChange = (e) => {
        let q = e.target.value;
        q.length>1? setAccounts(filterAccounts(q)): setAccounts([]);
        setQuery(q);
        
         
    }
    const handleClick = (acct) => {
        
            props.account.sendFriendRequest(acct);
            
            props.handleUpdate();
            
        
    }
    const friends = (user, other) =>{
        return user.friends.includes(other);
    }
    const requested = (user, other) =>{
        return user.friendRequests.sent.includes(other);
    }
    const buttonMessage = (acct) => {
        if(friends(props.account,acct)){
            return "Friends"
        }
        if(props.account.friendRequests.sent.includes(acct)){
            return "Request Sent";
        }
        if(props.account.friendRequests.received.includes(acct)){
            return "Accept Request";
        }
        
        else{
            return "Add";
        }
    }

    return (<div>
            <h3>Add Friends</h3>
            <input type = "text" onChange = {handleChange}></input>
            <div>{accounts.map(acct => <li>{acct.name}<button disabled = {friends(props.account, acct) || requested(props.account, acct)} value = {acct} onClick = {() => handleClick(acct)}>{buttonMessage(acct)}</button></li>)}</div>
        </div>);
}