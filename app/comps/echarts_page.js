import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入echarts
import ReactEcharts from 'echarts-for-react'

// 引入css
import '../static/style/echarts_page.css'


export default class EchartsPage extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	resultArr:[]
	  };

	  this.getOption = this.getOption.bind(this)
	}
	componentWillMount(){
		let arr = this.props.params.result_arr.split(",")
		this.setState({
			resultArr:arr
		})
	}

	getOption() {
		let _this = this;
	  const option = {
      title: {
	    },
	    tooltip: {},
	    legend: {
	    },
	    radar: {
	        // shape: 'circle',
	        indicator: [
	           { name: '财务状况', max: 10},
	           { name: '其他信息', max: 10},
	           { name: '风险偏好', max: 10},
	           { name: '投资目标', max: 10},
	           { name: '投资经验', max: 10},
	           { name: '投资知识', max: 10}
	        ]
	    },
	    series: [{
	        name: '预算 vs 开销（Budget vs spending）',
	        type: 'radar',
	        // areaStyle: {normal: {}},
	        data : [
	            {
	                value : _this.state.resultArr,
	                name : '资产配置类型判断'
	            }
	        ]
		    }]
	  };

	  return option;
  }

	render(){
		return(
			<div className="echarts_content">
				<h2 className="echarts_title">资产配置得分分析图</h2>
				<ReactEcharts 
					className="echarts_bar"
					option={this.getOption()}
				/>

				<div className="submit_btn">
					<button>
						<Link className="linkBtn" to={"/assets_select/"+this.state.resultArr}>下一步</Link>
					</button>
				</div>
			</div>
		)
	}
}