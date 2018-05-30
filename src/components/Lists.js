import React, { Component } from 'react';
import injectSheet from 'react-jss';
import axios from 'axios';
import { BrowserRouter as Router,
	 Route,
	 Link,
	 Redirect,
	 NavLink,
	 Switch} from "react-router-dom";
import Modal from 'react-modal';
import shortid from 'shortid';
import Tasklist from './Tasklist';
// import './Lists.css';

const styles = {
    '@import': [
        'url(https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Quicksand|Quattrocento)'
    ],
    main: {
	fontFamily: ['Quattrocento', 'sans-serif'],
	width: '100%',
	fontSize: '48px',
	minWidth: '500px',
	textAlign: 'center'
    }
}

class Lists extends Component {
    constructor(props) {
	super(props);

	// this.initialState = this.initialState.bind(this);
	this.newList = this.newList.bind(this);
	// this.getLastList = this.getLastList.bind(this);

	// this.openModal = this.openModal.bind(this);
	// this.closeModal = this.closeModal.bind(this);
	
	this.state = {
	    tasklists: [],
	    shared: [],
	    isAuthenticated: true,
	    modalIsOpen: false
	};
    }

    // openModal() {
    // 	this.setState({
    // 	    modalIsOpen: true
    // 	});
    // }

    // closeModal() {
    // 	this.setState({
    // 	    modalIsOpen: false
    // 	});
    // }

    componentDidMount() {
	if (localStorage.getItem('token') === null) {
	    console.log('no token');
	    this.setState({
    		isAuthenticated: false
    	    });
	} else {
    	    let jwttoken = localStorage.getItem('token').split(" ")[1];
    	    // console.log('mount', this.state.isAuthenticated);
	    const self = this;
	    
	    axios.get('http://api.example.com/user/lists', {
    		headers: { 'Authorization': "Bearer " + jwttoken }
    	    })
    		.then(function (response) {
    		    // console.log(response.data.results);
    		    if (response.data.success) {
			console.log('get lists');
    			return response.data.results;
    		    } else {
    			console.log('Password incorrect.');
    			self.setState({
    			    isAuthenticated: false
    			});
    		    }})
    		.then((json) => {
    		    json.map((tasklist) => {
    			// console.log(tasklist);
    			self.setState((prevState) => ({
    			    tasklists: [...prevState.tasklists, tasklist]
    			}));
    		    });
    		})
    		.catch(function(error) {
    		    console.log(error);
		    self.setState({
    			isAuthenticated: false
    		    });
    		});
	    
    	    axios.get('http://api.example.com/user/sharedlists', {
    		headers: { 'Authorization': "Bearer " + jwttoken }
    	    })
    		.then(function (response) {
    		    // console.log(response.data.results);
    		    if (response.data.success) {
    			return response.data.results;
    		    } else {
    			console.log('Password incorrect.');
    			self.setState({
    			    isAuthenticated: false
    			});
    		    }})
    		.then((json) => {
    		    json.map((shared) => {
    			console.log(shared);
    			self.setState((prevState) => ({
    			    shared: [...prevState.shared, shared]
    			}));
    		    });
    		})
    		.catch(function(error) {
    		    console.log(error);
    		});
	}
    }

    newList(e) {
	e.preventDefault();
	let newlistref = this.refs.newlist;
	let newlist = newlistref.value;
	let createdat = Date.now() / 1000;
	let ind = shortid.generate();

	const self = this;

	let data = {
	    listname: newlist,
	    createdat: createdat,
	    ind: ind
	};

	this.setState((prevState) => ({
	    tasklists: [...prevState.tasklists, {listname: data.listname, refid: data.ind}]
	}));

	let request = 'http://api.example.com/list/new';

	let jwttoken = localStorage.getItem('token').split(" ")[1];

	axios({
	    url: request,
	    method: 'post',
	    headers: { 'Authorization': "Bearer " + jwttoken },
	    data: data
	}).then(function (response) {
	    // console.log(response.data);
	    if (response.data.success) {
		console.log('New list created.');
	    } else {
		console.log('Password incorrect.');
	    };
	}).catch(function(error) {
	    console.log('newlisterror', error);
	    self.setState({
    		isAuthenticated: false
    	    });
	});
    }

    render() {
	const { classes } = this.props;
	
	const PrivateRoute = ({ component: Component, ...rest }) => (
	    <Route exact {...rest} render={props =>
				     this.state.isAuthenticated ? 
					 <Component {...props} /> :
					     <Redirect to={{ pathname: '/signin' }} />
					     } />
	);

	if (!this.state.isAuthenticated) {
	    return <Redirect to={{ pathname: '/signin' }} />;
	}

	return (
	    <div className="mainlist" style={{
		     fontFamily: 'sans-serif',
		     width: '100%',
		     fontSize: '42px',
		     minWidth: '200px',
		     textAlign: 'left',
		     display: 'flex',
		     color: '#353535'
		 }}>
	      <div className="lists"
		   style={{
		       fontFamily: 'sans-serif',
		       width: '30%',
		       fontSize: '42px',
		       minWidth: '300px',
		       textAlign: 'left',
		       paddingLeft: '5%'
		   }}>
		<div className="newlist">
		  <input type="text"
			 className="text"
			 size="40"
			 placeholder="New list"
			 ref="newlist"
			 style={{
			     fontFamily: 'Raleway',
			     fontSize: '30px',
			     outline: 'none',
			     resize: 'none',
			     border: 'none',
			     width: '8em',
			     height: '1.5em',
			     paddingTop: '5%',
			     paddingBottom: '5%'
			 }}
			 />
	    	  <input type="submit"
			 className="btnsubmit"
			 onClick={ this.newList }
			 value="+"
			 style={{
			     border: '1px solid white',
			     fontSize: '30px',
			     height: '100%',
			     width: '1em',
			     textAlign: 'center',
			     cursor: 'pointer',
			     paddingTop: '5%',
			     paddingBottom: '5%'
			 }}
			 />
		</div>
		<div className="listc">
		  { this.state.shared.map((tasklist) => (
		      <div className="listelement"
			   key={tasklist.refid}
			   style={{
			       paddingTop: '2%'
			   }}>
			<span className="listspan" key={tasklist.refid}>
			  <Link to={'/lists/'+tasklist.refid}
				style={{
				    paddingTop: '5%',
				    color: '#605f5f'
				}}>
			    { tasklist.listname }
			  </Link>
			</span>
		      </div>
		  ))}
	    </div>
		
		<div>
		<div className="listc">
		{ this.state.tasklists.map((tasklist) => (
		    <div className="listelement"
			 key={tasklist.refid}
			 style={{
			     paddingTop: '6px',
			     color: '#605f5f'
			 }}>
		      <span className="listlink"
			    key={tasklist.refid}
			    style={{ textDecoration: 'none' }}>
			<NavLink to={'/lists/'+tasklist.refid}
				 style={{ textDecoration: 'none',
				 color: '#4f4f4f'}}>
			  { tasklist.listname }
			</NavLink>
		      </span>
		    </div>
		))}
	    </div>
		</div>
		</div>
		<PrivateRoute path="/lists/:id" component={ Taskliste } />
		</div>
	);
    }
}

const Taskliste = ({ match }) => (
    <Tasklist taskid={ match.params.id }/>
);



// const OldSchoolMenuLink = ({ label, to, onCLick }) => (
//     <Link to={to}>{label}</Link>
// );

export default Lists;
