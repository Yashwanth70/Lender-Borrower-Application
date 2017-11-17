import React,{Component} from 'react'
import {Link} from 'react-router-dom';

export default class Navigation extends Component{

	render(){

		return(
				<div>
					<Link to="/">
					<p>SIGNUP</p>
					</Link>
					<Link to="/login">
					<p>LOGIN</p>
					</Link>
				</div>
			)
		
	}
}