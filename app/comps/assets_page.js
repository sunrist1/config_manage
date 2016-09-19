import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 引入图片文件
import ImgJiji from '../static/images/type_jiji.png'
import ImgWenjian from '../static/images/type_wenjian.png'
import ImgBaoshou from '../static/images/type_baoshou.png'

export default class AssetsPage extends React.Component{
	constructor(props){
		super()
	}

	render(){
		return(
			<div>money
					<p>{this.props.params.result_arr}</p>
					<img src={ImgJiji} />
			</div>
		)
	}
} 