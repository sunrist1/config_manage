import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入components
import QuestionRadio from './question_item_radio.js'
import QuestionCheckbox from './question_item_checkbox.js'

// 引入问题资源
import questionsGroup_1 from '../static/questions/item_1.json'
import questionsGroup_2 from '../static/questions/item_2.json'
import questionsGroup_3 from '../static/questions/item_3.json'
import questionsGroup_4 from '../static/questions/item_4.json'
import questionsGroup_5 from '../static/questions/item_5.json'
import questionsGroup_6 from '../static/questions/item_6.json'

// css
import '../static/style/question_page.css'

export default class QuestionsPage extends React.Component{
	constructor(props){
		super();

		this.getSelect = this.getSelect.bind(this)
		this.showQuestionsItem = this.showQuestionsItem.bind(this)
		this.showQuestionsGroup = this.showQuestionsGroup.bind(this)
		this.nextPart = this.nextPart.bind(this)

		this.state ={
			anwserList:new Array(13),
			resultArr:new Array(6),
			selectAll:false,
			countPage:1
		}
	}

	getSelect(value,rank){

		let arr = this.state.anwserList.slice();
		arr[rank-1]=value;

		this.setState({
			anwserList:arr
		})

		// console.log(this.state.anwserList)
		let anwserList = this.state.anwserList;
		let resultArr = this.state.resultArr;
		resultArr[0]=((anwserList[0]+anwserList[1]+anwserList[2])/3).toFixed(2)
		resultArr[1]=anwserList[3]
		resultArr[2]=(anwserList[4]+anwserList[5])/2
		resultArr[3]=(anwserList[6]+anwserList[7])/2
		resultArr[4]=(anwserList[8]+anwserList[9])/2
		resultArr[5]=((anwserList[10]+anwserList[11]+anwserList[12])/3).toFixed(2)

		this.setState({
			resultArr:resultArr
		})

// 判断是否已经选择全部题目
		if(0<=resultArr.indexOf("NaN")){
			this.setState({
				selectAll:false
			})
		}else{
			this.setState({
				selectAll:true
			})
		}
	}

// 点击进入下一part的题目
	nextPart(){
		this.setState({
			count:this.stae.count + 1
		})
	}

// 返回需要渲染的问题  单项
	showQuestionsItem(arr){
		let _this = this;
		let result = null;
		result += <div>{arr.title}</div>
		arr.questions.forEach(function(item,index){
			if(0==item.multi){
				result += <QuestionRadio 
									key={item.id} 
									question={item} 
									rank={index+1}
									handle={_this.getSelect}
								/>
			}else if(1==item.multi){
				result += <QuestionCheckbox 
									key={item.id} 
									question={item} 
									rank={index+1}
									handle={_this.getSelect}
								/>
			}
		})

		console.log(result)
		return result;
	}

	// 返回需要渲染的问题项目  总
	showQuestionsGroup(){
		let count = this.state.countPage,
				resultGroup = null;

		if(1==count){
			resultGroup = this.showQuestionsItem(questionsGroup_1);
		}else if(2==count){
			resultGroup += this.showQuestionsItem(questionsGroup_2);
			resultGroup += this.showQuestionsItem(questionsGroup_3);
		}else if(3==count){
			resultGroup += this.showQuestionsItem(questionsGroup_4);
			resultGroup += this.showQuestionsItem(questionsGroup_5);
		}else{
			resultGroup += this.showQuestionsItem(questionsGroup_6);
		}

		console.log(resultGroup)

		return resultGroup;
	}

	render(){
		let _this = this;
		let btnContent =null; 

		if(this.state.selectAll){
			btnContent = <Link className="linkBtn" to={"/echarts_page/"+this.state.resultArr}>提交答案</Link>;
		}else{
			btnContent = <span onClick={this.nextPart}>下一步</span>;
		}

		return(
			<div>
				{this.showQuestionsGroup()}

				<div className="submit_btn">
					<button>
						{btnContent}
					</button>
				</div>
			</div>
		)
	}
}