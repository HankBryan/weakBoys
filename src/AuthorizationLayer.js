import React from 'react';
import {HomePage} from './homepage';
import logo from './WEAKBOYS .png';
import {Home} from './home';
import {LogWorkout} from './LogWorkout';
import {Friends} from './friends/Friends';
import {Login} from './Login';
import {Challenges} from './challenges/Challenges';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    Redirect
  } from "react-router-dom";

export class AuthorizationLayer extends React.Component{
    constructor(props){
        super(props);
        // this.state = {authorized: false, username: undefined, password: undefined, page: "Home", 
        // directory: {Home: (props) => <Home account = {this.state.account}/>,
        //     LogWorkout: (props) => <LogWorkout account = {this.state.account} />, 
        //     Friends: (props) => <Friends account = {this.state.account} wb = {this.props.wb}/>}};

        this.state = {authorized: false, username: undefined, password: undefined, page: "Home", 
        directory: {Home: (props) => <Home account = {this.state.account}/>,
            LogWorkout: (props) => <LogWorkout account = {this.state.account} />, 
            Friends: (props) => <Friends account = {this.state.account} wb = {this.props.wb}/>}};
        
        this.signIn = this.signIn.bind(this);
        this.signOut = this.signOut.bind(this);
        this.signIn2 = this.signIn2.bind(this);
    }

    handleClick(destination){
        this.setState({page: destination});
    }

    signIn(e){
        //e.preventDefault();
        const user = e.target.querySelector('input[type = "username"]').value;
        const pass = e.target.querySelector('input[type = "password"]').value;
        let attempt = this.props.wb.signIn(user, pass);
        if (attempt[0] === false){
            alert(attempt[1]);
        }
        this.setState({authorized: attempt[0], account: attempt[1] });
        
    }

    signIn2(user, pass){ 
        let attempt = this.props.wb.signIn(user, pass);
        if (attempt[0] === false){
            alert(attempt[1]);
        }
    this.setState({authorized: attempt[0], account: attempt[1] });
}

    signOut(){
        this.setState({authorized: false, account: undefined})
    }

    render(){
        // let NavBar = (<div>
        //     <button disabled = {!this.state.authorized} onClick = {() => this.handleClick("Home")}>Home</button>
        //     <button disabled = {!this.state.authorized} onClick = {() => this.handleClick("LogWorkout")}>Log Workout</button>
        //     <button disabled = {!this.state.authorized} onClick = {() => this.handleClick("Friends")}>Friends</button>
        //     <button disabled = {!this.state.authorized} >Account</button>
        //     <button disabled = {!this.state.authorized} >Merch</button>
        //     {this.state.authorized && <button onClick = {this.signOut}>Log Out</button> }
        //     {!this.state.authorized && <button>Create Account</button> }
        //</div>);

        let NavBar = <div><Link to = '/'>Home   </Link>   
                <Link to = '/LogWorkout'>LogWorkout   </Link>  
                <Link to = '/Friends'>Friends   </Link>
                <Link to = '/Challenges'>Challenges   </Link>
                <Link to = '/' onClick = {() => this.setState({authorized: false})}>Log Out</Link>
            </div>

        let login = (
        <div className="App">
        
            <img src={logo} className="App-logo" alt="logo" />
            <h2>Log In</h2>
            <form onSubmit = {this.signIn}>
                <label name = "username">Username</label><br></br>
                <input type = 'username'></input><br></br>
                <label name = "password">Password</label><br></br>
                <input type = 'password'></input><br></br>
                <label name = "submit"></label>
                <input type = "submit"></input>
            </form>
        </div>);

        let page =
        <Switch>
          <Route path="/Friends">
          <Friends account = {this.state.account} wb = {this.props.wb}/>
          </Route>
          <Route path="/LogWorkout">
          <LogWorkout account = {this.state.account} />
          </Route>
          <Route path="/Challenges">
            <Challenges account = {this.state.account} wb = {this.props.wb}/>
          </Route>
          <Route path='/LogIn'>
            {!this.state.authorized?<Login onSubmit = {this.signIn2} />: <Redirect to= '/Home' />}
          </Route>
          <Route path = '/Home'>
            <Home account = {this.state.account}/>
          </Route>
          <Route exact path="/">
            {!this.state.authorized? <Redirect to = '/LogIn'/> : <Redirect to = '/Home'/>}
          </Route>
        </Switch>
        
        return (<html>
                    <head>
                        Weak Boys
                    </head>
                    {this.state.authorized && <nav>
                        {NavBar}
                    </nav> }
                    
                    {page}
            </html>);        

        
    }
}
//this.state.directory[this.state.page]({account: this.state.account})
//{!this.state.authorized? <Login onSubmit = {this.signIn2} />: this.state.directory[this.state.page]({account: this.state.account})}