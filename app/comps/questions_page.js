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
		this.subAnwser = this.subAnwser.bind(this)
		this.state ={
			anwserList:new Array(13)
		}
	}

	getSelect(value,rank){

		let arr = this.state.anwserList.slice();
		arr[rank-1]=value;

		this.setState({
			anwserList:arr
		})

		console.log(this.state.anwserList)
	}

	subAnwser(){
		let list = this.state.anwserList;
		for(let i=0;i<list.length;i++){
			if(undefined==list[i]){
				alert("aa");
				return;
			}
		}
		console.log(list)
	}

	render(){
		let _this = this;
		return(
			<div>
				{
					(ListData.questions).map(function(item,index){
						if(0==item.multi){
							return(
								<QuestionRadio 
									key={item.id} 
									question={item} 
									rank={index+1}
									handle={_this.getSelect}
								/>
							)
						}else if(1==item.multi){
							return(
								<QuestionCheckbox 
									key={item.id} 
									question={item} 
									rank={index+1}
									handle={_this.getSelect}
								/>
							)
						}
					})
				}

				<div>
					<button onClick={this.subAnwser}>提交答案</button>
				</div>
			</div>
		)
	}
}