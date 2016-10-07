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
			<a href="http://lcs.daliuliang.com.cn/mobile/privatefund/detail/0%7CYZ00001.html" className="fund_item_box">
				<h3 className="item_title">财富家-凯歌3号文化影视基金</h3>
				<div className="data_content">
					<div className="data_item">预期收益:浮动</div>
					<div className="data_item">前端佣金:<span className="red_word">待定</span></div>
					<div className="data_item">后端佣金:<span className="red_word">无</span></div>
				</div>
				<div className="data_content">
					<div className="data_item">起投:100万</div>
					<div className="data_item">封闭期:12个月</div>
					<div className="data_item">本期募集:5000万</div>
				</div>
				<div className="bottom_bar">
					<div className="collect_count">1</div>
					<div className="read_count">2588</div>
				</div>
			</a>
		)
	}
}