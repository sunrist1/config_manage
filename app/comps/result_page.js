import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery'
// 引入组件
import HightItemTitle from './result_comps/hight_item_title.js'
import LowItemTitle from './result_comps/low_item_title.js'
import SteadyTitle from './result_comps/steady_title.js'
import FundItem from './result_comps/fund_item.js'

// 答题结果得出类型（积极，稳健，保守）
export default class ResultPage extends React.Component{
	constructor(props){
		super()

		this.state={
			showType:'aa',
			resultType:0,    //  客户投资类型，0是保守型，1是稳健性，2是进取型
			asset:1,         //  客户资产类型   1:100万到1000万   2:1000万以上
		}
 
		this.changeShow = this.changeShow.bind(this)
		this.showRender = this.showRender.bind(this)
		this.hightRender = this.hightRender.bind(this)
		this.lowRender = this.lowRender.bind(this)
		// this.getFundData = this.getFundData.bind(this)
	}

// 改变要展示的推荐基金列表，只用于100w－1000w的稳健型下
	changeShow(val){
		this.setState({
			showType:val
		})

		console.log(this.state.showType)
	}

	// 判断并展示推荐的基金列表
	componentDidMount(){
		let sum = this.props.params.result_sum;
		if(0<=sum&&sum<50){
			this.setState({
				resultType:0
			})
		}else if(50<=sum&&sum<90){
			this.setState({
				resultType:1
			})
		}else{
			this.setState({
				resultType:2
			})
		}

		this.setState({
			asset:this.props.params.asset
		})

		this.getFundData('YZ00001')
		
	}

	getFundData(fundId){
		let now = new Date(),
				url = "http://192.168.1.233:3333/lcs",
				// url = "http://lcs.daliuliang.com.cn/mobile/api/appService",
				device = 3,
				deviceId = "0E37A8FF-6882-4413-9C34-8F5B94E16D99";

		let postData = {
	    "code":"getFundList",
	    "data":{
        "fundCodes":"000005,000006"
	    }
		};

		console.log($)
		$.ajax({  
      url:url,  
      type:"POST",
      dataType:'json',  
      data:postData,  
      // jsonp:'callback',  
      success:function(result) {  
        console.log(result)  
      },  
      timeout:3000  
    });  
	}

	// 渲染该显示的dom的函数
	showRender(){
		let resultType = this.state.resultType

		console.log(resultType)
		if(1==this.state.asset){
			// 客户可配置资产为100万到1000万

			if(0==resultType){
				return this.lowRender(0);  //保守型
			}else if(1==resultType){
				return this.lowRender(1); //稳健性
			}else{
				return this.lowRender(2);  // 进取型
			}
		}else if(2==this.state.asset){
			if(0==resultType){
				return this.hightRender(0); //保守型
			}else if(1==resultType){
				return this.hightRender(1);  //稳健性
			}else{
				return this.hightRender(2);  // 进取型
			}
		}
	}

	// 资产为1000万以上的render
	hightRender(type){
		return(
			<div>
				<HightItemTitle per={type} title="固定收益类"/>
				<FundItem />
				<FundItem />
			</div>
		)
	}

	// 资产为100万到1000万的render
	lowRender(type){
		if(1==type){
			return(
				<div>
					<SteadyTitle handle={this.changeShow}/>
					<FundItem />
					<FundItem />
				</div>
			)
		}
		return(
			<div>
				<LowItemTitle title="固定收益类" />
				<FundItem />
				<FundItem />
			</div>
		)
	}

	render(){
		return(
			<div>
				{this.showRender()}
			</div>
		)
	}
} 