  export function getProperty(obj, name){
      return Object.getOwnPropertyDescriptor(obj, name).value;
    }
  export  function setProperty(obj, name, value){
      Object.defineProperty(obj, name, {
        enumerable: true,
        configurable: false,
        writable: true,
        value: value
      });

    }
  export function addWorkout(workout, array) {
    let updatedArr = array.map(x => x);
    if( array.length === 0){
      return [workout];
    }
    for(let i = 0; i < array.length; ++i){
      if (workout.stats.date < array[i].stats.date){
         updatedArr.splice(i,0,workout);
         i = array.length;
      }
      if (i === array.length-1){
        updatedArr.push(workout);
      }
    }
    return updatedArr;
  }

export class WeakBoys{
  constructor(){
    getProperty = function(obj, name){
      return Object.getOwnPropertyDescriptor(obj, name).value;
    }
    setProperty = function(obj, name, value){
      Object.defineProperty(obj, name, {
        enumerable: true,
        configurable: false,
        writable: true,
        value: value
      });

    }
  
    function total(arr){
      return arr.reduce((acc,elem)=> acc+elem, 0);
    }
    let accounts = [];
    let challenges = [];
    this.showAccounts = function(){return accounts;}
    function getAccount(account){
      for(let i = 0; i < accounts.length; ++i){
        if (accounts[i].name === account){
          return accounts[i];
        }
      }
    }
    
  
    this.createAccount = function(name, password){
      let newAccount = new weakBoyAccount(name, password);
      accounts.push(newAccount);
     
    }

    this.createChallenge = function(newChallenge){
      challenges.push(newChallenge);
      newChallenge.addCompetitor(newChallenge.owner);
      newChallenge.owner.challenges.unshift(newChallenge);
    }
    this.signIn = function(name, password){
      let accountFound = false;
      for(let i = 0; i < accounts.length; ++i){
        if(accounts[i].name === name){ 
          accountFound = true;
          if (accounts[i].checkPassword(password)){
            return [true, accounts[i]];
          }
        }
      }
      return accountFound? [false,"password incorrect"] : [false,"account not found"];
    }

  }
}
export class weakBoyAccount{
  constructor(name, password){
    getProperty = function(obj, name){
      return Object.getOwnPropertyDescriptor(obj, name).value;
    }
    setProperty = function(obj, name, value){
      Object.defineProperty(obj, name, {
        enumerable: true,
        configurable: false,
        writable: true,
        value: value
      });

    }
    this.friendRequests = {sent: [], received: []};
    this.challengeInvites = {sent: [], received: []};
    this.challenges = [];
    this.friends = [];
    this.name = name;
    this.workouts = [];
    this.getWorkouts = function(){ return this.workouts; }
    let friends = {};
    this.checkPassword = function(attempt){
      return (attempt === password);
    }
    
    // this.follow = function(name){
    //   let friend = (getAccount(name));
    //   friend = {name: friend.name, workouts: friend.getWorkouts()}
    //   setProperty(friends, name, friend)
      
    // }
    
    this.getChallenges = function(){
      return this.challenges;
    }
    this.acceptChallenge = function(challenge){
      this.challenges.unshift(challenge);
      challenge.addCompetitor(this);
    }
    this.inviteToChallenge = function(challenge, friend){
      if(challenge.isOwner(this)){
        friend.challengeInvites.received.unshift(challenge);
        this.challengeInvites.sent(challenge);
      }
    }
    
    
  }
  logWorkout = function(w){
    this.workouts = addWorkout(w, this.workouts);
    //this.workouts.push(w);
    this.challenges.forEach(x => x.update(this, w));
    return w;
  }
  addFriend = function(friendAccount){
    this.friends.push(friendAccount)
  }
  getFriends = function(){
    return this.friends;
  }
  sendFriendRequest = function(stranger){
    this.friendRequests.received.includes(stranger)?
    this.acceptRequest(this.friendRequests.received.indexOf(stranger)):
    stranger.friendRequests.received.push(this);
    this.friendRequests.sent.push(stranger);
  }
  acceptRequest = function(index){
    let newFriend = this.friendRequests.received[index];
    this.friends.push(newFriend);
    newFriend.friends.push(this);
    this.friendRequests.received = this.friendRequests.received.filter(account => account !== newFriend);
  }
  denyRequest = function(index){
    let denied = this.friendRequests.received[index];
    this.friendRequests.received = this.friendRequests.received.filter(account => account !== denied);
  }
}
export class WorkOut{
  
  constructor(){
    let id = Date.now()
    this.stats = { date: undefined, upper: [[],0], abs: [[],0], legs: [[],0], run: [[],0], hike: [[],0], bike: [[],0], total: 0, id: id};
  }
  addExercise(category, reps){
    let cur = getProperty(this.stats, category);
    cur[0].push(reps);
    cur[1] = cur[1] + reps;
    setProperty(this.stats, category, cur)
    this.stats.total = this.stats.total + reps;
  }
  setDate(d){
    this.stats.date = d;
  }
  getDate(){
    return this.stats.date;
  }
}

export class Challenge{
  constructor(name, start, end, owner){
    this.name = name;
    this.competitors = [];
    this.leaderboard = {}
    this.start = start;
    this.end = end;
    this.owner = owner;
  }
  addCompetitor(account){
    this.competitors.push(account);
    setProperty(this.leaderboard, account.name, account.workouts.filter(w => {let d = w.workout.date; return d >= this.start && d <= this.end;}));
  }
  removeCompetitor(account){
    this.competitors.filter(acc => acc !== account);
  }
  isOwner(account){
    return account = this.owner;
  }

  update(acct, workout){
    let newWorkoutArray = getProperty(this.leaderboard, acct.name);
    newWorkoutArray.unshift(workout);
    setProperty(this.leaderboard, acct.name, newWorkoutArray);
  }
  addToLeaderBoard(account){
    let validWorkouts = account.getWorkouts().filter(w => w.getDate() >= this.start && w.getDate() <= this.end);

  }
}

// let wb = new WeakBoys();
// wb.createAccount("henry", "pass");
// wb.createAccount("trevor", "try");
// wb.createAccount("george", "gains");
// let myAccount = wb.signIn("henry", "pass");

// let tAccount = wb.signIn("trevor", 'try');
// tAccount.createWorkout();
// myAccount.follow('trevor');
