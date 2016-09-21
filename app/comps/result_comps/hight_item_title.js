import React from 'react';
import {render} from 'react-dom';

/*
* 1000万以上的配置结果，列表的title
*/

import "../../static/style/result_comps/hight_item_title.css"

export default class HightItemTitle extends React.Component{
	render(){
		return(
			<div className="hight_title_box">
				<div className="per_num">50%</div>
				<div className="title_name">固定收益类</div>
			</div>
		)
	}
}