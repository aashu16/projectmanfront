import React, { Component } from 'react';
import injectSheet from 'react-jss';
import axios from 'axios';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCheckCircle as fascheck } from '@fortawesome/fontawesome-free-solid';
import { faCheckCircle as farcheck } from '@fortawesome/fontawesome-free-regular';

const fontsize = '24px';

const styles = {
    '@import': [
        'url(https://fonts.googleapis.com/css?family=Open+Sans|Raleway|Quicksand|Quattrocento)'
    ],
    main: {
	fontFamily: ['Quattrocento', 'sans-serif'],
	fontSize: '48px',
	width: 'inherit',
	minWidth: '500px'
    },
    text: {
	fontFamily: ['Raleway', 'sans-serif'],
	fontSize: fontsize,
	outline: 'none',
	resize: 'none',
	border: 'none',
	width: '100%',
	height: '100%',
	cursor: 'pointer',
	textAlign: 'left'
    },
    textdone: {
	fontFamily: ['Raleway', 'sans-serif'],
	color: '#808080',
	fontSize: fontsize,
	outline: 'none',
	resize: 'none',
	border: 'none',
	width: '100%',
	height: '100%',
	cursor: 'pointer',
	textAlign: 'left',
	textDecoration: 'line-through'
    },
    todocontainer: {
	width: 'auto',
	fontSize: fontsize,
	height: '100%',
	minHeight: '2em',
	display: 'flex',
 	justifycontent: 'stretch',
	alignItems: 'center',
	paddingLeft: '10%',
	paddingRight: '10%',
	paddingTop: '1%'
	// '&:hover': {
	//     borderBottom: '1px solid black'
	// }
    },
    deltodo: {
	width: '1em',
	height: '100%',
	textAlign: 'center',
	cursor: 'pointer'
    },
    edittodo: {
	fontFamily: ['Raleway', 'sans-serif'],
	fontSize: fontsize,
	outline: 'none',
	resize: 'none',
	border: 'none',
	width: '100%',
	height: '1em'
    },
    todospan: {
	width: '100%'
    },
    todotext: {
	display: 'flex',
	alignItems: 'center'
    },
    toggletodo: {
	paddingRight: '1em',
	cursor: 'pointer',
	color: '#585858',
	paddingTop: '1%'
    }
};

class Taskitem extends Component {
    constructor(props) {
	super(props);
	this.removeTodo = this.removeTodo.bind(this);
	this.changeInput = this.changeInput.bind(this);
	this.editTodo = this.editTodo.bind(this);
	this.toggleTodo = this.toggleTodo.bind(this);
	
	this.state = {
	    clicked: false
	};
    }

    toggleTodo() {
	this.props.toggle( this.props.index );

	let taskid = this.props.index;

	const data = {
	    taskid: taskid
	};
	let request = 'http://api.example.com/task/toggle';
	let jwttoken = localStorage.getItem('token').split(" ")[1];
	
	axios({
	    url: request,
	    method: 'post',
	    headers: { 'Authorization': "Bearer " + jwttoken },
	    data: data
	}).then(function (response) {
	    console.log(response.data);
	    if (response.data.success) {
		console.log('Deleted');
	    } else {
		console.log('Password incorrect.');
	    };
	}).catch(function(error) {
	    console.log(error);
	});
    }

    editTodo(e) {
	e.preventDefault();

	let editedtask = e.target.value;
	let taskid = this.props.index;
	
	this.props.edit( editedtask, taskid );


	const data = {
	    editedtask: editedtask,
	    taskid: taskid
	};
	let request = 'http://api.example.com/task/edit';
	let jwttoken = localStorage.getItem('token').split(" ")[1];

	axios({
	    url: request,
	    method: 'post',
	    headers: { 'Authorization': "Bearer " + jwttoken },
	    data: data
	}).then(function (response) {
	    console.log(response.data);
	    if (response.data.success) {
		console.log('Deleted');
	    } else {
		console.log('Password incorrect.');
	    };
	}).catch(function(error) {
	    console.log(error);
	});
	this.changeInput();
    }

    changeInput() {
	this.setState((prevState) => ({
	    clicked: !this.state.clicked
	}));
    }

    removeTodo() {
	this.props.delact( this.props.index );
	let taskid = this.props.index;

	const data = {
	    taskid: taskid
	};
	let request = 'http://api.example.com/task/delete';
	let jwttoken = localStorage.getItem('token').split(" ")[1];
	
	axios({
	    url: request,
	    method: 'post',
	    headers: { 'Authorization': "Bearer " + jwttoken },
	    data: data
	}).then(function (response) {
	    console.log(response.data);
	    if (response.data.success) {
		console.log('Deleted');
	    } else {
		console.log('Password incorrect.');
	    };
	}).catch(function(error) {
	    console.log(error);
	});
    }

    render() {
	const { classes } = this.props;
	const Filler = () => {
	    if (!this.state.clicked) {
		return (
		    <div className={ classes.todotext }>
		      <div className={ classes.todospan } onClick={ this.changeInput }>
			<span>
			  { this.props.todo.task }
			</span>
		      </div>
		    </div>
		);
	    } else {
		return (
		    <input className={ classes.edittodo }
			   defaultValue={ this.props.todo.task }
			   onBlur={ this.editTodo }
			   onClick={ this.editf }
			   autoFocus />
		);
	    }
	};
	const Checktype = () => {
	    if ( this.props.done ) {
		return (
		    <span>
		      <FontAwesomeIcon icon={ fascheck } size="xs" />
		    </span>
		);
	    } else {
		return (
		    <span>
		      <FontAwesomeIcon icon={ farcheck } size="xs" />
		    </span>
		);
	    }
	};
	
	return (
	    <div className={ classes.main }>
	      <div className={ classes.todocontainer }>
		<div className={ classes.toggletodo }
		     onClick={ this.toggleTodo }>
		  <Checktype />
		</div>
		<div className={ this.props.done ? classes.textdone : classes.text }>
		  <Filler />
		</div>
		<div className={ classes.deltodo }
		     onClick={ this.removeTodo }>
		  &times;
		</div>
	      </div>
	    </div>
	);
    }
}

export default injectSheet(styles)(Taskitem);
