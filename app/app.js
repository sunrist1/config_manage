import React from 'react';
import {render} from 'react-dom';
import {Router,Route,hashHistory} from 'react-router'

// import components
import NoticePage from './comps/notice_page.js';   //提示页面
import QuestionsPage from './comps/questions_page.js';  // 问题列表页面
import AssetsPage from './comps/assets_page.js';  // 可投资资产选择

/*class App extends React.Component{
	render(){
		return(
			<div>
				App box
			</div>
		)
	}
}*/

render(
	(
		<Router history={hashHistory}>
			<Route path="/" component={NoticePage} />
			<Route path="/questions" component={QuestionsPage} />
			<Route path="/assets_select/:result_arr" component={AssetsPage} />
		</Router>
	),
	document.getElementById('content')
)