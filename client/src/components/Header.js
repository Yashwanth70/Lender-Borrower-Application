import React,{Component} from 'react'
import {Link} from 'react-router-dom';
export default class Header extends Component{

	render(){

		return(
			<div>
				<Link to="/">
				<h1 >CashPositive</h1>
				</Link>
				{/*<div>
					<Link to="/">
					<h3>SIGNUP</h3>
					</Link>
					<Link to="/login">
					<h3>LOGIN</h3>
					</Link>
				</div>*/}
			</div>
			)
		
	}
}