import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入图片文件
import ImgJiji from '../static/images/type_jiji.png'
import ImgWenjian from '../static/images/type_wenjian.png'
import ImgBaoshou from '../static/images/type_baoshou.png'

// css
import '../static/style/assets_page.css'

// 答题结果得出类型（积极，稳健，保守）
export default class AssetsPage extends React.Component{
	constructor(props){
		super()
	}

	getAssetType(){
		// 计算得分，判断类型
		var sum = 0;
		var arr = this.props.params.result_arr;
		arr.forEach(function(item){
			sum += item
		})

		console.log(sum)

		/*
		*   这里要做判断，return该展示的dom
		*/

		return 
	}

	render(){
		return(
			<div className="select_box">
				<div className="top_box">
					<h2 className="title_1">防守型配置策略</h2>
					<h3 className="title_2">推荐投资低风险等级产品</h3>
					<img className="type_img" src={ImgJiji} />
				</div>				
				
				<div className="selectAssetBox">
					<h3>请选择您可投资资产：</h3>
					<div className="item_group">
						<input id="value1" name="assets_value" type="radio" value="1"/>
						<label className="icon_label"></label>
						<label htmlFor="value1">100万—1000万</label>
					</div>
					<div className="item_group">
						<input id="value2" name="assets_value" type="radio" value="2"/>
						<label className="icon_label"></label>
						<label htmlFor="value2">1000万以上</label>
					</div>
				</div>

				<button className="nextStepBtn">
					<Link className="linkBtn" to="/result/aa">下一步</Link>
				</button>
			</div>
		)
	}
} 