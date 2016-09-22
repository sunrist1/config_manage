import React from 'react';
import {render} from 'react-dom';

/*
* 100万到1000万的稳健型
*/

import "../../static/style/result_comps/steady_title.css"


export default class steadyTitle extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {};

	  this.navClick = this.navClick.bind(this)
	}

	navClick(e){

		document.getElementsByClassName('active_item')[0].className="nav_item"

		e.target.className = "nav_item active_item"

		let value = e.target.getAttribute('value')
		this.props.handle(value)
	}

	render(){
		return(
			<div className="steady_title_box">
				<div onClick={this.navClick} value="movies" className="nav_item active_item">影视创新</div>
				<div onClick={this.navClick} value="fundation" className="nav_item">证券投资</div>
			</div>
		)
	}
}