import React from 'react';
import {render} from 'react-dom';

// 引入组件
import HightItemTitle from './result_comps/hight_item_title.js'
import FundItem from './result_comps/fund_item.js'

// 答题结果得出类型（积极，稳健，保守）
export default class ResultPage extends React.Component{
	constructor(props){
		super()
	}

	render(){
		return(
			<div>
				<HightItemTitle per="50" title="固定收益类"/>
				<FundItem />
				<FundItem />
			</div>
		)
	}
} 