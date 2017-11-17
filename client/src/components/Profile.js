import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import {Link} from 'react-router-dom';

class Profile extends Component {
	constructor(props) {
    super(props);
    this.state = {message:'',role:'',amount:0,successMessage:'',userRequests:[],showBorrower:false,allRequests:[]};

	this.handleChange = this.handleChange.bind(this);
    this.handleNewRequest = this.handleNewRequest.bind(this);
    this.getUserRequests = this.getUserRequests.bind(this);
    this.getAllUserRequests = this.getAllUserRequests.bind(this);
    this.logout = this.logout.bind(this);
  }

  handleChange(e) {
  	//console.log(this.state.amount);
    this.setState({[e.target.name]:e.target.value});
  }

  getUserRequests(event) {
  	event.preventDefault();
  	 fetch('/api/borrower/'+localStorage.email)
  	 .then(res => res.json())
	    .then(response =>{
	    	//console.log(response);
	    	this.setState({userRequests:response});
	    });
  }

  getAllUserRequests(event){
  	event.preventDefault();
  	 fetch('/api/lender/')
  	 .then(res => res.json())
	    .then(response =>{
	    	//console.log(response);
	    	this.setState({allRequests:response});
	    });
  }

  componentDidMount() {
  	if(localStorage.email){
	    fetch('/api/welcome/'+localStorage.email)
	      .then(res => res.json())
	      .then(response =>
	      	{	
	      		//console.log(response.role);
	      		this.setState({message:response.message,role:response.role});
	      		localStorage.role=this.state.role;
	      		if(this.state.role === 'borrower') this.setState({showBorrower:true});
	      });
  	}	
  }

  handleNewRequest(event) {
  	event.preventDefault();
  	if(this.state.amount){
	  	fetch('/api/borrower/'+localStorage.email, {
		  		method: 'POST',
				  headers: {
				    'Accept': 'application/json',
				    'Content-Type': 'application/json',
				},
				body: JSON.stringify({
				amount: this.state.amount
			})
		}).then(res => res.json())
		.then(response => {
			//console.log(response.message);
			this.setState({successMessage:response.message});
			setTimeout(()=>{ this.setState({successMessage:''}); }, 3000);
		});
  	}
	//console.log('Got it');
  }

  logout(event){
  	event.preventDefault();
  	localStorage.clear();
  	this.props.history.push("/login");
  }

  render() {
  	if(localStorage.email){
  			const requests=this.state.userRequests;
  			//console.log(this.state.userRequests);
  			const listItems = requests.map((request) =>
    		<tr key={request._id}>
	    		<td>{request.amount}</td>
	    		<td>{request.isRepaymentDone}</td>
	    		<td>{request.repaymentdate}</td>
    		</tr>
  			);
	  	return (
	      <div>
	      	<h4>Profile</h4>
	      	<p>{this.state.message}</p>
	      	<p onClick={this.logout}>Logout</p>
	      	<div style={{display: this.state.showBorrower ? 'block' : 'none' }}>
	      		<div>
	      			<h4>Create New Request</h4>
	      			<form onSubmit={this.handleNewRequest} id="myForm1">
	      				<label>Amount:<input type="number" name="amount" value={this.state.amount} onChange={this.handleChange}/></label>	      				
	      				<input type="submit" value="Create New Credit Request" />
	      			</form>
	      			<h6>{this.state.successMessage}</h6>
	      		</div>
	      		<div>
	      			<button onClick={this.getUserRequests}>List All Credit Requests</button>
	      		</div>
	      		<table>
	      			<thead>
		      			<tr>
		      				<th>Amount</th>
		      				<th>Repayment Done</th>
		      				<th>Repayment Date</th>
		      			</tr>
	      			</thead>
	      			<tbody>{listItems}</tbody>
	      		</table>
	      	</div>
	      	<div style={{display: this.state.showBorrower ? 'none' : 'block' }}>
	      		<button onClick={this.getAllUserRequests}>List All Credit Requests of All Users</button>
	      		<table>
	      			<thead>
		      			<tr>
		      				<th>User</th>
		      				<th>Email</th>
		      				<th>Credit Left</th>
		      			</tr>
	      			</thead>
	      			<tbody>{
				  			this.state.allRequests.map((request) =>
				    		<tr key={request._id}>
					    		<td>{request.name}</td>
					    		<td>{request.email}</td>
					    		<td>{request.creditlimit}</td>
				    		</tr>
				  			)
				  		}
  				</tbody>
	      		</table>
	      	</div>
	      </div>
	    );
	  }else{
		return(
			<div>
	      		<Link to="/login">
				<h1>Click here to login</h1>
				</Link>
	      	</div>
		);
		}
	}
}

export default withRouter(Profile);