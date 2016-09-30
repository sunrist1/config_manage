import React from 'react';
import {render} from 'react-dom';
import {Link} from 'react-router';

// 下一步按钮图片
import stepImg from '../static/images/next_step_btn.png'

export default class NextStepBtn extends React.Component{
	constructor(props){
		super()
	}

	render(){
		return(
			<div>
				<button>
					<Link className="linkBtn" to={"/assets_select/"}>下一步</Link>
				</button>
			</div>
		)
		
	}
}