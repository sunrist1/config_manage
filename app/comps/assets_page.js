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

		this.state={
			sum:0,
			selectedValue:1,  // 已选择资金类型  100-1000万：1     1000万以上：2
			selected1:true,
			selected2:false,
		}

		this.getAssetType = this.getAssetType.bind(this)
		this.makeDom = this.makeDom.bind(this)
		this.selectHandle = this.selectHandle.bind(this)
	}

	getAssetType(){
		// 计算得分，判断类型
		var sum = 0;

		sum = this.props.params.asset;

		this.setState({
			sum:sum
		})
	}

	makeDom(){
		let sum = this.state.sum;

		if(1<=sum && sum<50){
			return(
				<div className="top_box">
					<h2 className="title_1">防守型配置策略</h2>
					<h3 className="title_2">推荐投资低风险等级产品</h3>
					<img className="type_img" src={ImgBaoshou} />
				</div>
			)
		}else if(51<=sum && sum<90){
			return(
				<div className="top_box">
					<h2 className="title_1">稳健性配置策略</h2>
					<h3 className="title_2">适合投资中、低风险等级产品</h3>
					<img className="type_img" src={ImgWenjian} />
				</div>
			)
		}else if(91<=sum && sum<=130){
			return(
				<div className="top_box">
					<h2 className="title_1">积极性配置策略</h2>
					<h3 className="title_2">适合投资高、中、低风险等级产品</h3>
					<img className="type_img" src={ImgJiji} />
				</div>
			)
		}
	}

	selectHandle(e){
		var sel = e.target.value
		this.setState({
			selectedValue:sel
		})
		if(1==sel){
			this.setState({
				selected1:true,
				selected2:false
			})
		}else{
			this.setState({
				selected1:false,
				selected2:true
			})
		}
	}

	componentDidMount(){
		this.getAssetType()
	}

	render(){
		return(
			<div className="select_box">
				{this.makeDom()}				
				
				<div className="selectAssetBox">
					<h3>请选择您可投资资产：</h3>
					<div className="item_group">
						<input id="value1" name="assets_value" checked={this.state.selected1} onChange={this.selectHandle} type="radio" value="1"/>
						<label className="icon_label"></label>
						<label htmlFor="value1">100万—1000万</label>
					</div>
					<div className="item_group">
						<input id="value2" name="assets_value" checked={this.state.selected2} onChange={this.selectHandle} type="radio" value="2"/>
						<label className="icon_label"></label>
						<label htmlFor="value2">1000万以上</label>
					</div>
				</div>

				<button className="nextStepBtn">
					<Link className="linkBtn" to={"/result/"+this.state.selectedValue+"/"+this.state.sum}>下一步</Link>
				</button>
			</div>
		)
	}
} 