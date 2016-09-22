import React from 'react';
import {render} from 'react-dom';

/*
* 1000万以上的配置结果，列表的title
*/

import "../../static/style/result_comps/low_item_title.css"

export default class LowItemTitle extends React.Component{
	render(){
		return(
			<div className="low_title_box">
				<div className="title_name">{this.props.title}</div>
			</div>
		)
	}
}