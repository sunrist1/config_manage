import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

export default class QuestionRadio extends React.Component{
	constructor(props){
		super();

		this.pushSelect = this.pushSelect.bind(this);
	}

	pushSelect(){
		console.log("value")
		// this.props.handle()
	}

	render(){
		return(
			<div>
				<h3>{this.props.question.title}</h3>
				{
					(this.props.question.options).map(function(item,index){
						let code = Math.floor(Math.random()*10)
						return(
							<p key={index}>
								<input id={"q"+item.nameFor+"-"+item.value} name={"q"+item.nameFor} type="radio" value={item.value}/>
								<label htmlFor={"q"+item.nameFor+"-"+item.value}>{item.name}</label>
							</p>
						)
					})
				}
			</div>
		)
	}
}