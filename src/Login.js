import React from 'react';
import logo from './WEAKBOYS .png';
export class Login extends React.Component{
    constructor(props){
        super(props);
        this.state = {username: '', password: ''}
        this.handleChangeUser = this.handleChangeUser.bind(this);
        this.handleChangePassword = this.handleChangePassword.bind(this);
        this.attemptLogin = this.attemptLogin.bind(this);
    }

    handleChangeUser(e){
        this.setState({username: e.target.value});
    }
    handleChangePassword(e){
        this.setState({password: e.target.value})
    }
    attemptLogin(e){
        e.preventDefault();
        const user = e.target.querySelector('input[type = "username"]').value;
        const pass = e.target.querySelector('input[type = "password"]').value;
        this.props.onSubmit(user, pass)
    }
    render(){
        return (<div className="App">
      
        <img src={logo} className="App-logo" alt="logo" />
       <h2>Log In</h2>
       <form onSubmit = {this.attemptLogin}>
           <label name = "username">Username</label><br></br>
           <input type = 'username'></input><br></br>
           <label name = "password">Password</label><br></br>
           <input type = 'password'></input><br></br>
           <label name = "submit"></label>
           <input type = "submit"></input>
       </form>
   </div>);
    }
}