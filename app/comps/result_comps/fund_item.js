import React from 'react';
import {render} from 'react-dom';

import '../../static/style/result_comps/fund_item.css'

export default class FundItem extends React.Component{
	constructor(props){
		super()
		
		this.state = {
			fundData:{},
			noDataStyle:""
		}

		this.gotoFund = this.gotoFund.bind(this)
		this.randomString = this.randomString.bind(this)
		this.craeteDataId = this.craeteDataId.bind(this)
	}

	componentWillMount(){
		var fundCode = this.props.item.fundCode;
		var data = {
		    "code":"getFundList",
		    "data":{
		        "fundCodes":fundCode
		    }
			};
		var that = this;
		data = JSON.stringify(data)
		$.ajax({
			url:'/mobile/api/appService',
			type:'POST',
			contentType:"application/json",
			dataType:'json',
			data:data,
			beforeSend:function(xhr){
				xhr.setRequestHeader("deviceId", "android");
		    xhr.setRequestHeader("device", "1");
			},
			success:function(data){
				if(data.data.list.length<=0){
					return false;
				}
				if(data.data.list[0].expectedReturn.indexOf('-')>0){
					data.data.list[0].expectedReturn = "浮动"
				}
				that.setState({
					fundData:data.data.list[0]
				})
			}
		})
	}

	randomString(len) {
　　len = len || 32;
　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
　　var maxPos = $chars.length;
　　var pwd = '';
　　for (var i = 0; i < len; i++) {
　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
　　}
　　return pwd;
	}

	// 生成dataID
	craeteDataId(){
		let str = this.randomString(8)+"-"+this.randomString(4)+"-"+this.randomString(4)+"-"+this.randomString(4)+"-"+this.randomString(12)
		return str;
	}

	gotoFund(){
		console.log(this.state.fundData)
		let option = {
			skball:1,
			skcode:this.state.fundData.fundCode,
			sktype:1,
			title:this.state.fundData.typeName,
			url:'/mobile/privatefund/detail/141_'+this.state.fundData.fundCode+'.html'
		}
		console.log(option)
    var url = "bridge://appLocal?";
    url += "code=popPage";
    url += "&dataID="+this.craeteDataId();
    url += "&data=" + JSON.stringify(option);
    console.log(url)
    window.location.href = encodeURI(url);
	}

	render(){
		return(
			<a onClick={this.gotoFund} className="fund_item_box">
				<h3 className="item_title">{this.state.fundData.fundName}</h3>
				<div className="data_content">
					<div className="data_item">预期收益:{this.state.fundData.expectedReturn}</div>
					<div className="data_item">前端佣金:<span className="red_word">{this.state.fundData.frontFeeRate}%</span></div>
					<div className="data_item">后端佣金:<span className="red_word">{this.state.fundData.endFeeRate}%</span></div>
				</div>
				<div className="data_content">
					<div className="data_item">起投:{this.state.fundData.minMoney}万</div>
					<div className="data_item">封闭期:{this.state.fundData.fengbiQi}</div>
					<div className="data_item">本期募集:{this.state.fundData.thisMoney}万</div>
				</div>
				<div className="bottom_bar">
					<div className="collect_count">{this.state.fundData.favorteCount}</div>
					<div className="read_count">{this.state.fundData.browseCount}</div>
				</div>
			</a>
		)
	}
}