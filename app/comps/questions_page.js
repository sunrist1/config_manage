import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入components
import QuestionRadio from './question_item_radio.js'
import QuestionCheckbox from './question_item_checkbox.js'

// 引入资源
import ListData from '../questions.json'

export default class QuestionsPage extends React.Component{
	constructor(props){
		super();

		this.getSelect = this.getSelect.bind(this)
	}

	getSelect(value){
		console.log(value)
	}

	render(){
		return(
			<div>
				{
					(ListData.questions).map(function(item,index){
						if(0==item.multi){
							return(
								<QuestionRadio key={item.id} question={item} rank={index+1}/>
							)
						}else if(1==item.multi){
							return(
								<QuestionCheckbox key={item.id} question={item} rank={index+1}/>
							)
						}
					})
				}

				<div>
					<button>提交答案</button>
				</div>
			</div>
		)
	}
}