import React, { Component } from 'react';
import axios from 'axios';
import injectSheet from 'react-jss';

class Signup extends Component {
    constructor (props) {
	super(props);

	this.userSignUp = this.userSignUp.bind(this);
	this.changeForm = this.changeForm.bind(this);

	this.state = {
	    fname: '',
	    lname: '',
	    email: '',
	    pword: ''
	};
    }

    changeForm(e) {
	e.preventDefault();

	const state = this.state;
	state[e.target.name] = e.target.value;

	this.setState(state);
	console.log(state);
    }

    userSignUp(e) {
	e.preventDefault();

	// let date = new Date();
	const datenow = Date.now().toString();
	const { fname, lname, email, pword } = this.state;
	axios.post('http://api.example.com/signup', {
	    email: email,
	    firstname: fname,
	    lastname: lname,
	    password: pword,
	    createdat: datenow
	    
	})
	    .then(function (response) {
		console.log(response);
	    })
	    .catch(function(error) {
		console.log(error);
	    });
    }

    render () {
	return(
	    <div className="signupmain">
	      <div className="signupform">
		<div>
		  <input
		    name='fname'
		    type='text'
		    onChange={ this.changeForm }
		    className="fields"
		    placeholder="First name"/>
		</div>
		<div>
		  <input
		    name='lname'
		    type='text'
		    onChange={ this.changeForm }
		    className="fields"
		    placeholder="Last name"
		    />
		</div>
		<div>
		  <input
		    name='email'
		    type='text'
		    onChange={ this.changeForm }
		    className="fields"
		    placeholder="Email"
		    />
		</div>
		<div>
		  <input
		    name='pword'
		    type='password'
		    onChange={ this.changeForm }
		    className="fields"
		    placeholder="Password"
		    />
		</div>
		<div>
		  <button onClick={this.userSignUp}>Submit</button>
		</div>
	      </div>
	    </div>
	);
    }
}

const styles = {
    '@import': [
        'url(https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Quicksand|Quattrocento)'
    ],
    signupmain: {
	fontFamily: 'sans-serif',
	fontSize: '48px',
	width: '100%'
    },
    signupform: {
	fontFamily: 'sans-serif',
	fontSize: '48px',
	width: '40%',
	marginLeft: '25%',
	marginTop: '15%'
    },
    fields: {
	fontFamily: 'Raleway',
	fontSize: '24px',
	border: 'none',
	outline: 'none',
	resize: 'none',
	width: '20%',
	height: '1em',
	paddingTop: '5%',
	borderBottom: '1px solid #94a2b7'
    },
    textdone: {
	fontFamily: ['Raleway', 'sans-serif'],
	color: '#808080',
	fontSize: '48px',
	outline: 'none',
	resize: 'none',
	border: 'none',
	width: '100%',
	height: '100%',
	cursor: 'pointer',
	textAlign: 'left',
	textDecoration: 'line-through'
    }
}

export default injectSheet(styles)(Signup);
