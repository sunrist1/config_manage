import React from 'react';
import {render} from 'react-dom';

import '../../static/style/result_comps/fund_item.css'

export default class FundItem extends React.Component{
	constructor(props){
		super()

		this.gotoFund = this.gotoFund.bind(this)
	}

	gotoFund(link){
		location.href=link
	}

	render(){
		return(
			<a href={"http://lcs.daliuliang.com.cn/mobile/privatefund/detail/0%7"+this.props.item.fundCode+".html"} className="fund_item_box">
				<h3 className="item_title">{this.props.item.name}</h3>
				<div className="data_content">
					<div className="data_item">预期收益:{this.props.item.preEarn}</div>
					<div className="data_item">前端佣金:<span className="red_word">{this.props.item.frontendMoney}</span></div>
					<div className="data_item">后端佣金:<span className="red_word">{this.props.item.backendMoney}</span></div>
				</div>
				<div className="data_content">
					<div className="data_item">起投:{this.props.item.baseline}</div>
					<div className="data_item">封闭期:{this.props.item.closeTime}</div>
					<div className="data_item">本期募集:{this.props.item.collection}</div>
				</div>
				<div className="bottom_bar">
					<div className="collect_count">{this.props.item.view}</div>
					<div className="read_count">{this.props.item.like}</div>
				</div>
			</a>
		)
	}
}