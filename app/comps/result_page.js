import React from 'react';
import {render} from 'react-dom';

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
			showType:'aa'
		}

		this.changeShow = this.changeShow.bind(this)
	}

// 改变要展示的推荐基金列表，只用于100w－1000w的稳健型下
	changeShow(val){
		this.setState({
			showType:val
		})

		console.log(this.state.showType)
	}

	render(){
		return(
			<div>
				<SteadyTitle handle={this.changeShow} />
				<HightItemTitle per="50" title="固定收益类"/>
				<FundItem />
				<FundItem />
				<LowItemTitle title="固定收益" />
			</div>
		)
	}
} 