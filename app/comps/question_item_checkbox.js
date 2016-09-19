import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// css
import '../static/style/question_item.css'

export default class QuestionCheckbox extends React.Component{
	constructor(props){
		super();

		this.state={
			selectedList:[]
		}

		this.pushSelect = this.pushSelect.bind(this);
	}

	pushSelect(value,rank){
		let arr = this.state.selectedList.slice();
		arr.push(value);
		arr.sort(function(a,b){return b-a})

		this.props.handle(arr[0],rank);
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
									type="checkbox" 
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