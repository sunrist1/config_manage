import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// css
import '../static/style/question_item.css'

export default class QuestionRadio extends React.Component{
	constructor(props){
		super(props);

		this.pushSelect = this.pushSelect.bind(this);
	}

	pushSelect(value,rank){
		this.props.handle(value,rank);
	}

	render(){
		let _this=this,
				newArr = [];

		this.props.question.options.forEach(function(item,index){
			return newArr.push(
							<p 
								key={index} 									
								onClick={_this.pushSelect.bind(this,item.value,_this.props.rank)}
							>
								<input 
									id={"q"+item.nameFor+"-"+item.value} 
									name={"q"+item.nameFor} 
									type="radio" 
									value={item.value}
								/>
								<label htmlFor={"q"+item.nameFor+"-"+item.value}>{item.name}</label>
							</p>)
		})
		return(
			<div className="question_item">
				<h3>{this.props.rank}、{this.props.question.title}</h3>
				{newArr}
			</div>
		)
	}
}