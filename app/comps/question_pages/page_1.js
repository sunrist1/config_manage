import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入components
import QuestionRadio from './question_item_radio.js'
import QuestionCheckbox from './question_item_checkbox.js'

// 引入资源
import ListData from '../questions.json'

// css
import '../static/style/question_page.css'

export default class QuestionsPage extends React.Component{
	constructor(props){
		super();

		this.getSelect = this.getSelect.bind(this)
		// this.subAnwser = this.subAnwser.bind(this)
		this.state ={
			anwserList:new Array(13),
			resultArr:new Array(6),
			selectAll:false
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


	render(){
		let _this = this;
		let btnContent =null; 

		if(this.state.selectAll){
			btnContent = <Link className="linkBtn" to={"/echarts_page/"+this.state.resultArr}>提交答案</Link>;
		}else{
			btnContent = "请选择所有题目";
		}

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

				<div className="submit_btn">
					<button>
						{btnContent}
					</button>
				</div>
			</div>
		)
	}
}