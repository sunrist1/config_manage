import React from 'react';
import {render} from 'react-dom';
import $ from 'jquery'
// 引入组件
// import HightItemTitle from './result_comps/hight_item_title.js'
// import LowItemTitle from './result_comps/low_item_title.js'
// import SteadyTitle from './result_comps/steady_title.js'
import FundItem from './result_comps/fund_item.js'

// 引入echarts
import ReactEcharts from 'echarts-for-react'

// 引入css
import '../static/style/result_page.css'

// 引入百分比json
import ResultPer from '../result_per.json'

// 引入table图片   table都懒得自己写了，直接图片来，我都佩服自己
import baoshouTableImg from '../static/images/baoshou_table.png'
import wenjianTableImg from '../static/images/wenjian_table.png'
import jinquTableImg from '../static/images/jinqu_table.png'

// 答题结果得出类型（积极，稳健，保守）
export default class ResultPage extends React.Component{
	constructor(props){
		super()

		this.state={
			showType:'aa',
			resultType:0,    //  客户投资类型，0是保守型，1是稳健性，2是进取型
			asset:1,         //  客户资产类型   1:100万到1000万   2:1000万以上
		}
 
		this.getOption = this.getOption.bind(this)
		// this.showRender = this.showRender.bind(this)
		// this.hightRender = this.hightRender.bind(this)
		// this.lowRender = this.lowRender.bind(this)
		// this.getFundData = this.getFundData.bind(this)
	}

// 改变要展示的推荐基金列表，只用于100w－1000w的稳健型下
	// changeShow(val){
	// 	this.setState({
	// 		showType:val
	// 	})

	// 	console.log(this.state.showType)
	// }

	// 判断并展示推荐的基金列表
	// componentDidMount(){
	// 	let sum = this.props.params.result_sum;
	// 	if(0<=sum&&sum<50){
	// 		this.setState({
	// 			resultType:0
	// 		})
	// 	}else if(50<=sum&&sum<90){
	// 		this.setState({
	// 			resultType:1
	// 		})
	// 	}else{
	// 		this.setState({
	// 			resultType:2
	// 		})
	// 	}

	// 	this.setState({
	// 		asset:this.props.params.asset
	// 	})

	// 	this.getFundData('YZ00001')
	// }

	// getFundData(fundId){
	// 	let now = new Date(),
	// 			url = "http://192.168.1.233:3333/lcs",
	// 			// url = "http://lcs.daliuliang.com.cn/mobile/api/appService",
	// 			device = 3,
	// 			deviceId = "0E37A8FF-6882-4413-9C34-8F5B94E16D99";

	// 	let postData = {
	//     "code":"getFundList",
	//     "data":{
 //        "fundCodes":"000005,000006"
	//     }
	// 	};

	// 	console.log($)
	// 	$.ajax({  
 //      url:url,  
 //      type:"POST",
 //      dataType:'json',  
 //      data:postData,  
 //      // jsonp:'callback',  
 //      success:function(result) {  
 //        console.log(result)  
 //      },  
 //      timeout:3000  
 //    });  
	// }

	// 渲染该显示的dom的函数
	// showRender(){
	// 	let resultType = this.state.resultType

	// 	console.log(resultType)
	// 	if(1==this.state.asset){
	// 		// 客户可配置资产为100万到1000万

	// 		if(0==resultType){
	// 			return this.lowRender(0);  //保守型
	// 		}else if(1==resultType){
	// 			return this.lowRender(1); //稳健性
	// 		}else{
	// 			return this.lowRender(2);  // 进取型
	// 		}
	// 	}else if(2==this.state.asset){
	// 		if(0==resultType){
	// 			return this.hightRender(0); //保守型
	// 		}else if(1==resultType){
	// 			return this.hightRender(1);  //稳健性
	// 		}else{
	// 			return this.hightRender(2);  // 进取型
	// 		}
	// 	}
	// }

	// 资产为1000万以上的render
	// hightRender(type){
	// 	return(
	// 		<div>
	// 			<HightItemTitle per={type} title="固定收益类"/>
	// 			<FundItem />
	// 			<FundItem />
	// 		</div>
	// 	)
	// }

	// 资产为100万到1000万的render
	// lowRender(type){
	// 	if(1==type){
	// 		return(
	// 			<div>
	// 				<SteadyTitle handle={this.changeShow}/>
	// 				<FundItem />
	// 				<FundItem />
	// 			</div>
	// 		)
	// 	}
	// 	return(
	// 		<div>
	// 			<LowItemTitle title="固定收益类" />
	// 			<FundItem />
	// 			<FundItem />
	// 		</div>
	// 	)
	// }


// echart options
	getOption() {
		// 线条颜色
		let sumType = this.props.params.result_sum,
				lineColor = '',
				legendType = [],
				dataType = {};

		if(0<=sumType&&sumType<50){
			dataType = ResultPer.result.baoshou;
			legendType = ['二级市场','现金管理','固定收益','海外投资、影视文化基金']
		}else if(50<=sumType&&sumType<90){
			dataType = ResultPer.result.wenjian;
			legendType = ['二级市场','现金管理','中长期股权','固定收益','海外投资、影视文化基金']
		}else{
			dataType = ResultPer.result.jinqu;
			legendType = ['二级市场','现金管理','中长期股权','固定收益','海外投资、影视文化基金']
		}

		let _this = this;
	  const option = {
	    title : {
        text: '进取型投资者优化投资组合配置方案如下:',
        x:'left',
        padding:12,
        textStyle:{
        	color:'#fff',
        	fontWeight:'normal',
        	fontSize:14,
        	textAlign:'left',
        }
	    },
	    tooltip : {
	    },
	    legend: {
        orient: 'horizontal',
        width:320,
        bottom: 0,
        left:'center',
        data: legendType,
        textStyle:{
        	color:'#fff'
        }
	    },
	    series : [
        {
          name: '访问来源',
          type: 'pie',
          radius : '70%',
          center: ['50%', '45%'],
          data:dataType.data,
          label:{
          	normal:{
          		show:true,
              formatter: '{d}%',
              position:"inside",
              textStyle:{
	              color:"#333"
              }
          	}
          },
          itemStyle: {
            emphasis: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
	    ]
		};


	  return option;
  }

	render(){
		let resultTable = null,
				tableImg = null,
				// tableHtml = null,
				sumType = this.props.params.result_sum;

		if(0<=sumType&&sumType<50){
			// tableHtml =<table><tbody>
			// 							<tr>
			// 								<th>资产类别</th>
			// 								<th>二级市场</th>
			// 								<th>中长期股权</th>
			// 								<th>海外投资、影视文化基金</th>
			// 								<th>现金管理</th>
			// 							</tr>
			// 						</tbody></table>
			tableImg = baoshouTableImg;
		}else if(50<=sumType&&sumType<90){
			tableImg = wenjianTableImg;
		}else{
			tableImg = jinquTableImg;
		}

		return(
			<div className="result_content">
				<div className="echart_box">
					<ReactEcharts 
						className="echarts_bar"
						option={this.getOption()}
					/>
				</div>

				<div className="table_box">
					<img src={tableImg} />
				</div>

				<div className="fund_box">
					<h3>产品推荐</h3>
					<FundItem />
					<FundItem />
				</div>
			</div>
		)
	}
} 