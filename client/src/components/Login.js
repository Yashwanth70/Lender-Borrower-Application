import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Navigation from './Navigation'

class Login extends Component {
	constructor(props) {
    super(props);
    this.state = {email:'',password:'',message:''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

   handleChange(e) {
    this.setState({[e.target.name]:e.target.value});
    this.setState({message:""});
  }

  handleSubmit(event) {
    event.preventDefault();
    if((this.state.email!=='')&&(this.state.password!=='')){
	    fetch('/api/login', {
	  		method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
			    email: this.state.email,
			    password : this.state.password
			  })
		}).then(res => res.json())
		.then(response => {
			//console.log(response.message === "success");
			if(response.message === "success"){
				localStorage.email=this.state.email;
				this.props.history.push("/welcome");
			}
			else {
				this.setState({message:"Incorrect Credentials"});
			}
		});
	}else{
		this.setState({message:"Fill out all the fields"});
	}
  }


  render() {
  	return (
      <div>
      	<Navigation />
      	<h3>Login Page</h3>
      	<form onSubmit={this.handleSubmit} id="myForm">
		  <label>Email:<input type="text" name="email" value={this.state.email} onChange={this.handleChange}/></label>
		  <label>Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></label>
		  <input type="submit" value="Submit" />
		</form>
		<h6>{this.state.message}</h6>
      </div>
    );
  }
}

export default withRouter(Login);