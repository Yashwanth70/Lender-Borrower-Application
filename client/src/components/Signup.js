import React, { Component } from 'react';
import Navigation from './Navigation'

class Signup extends Component {
	constructor(props) {
    super(props);
    this.state = {name:'',email:'',password:'',role: 'borrower',message:''};

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
  	//console.log(this.state.role);
    this.setState({[e.target.name]:e.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if((this.state.name!=='')&&(this.state.email!=='')&&(this.state.password!=='')){
	    fetch('/api/signup', {
	  		method: 'POST',
			  headers: {
			    'Accept': 'application/json',
			    'Content-Type': 'application/json',
			  },
			  body: JSON.stringify({
			    name: this.state.name,
			    email: this.state.email,
			    password : this.state.password,
			    role:this.state.role
			  })
		}).then(res => res.json())
       .then(response => this.setState({message:response.message,name:'',email:'',password:'',role: 'borrower'}));
	}else{
		this.setState({message:"Fill out all the fields"});
	}
  }

render() {
	return (
      <div>
      	<Navigation />
      	<h3>Signup Page</h3>
      	<form onSubmit={this.handleSubmit} id="myForm">
		  <label>Name:<input type="text" name="name" value={this.state.name} onChange={this.handleChange}/></label>
		  <label>Email:<input type="text" name="email" value={this.state.email} onChange={this.handleChange}/></label>
		  <label>Password:<input type="password" name="password" value={this.state.password} onChange={this.handleChange}/></label>
		  <label>Role:
		  	<select name="role" value={this.state.role} onChange={this.handleChange}>
	            <option value="lender">Lender</option>
	            <option value="borrower">Borrower</option>
          	</select>
		  </label>
		  <input type="submit" value="Submit" />
		</form>
		<h6>{this.state.message}</h6>
      </div>
    );
  }
}

export default Signup;