import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

export default class QuestionCheckbox extends React.Component{
	constructor(props){
		super();

		this.state={
			forname:"0"
		}
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
								<input id={"q"+item.nameFor+"-"+item.value} name={"q"+item.nameFor} type="checkbox" value={item.value}/>
								<label htmlFor={"q"+item.nameFor+"-"+item.value}>{item.name}</label>
							</p>
						)
					})
				}
			</div>
		)
	}
}