import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入echarts
import ReactEcharts from 'echarts-for-react'

// 引入css
import '../static/style/echarts_page.css'

// 引入图片
import ImgBaoshou from '../static/images/type_baoshou.png'
import ImgJinqu from '../static/images/type_jinqu.png'
import ImgWenjian from '../static/images/type_wenjian.png'

export default class EchartsPage extends React.Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	resultArr:[],
	  	resultSum:0
	  };

	  this.getOption = this.getOption.bind(this)
	}
	componentDidMount(){
		let arr = this.props.params.result_arr.split(","),
				sum = (arr[0] * 3 + arr[1] * 1 + arr[2] * 2 + arr[3] * 2 + arr[4] * 2 + arr[5] * 3).toFixed(2);

		this.setState({
			resultArr:arr,
			resultSum:sum
		})
	}

	getOption() {
		// 线条颜色
		let sumType = this.state.resultSum,
				lineColor = '';

		if(0<=sumType&&sumType<50){
			lineColor = '#A100F7';
		}else if(50<=sumType&&sumType<90){
			lineColor = '#00F0FF';
		}else{
			lineColor = '#F6FF00';
		}

		let _this = this;
	  const option = {
      title: {
	    },
	    tooltip: {},
	    legend: {
	    },
	    radar: {
	        splitArea: {
            show: false
	        },
	        radius: '65%',
	        indicator: [
	           { name: '财务状况', max: 10},
	           { name: '其他信息', max: 10},
	           { name: '风险偏好', max: 10},
	           { name: '投资目标', max: 10},
	           { name: '投资经验', max: 10},
	           { name: '投资知识', max: 10}
	        ],
	        name: {
            textStyle: {
                color: 'rgb(255, 255, 255)',
                fontSize:12
            }
	        },
	        axisLine: {
	        	show:false,
            lineStyle: {
              color: 'rgba(255, 255, 255, 1)'
            }
	        },
	        splitLine: {
            lineStyle: {
              color: '#fff'
            }
	        }
	    },
	    series: [
		    {
	        name: '预算 vs 开销（Budget vs spending）',
	        type: 'radar',
	        data : [
	            {
                value : _this.state.resultArr,
                name : '资产配置类型判断',
                lineStyle:{
                	normal:{
                		color:lineColor,
                		width:5
                	}
                }
	            }
	        ],
	        itemStyle: {
            normal: {
              opacity:0
            }
          },
	        areaStyle: {
            normal: {
            	color:lineColor,
              opacity: 0.4
            }
          }
		    }
	    ]
	  };

	  return option;
  }

	render(){
		let sumType = this.state.resultSum,
				typeImgSrc = null,
				p1 = null,
				p2 = null,
				title = null;

		if(0<=sumType&&sumType<50){
			typeImgSrc = ImgBaoshou;
			title = "保守型";
			p1 = "配置比例:20%二级市场+45%信托、资产管理计划+10%海外投资、影视文化类基金+25%现金。";
			p2 = "推荐逻辑:在保证安全性的同时，通过信托、资管计划的配置提高整体的收益率。"
		}else if(50<=sumType&&sumType<90){
			typeImgSrc = ImgWenjian;
			title = "稳健型";
			p1 = "配置比例:20%现金+45%信托、资产管理计划+10%定增、股权投资+10%影视文化基金+海外投资10%+二级市场5%。";
			p2 = "推荐逻辑:3000点左右市场行情是做定增的最好时机，影视文化基金的收益稳定性较强。"
		}else{
			typeImgSrc = ImgJinqu;
			title = "进取型";
			p1 = "配置比例:20%二级市场+30%定增、股权投资+30%固定收益+10%海外投资管理、影视文化基金+5%现金。";
			p2 = "推荐逻辑:长期股权投资所获得权益是巨大的，看中的是长期价值。定增是目前动荡的市场行情中较好的投资方向，影视文化基金的稳定也带来一定安全性。"
		}

		return(
			<div className="echarts_content">
				<div className="echarts_box">
					<div className="line_box">
						<div><span className="line"></span>保守型</div>
						<div><span className="line"></span>进取型</div>
						<div><span className="line"></span>稳健型</div>
					</div>
					<ReactEcharts 
						className="echarts_bar_radar"
						option={this.getOption()}
					/>
				</div>
				
				<div className="content_box">
					<div className="title_box">
						<h3>投资者风险</h3>
						<h3>评估结果</h3>
					</div>
					<div className="text_content">
						<h3>{title}</h3>
						<p>{p1}</p>
						<p>{p2}</p>
					</div>
					<img className="result_type_icon" src={typeImgSrc} />

					<button className="echart_submit_btn">
						<Link className="linkBtn" to={"/result/"+this.state.resultSum}></Link>
					</button>
				</div>
			</div>
		)
	}
}