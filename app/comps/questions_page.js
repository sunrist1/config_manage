import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入弹窗
import Alert from 'react-s-alert';

// 引入components
import QuestionRadio from './question_item_radio.js'
import QuestionCheckbox from './question_item_checkbox.js'

// 引入资源
import ListData from '../questions.json'

// css
import '../static/style/question_page.css'
import 'react-s-alert/dist/s-alert-default.css';

export default class QuestionsPage extends React.Component{
	constructor(props){
		super();

		this.getSelect = this.getSelect.bind(this)
		this.nextStep = this.nextStep.bind(this)
		// this.subAnwser = this.subAnwser.bind(this)
		this.state ={
			anwserList:new Array(13),
			resultArr:new Array(6),
			selectAll:false,
			listData:[],               //  问题总数组
			showQuestionsList:[],      // 显示的问题列表
			count:1                    // 当前该显示的问题part
		}
	}

	getSelect(value,rank){

		let arr = this.state.anwserList.slice();
		arr[rank-1]=value;

		this.setState({
			anwserList:arr
		})

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

	// 下一步
	nextStep(e){
		let count = this.state.count,
				anwserList = this.state.anwserList;
		if(1==count){
			if(undefined==anwserList[0] || undefined==anwserList[1] || undefined==anwserList[2]){
				e.preventDefault();
				Alert.warning('请回答所有问题。');
        // alert("请回答所有问题。")
				return;
			}
		}else if(2==count){
			if(undefined==anwserList[3] || undefined==anwserList[4] || undefined==anwserList[5]){
				Alert.warning('请回答所有问题。');
				return;
			}
		}else if(3==count){
			if(undefined==anwserList[6] || undefined==anwserList[7] || undefined==anwserList[8] || undefined==anwserList[9]){
				Alert.warning('请回答所有问题。');
				return;
			}
		}else{
			if(undefined==anwserList[10] || undefined==anwserList[11] || undefined==anwserList[12]){
				Alert.warning('请回答所有问题。');
				return;
			}else{
				this.setState({
					selectAll:true
				})
			}
		}

		this.setState({
			count:this.state.count+1
		})

		window.scrollTo(0,0);  //返回顶部
	}

	render(){
		let _this = this;
		let btnContent =null; 

		if(this.state.selectAll){
			btnContent = <Link className="linkBtn" to={"/echarts_page/"+this.state.resultArr}></Link>;
		}else{
			btnContent = <span onClick={this.nextStep}></span>;
		}

		let list = [],
				count = this.state.count;
		if(1==count){
			list.push(ListData.questions[0])
			list.push(ListData.questions[1])
			list.push(ListData.questions[2])
		}else if(2==count){
			list.push(ListData.questions[3])
			list.push(ListData.questions[4])
			list.push(ListData.questions[5])
		}else if(3==count){
			list.push(ListData.questions[6])
			list.push(ListData.questions[7])
			list.push(ListData.questions[8])
			list.push(ListData.questions[9])
		}else{
			list.push(ListData.questions[10])
			list.push(ListData.questions[11])
			list.push(ListData.questions[12])
		}

		return(
			<div className="question_page_content">
				{
					list.map(function(item,index){
						if(0==item.multi){
							return(
								<QuestionRadio 
									key={item.id} 
									question={item} 
									title={item.title}
									rank={item.id}
									handle={_this.getSelect}
								/>
							)
						}else if(1==item.multi){
							return(
								<QuestionCheckbox 
									key={item.id} 
									question={item} 
									title={item.title}
									rank={item.id}
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
				<Alert stack={{limit: 1}} />
			</div>
		)
	}
}