import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Link,
    Switch
} from 'react-router-dom';
import Signup from './components/signup';
import Signin from './components/signin';
import Lists from './components/Lists';
// import Taskitem from './components/Taskitem';
import Tasklist from './components/Tasklist';


class App extends Component {
    
    render() {
	return (
	    <Router>
	      <Switch>
		<Route exact path="/" component={ Signin }/>
		<Route path="/signup" component={ Signup }/>
		<Route path="/signin" component={ Signin }/>
		<Route exact path="/lists" component={ Lists }/>
		<Route exact path="/lists/:id" component={ Taskliste }/>
		<Route exact path="/home/" component={ Home }/>
	      </Switch>
	    </Router>
	);
    }
}

const Taskliste = ({ match }) => (
    <Tasklist taskid={ match.params.id }/>
);

const Home = () => (
    <div>
      New Pman
    </div>
)

export default App;
