import React from 'react';
import {render} from 'react-dom';
// import $ from 'jquery'

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
// 引入推荐基金列表json
import ResultFunds from '../result_fund.json'

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


/*	getFundData(fundId){
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
	}*/

	// 渲染该显示的dom的函数
/*	showRender(){
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
	}*/



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
				recommendFunds = null,
				tableImg = null,
				// tableHtml = null,
				sumType = this.props.params.result_sum;

		if(0<=sumType&&sumType<50){
			tableImg = baoshouTableImg;
			recommendFunds = ResultFunds.fundList.baoshou;
		}else if(50<=sumType&&sumType<90){
			tableImg = wenjianTableImg;
			recommendFunds = ResultFunds.fundList.wenjian;
		}else{
			tableImg = jinquTableImg;
			recommendFunds = ResultFunds.fundList.jinqu;
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
					{
						recommendFunds.map(function(item,index){
				  		return <FundItem key={index} item={item} />
				  	})
					}
				</div>
			</div>
		)
	}
} 