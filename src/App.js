
import './App.css';
import {WeakBoys, WorkOut, weakBoyAccount} from './wb (2)';
import {HomePage} from './homepage';
import {AuthorizationLayer} from './AuthorizationLayer';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


let wb = new WeakBoys();
wb.createAccount('henry', 'hi');
let h = wb.signIn('henry', 'hi')[1];
wb.createAccount('trevor', 'yo');
wb.createAccount('luke', 'sup');
wb.createAccount('george', 'suh');
wb.createAccount('jake', 'j');
wb.createAccount('brooki', 'b');
wb.createAccount('curt', 'c');
let t = wb.signIn('trevor', 'yo')[1];
let l = wb.signIn('luke', 'sup')[1];
let g = wb.signIn('george', 'suh')[1];
let j = wb.signIn('jake', 'j')[1];

t.sendFriendRequest(h);
h.acceptRequest(0);
g.sendFriendRequest(h);
h.acceptRequest(0);
j.sendFriendRequest(h);
l.sendFriendRequest(h);

// let w = h.createWorkout();
// w.addExercise('upper', 23);
// let w2 = h.createWorkout();
// w.setDate('5/25');
// w2.addExercise('legs', 76);
// w2.setDate('5/26');
function App() {
  return (
      <Router>
          
           <AuthorizationLayer wb = {wb} />
      </Router>
   
  
  );
}

export default App;
