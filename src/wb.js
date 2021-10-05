  function getProperty(obj, name){
      return Object.getOwnPropertyDescriptor(obj, name).value;
    }
    function setProperty(obj, name, value){
      Object.defineProperty(obj, name, {
        enumerable: true,
        configurable: false,
        writable: true,
        value: value
      });

    }

export class WeakBoys{
  constructor(){
  
    function total(arr){
      return arr.reduce((acc,elem)=> acc+elem, 0);
    }
    let accounts = [];
    this.showAccounts = function(){return accounts;}
    function getAccount(account){
      for(let i = 0; i < accounts.length; ++i){
        if (accounts[i].name === account){
          return accounts[i];
        }
      }
    }
   
   class weakBoyAccount{
      constructor(name, password){
        let friendChart  =[];
        this.name = name;
        let workouts = [];
        this.getWorkouts = function(){ return workouts; }
        let friends = {};
        this.checkPassword = function(attempt){
          return (attempt === password);
        }
        this.createWorkout = function(){
          let w = new WorkOut();
          workouts.push(w);
          return w;
          
          
        }
        this.follow = function(name){
          let friend = (getAccount(name));
          friend = {name: friend.name, workouts: friend.getWorkouts()}
          setProperty(friends, name, friend)
          
        }
        this.setFriendChart = function(obj){
          friendChart = obj;
        }
        this.getFriendChart = function(){
          return friends;
        }
        this.observable = new Observable();
      }
    }
    let observable = new Observable();
    this.createAccount = function(name, password){
      let newAccount = new weakBoyAccount(name, password);
      accounts.push(newAccount);
     
    }
    this.signIn = function(name, password){
      let accountFound = false;
      for(let i = 0; i < accounts.length; ++i){
        if(accounts[i].name === name){ 
          accountFound = true;
          if (accounts[i].checkPassword(password)){
            return accounts[i];
          }
        }
      }
      return accountFound? "password incorrect" : "account not found";
    }

  }
}
//oberservers
class Observable{
  constructor(){
    this.observers = []
  }
  subscribe(observer){
    this.observers.push(observer);
  }
  update(newValue){
    this.observers.forEach(f => f(newValue));
  }
}
export class WorkOut{
  constructor(){
    this.date = undefined;
    this.total = 0;
    this.workout = { upper: [[],0], abs: [[],0], legs: [[],0], run: [[],0] };
  }
  addExercise(category, reps){
    let cur = getProperty(this.workout, category);
    cur[0].push(reps);
    cur[1] = cur[1] + reps;
    setProperty(this.workout, category, cur)
    this.total = this.total + reps;
    return this;
  }
  setDate(d){
    this.date = d;
  }
  getDate(){
    return this.date;
  }
}

class Challenge{
  constructor(name){
    this.name = name;
    this.competitors = [];
    this.leaderboard = {}
  }
  addCompetitors(account){
    account.observable.subscribe(f => this.update(account));
    this.competitors.push(account);
    setProperty(this.leaderboard, account.name, this.addToLeaderboard(account))
  }

  update(acount){

  }
  addToLeaderBoard(account){
    let validWorkouts = account.getWorkouts().filter(w => w.getDate() >= this.start && w.getDate() <= this.end);

  }
}

let wb = new WeakBoys();
wb.createAccount("henry", "pass");
wb.createAccount("trevor", "try");
wb.createAccount("george", "gains");
let myAccount = wb.signIn("henry", "pass");

let tAccount = wb.signIn("trevor", 'try');
tAccount.createWorkout();
myAccount.follow('trevor');
